import { Injectable } from '@angular/core';
import { SearchService, SearchConfigurationService, ObjectDataTableAdapter } from '@alfresco/adf-core';
import { NodePaging, ResultSetRowEntry, ResultSetPaging } from '@alfresco/js-api';
import { DocumentsConfig, configArray } from 'app/app.component';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncompleteDocsService {
  private configArray: DocumentsConfig[] = [];
  private configChanged = new Subject<DocumentsConfig[]>();
  configChanged$ = this.configChanged.asObservable();

  constructor(private searchService: SearchService,
    private searchConfSrv: SearchConfigurationService) { }

  loadConfig() {
    let gino = this.searchConfSrv.generateQueryBody('', 1000, 0);
    gino.query.query = 'TYPE:"demo:TFldRules"';
    gino.include = ['properties'];
    gino.fields = ['demo:config'];
    this.searchService.searchByQueryBody(gino)
      .subscribe(
        (nodi: ResultSetPaging) => {
          this.configArray = [];
          nodi.list.entries.forEach(el => {
            this.configArray.push(JSON.parse(el.entry.properties['demo:config']))
          });
          this.configChanged.next(this.configArray);
        });
  }

  getConfigById(id: string) : DocumentsConfig {
    return this.configArray.find(el => el.id === id);
  }

  getDocumentsByConfigId(id: string): Observable<[]> {
    let documentsReturned = new Subject<[]>();

    let pino = this.getConfigById(id);
    let gino = this.searchConfSrv.generateQueryBody('',1000, 0);
    gino.query.query = pino.query;
    gino.include = ['properties'];
   
    this.searchService.searchByQueryBody(gino)
    .subscribe(
      (res: ResultSetPaging) => {
        let documentsPojo: any = [];

        res.list.entries.forEach(el => {
          let nino = {
            filename: el.entry.name,
          }
          pino.formFields.forEach(form => {
            nino[form.key] = el.entry.properties[form.key];
          });

          documentsPojo.push(nino);
        });
        documentsReturned.next(documentsPojo);
        documentsReturned.complete();
      });

    return documentsReturned; 
  }
}
