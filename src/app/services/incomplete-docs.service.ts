import { Injectable } from '@angular/core';
import { SearchService, SearchConfigurationService } from '@alfresco/adf-core';
import { NodePaging, ResultSetRowEntry, ResultSetPaging } from '@alfresco/js-api';
import { DocumentsConfig, configArray } from 'app/app.component';
import { Subject } from 'rxjs';

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
    let gino = this.searchConfSrv.generateQueryBody('', 1000, 0)
    gino.query.query = 'TYPE:"demo:TFldRules"';
    gino.include = ['properties'];
    gino.fields = ['demo:config'];
    this.searchService.searchByQueryBody(gino)
      .subscribe(
        (nodi: ResultSetPaging) => {
          console.log(nodi);
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

}
