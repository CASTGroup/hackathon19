import { Component, OnInit, OnDestroy } from '@angular/core';
import { NodesApiService, CardViewTextItemModel } from '@alfresco/adf-core';
import { ActivatedRoute } from '@angular/router';
import { MinimalNode } from '@alfresco/js-api';

@Component({
  selector: 'app-my-second-view',
  templateUrl: './my-second-view.component.html',
  styleUrls: ['./my-second-view.component.scss']
})
export class MySecondViewComponent implements OnInit, OnDestroy {

  private params: any;
  idConfig : string;
  nodeId: string; // sample
  
  node: MinimalNode;

  // TODO
  // this need to be Dynamic
  properties = [
    new CardViewTextItemModel({
        label: 'File Name',
        value: 'test.pdf',
        key: 'fileName',
        editable: false,
        clickCallBack : ()=>{ } 
    }),
    new CardViewTextItemModel({
        label: 'Code',
        value: 'Code #1',
        key: 'demo:code',
        default: '',
        editable: true
    }),
    new CardViewTextItemModel({
      label: 'Description',
      value: 'Description #1',
      key: 'demo:description',
      default: '',
      editable: true
    }),
    new CardViewTextItemModel({
      label: 'Value',
      value: 'Value #1',
      key: 'demo:value',
      default: '',
      editable: true
    }),
  ]


  constructor(private nodeService: NodesApiService, private route: ActivatedRoute) {
    this.params = this.route.params.subscribe(params => {
      this.idConfig = params['idconfig'];
      this.nodeId = params['nodeId'];

      // TODO
      // call the node load and config load, 
      // do the parsing of the node propresties to populate the "" desired

      /** 
      this.nodeService.getNode(this.nodeId).subscribe((entry: MinimalNode) => {
        this.node= entry;
      });
      */
    });

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.params.unsubscribe();
  }

}
