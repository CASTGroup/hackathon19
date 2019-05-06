import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ObjectDataTableAdapter, NodesApiService } from '@alfresco/adf-core';
import { MinimalNode } from '@alfresco/js-api';
import { ActivatedRoute } from '@angular/router';
import { DocumentsConfig, configArray } from 'app/app.component';

@Component({
  selector: 'app-my-first-view',
  templateUrl: './my-first-view.component.html',
  styleUrls: ['./my-first-view.component.scss']
})
export class MyFirstViewComponent implements OnInit, OnDestroy {

  // TODO
  // this is a sample data, object must be returned from a query result
  data = new ObjectDataTableAdapter(
    [
      {
        id: 1, 
        fileName: "test.pdf", 
        "demo:code": "Code #1", 
        "demo:description": "Description #1", 
        "demo:value": "Value #1",
      },
      {
        id: 2, 
        fileName: "test.pdf", 
        "demo:code": "Code #2", 
        "demo:description": "Description #2", 
        "demo:value": "Value #2",
      },
      {
        id: 3, 
        fileName: "test.pdf", 
        "demo:code": "Code #3", 
        "demo:description": "Description #3", 
        "demo:value": "Value #3",
      },
    ]
  );

  private params: any;
  idConfig : string;

  config: DocumentsConfig;

  @Input()
  showViewer: boolean = false;
  
  constructor(private nodeService: NodesApiService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.params = this.route.params.subscribe(params => {
      this.idConfig = params['idconfig'];
    });

    // TODO
    // create here the subscription (if needed) to a "Document Config service"
    // and get the correct config
    this.config = configArray[0];

    // TODO
    // here we need to do the query, parse the results and prepare a ObjectDataTableAdapter ad-hoc
    // the term needs to be the config.query + all the requeried field in OR for the NULL check

    /** 
      this.nodeService.getNodeQueryResults(term: string, options?: SearchOptions).subscribe((entry: MinimalNode) => {
        this.node= entry;
      });
    */
  }

  ngOnDestroy() {
    this.params.unsubscribe();
  }

  onRowClick(event: any) {
    // TODO
    // here we react to the node selected, than we are able to display the properties of the node
    //alert('We just clicked row id: ' + event.value.obj.id);
  }


}
