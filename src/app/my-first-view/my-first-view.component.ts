import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ObjectDataTableAdapter, NotificationService } from '@alfresco/adf-core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentsConfig } from 'app/app.component';

import { IncompleteDocsService } from 'app/services/incomplete-docs.service';

@Component({
  selector: 'app-my-first-view',
  templateUrl: './my-first-view.component.html',
  styleUrls: ['./my-first-view.component.scss'],
})
export class MyFirstViewComponent implements OnInit, OnDestroy {
  data = null;
  schema = [];

  private paramsSubscription: any;
  idConfig: string;

  config: DocumentsConfig;

  @Input()
  showViewer = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private incompleteServ: IncompleteDocsService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.idConfig = params['idconfig'];
      this.config = this.incompleteServ.getConfigById(this.idConfig);
      this.schema = [];
      // Always add the filename at the beginning
      this.schema.push({
        type: 'text',
        key: 'filename',
        title: 'Name',
        sortable: 'true'
      });

      this.config.formFields.forEach(el => {
        let tmpCol = {
          key: el.key,
          title: el.label,
          sortable: 'true',
        }
        if (el.type === 'date') {
          tmpCol['type'] = el.type;
          tmpCol['format'] = 'dd/MM/yyyy'
        } else {
          tmpCol['type'] = 'text';
        }

        this.schema.push(tmpCol);
      });
      
      this.incompleteServ.getDocumentsByConfigId(this.idConfig).subscribe(
        (documentsFound) => {
          this.data = new ObjectDataTableAdapter(documentsFound, this.schema);
        }
      );
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  onRowClick(event: any) {
    this.router.navigate(['/my-second-view', this.idConfig, event.value.obj.id]);
  }

  uploadSuccess(event: any) {
    this.notificationService.openSnackMessage('File uploaded');
  }  
}
