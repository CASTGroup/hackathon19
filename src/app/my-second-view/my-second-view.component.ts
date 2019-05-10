import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { NodesApiService, CardViewTextItemModel } from '@alfresco/adf-core';
import { ActivatedRoute } from '@angular/router';
import { MinimalNode } from '@alfresco/js-api';
import { IncompleteDocsService } from 'app/services/incomplete-docs.service';

@Component({
  selector: 'app-my-second-view',
  templateUrl: './my-second-view.component.html',
  styleUrls: ['./my-second-view.component.scss']
})
export class MySecondViewComponent implements OnInit, OnDestroy {

  private params: any;
  idConfig: string;
  nodeId: string; // sample
  height = '600px';
  node: MinimalNode;

  // TODO
  // this need to be Dynamic
  properties = null;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.height = document.querySelector('mat-sidenav-content').getBoundingClientRect().height + 'px';
  }

  constructor(private nodeService: NodesApiService, private route: ActivatedRoute, private incompleteServ: IncompleteDocsService) {
    this.params = this.route.params.subscribe(params => {
      this.idConfig = params['idconfig'];
      this.nodeId = params['nodeId'];

      // TODO
      // call the node load and config load,
      // do the parsing of the node propresties to populate the "" desired
      const docConfig = this.incompleteServ.getConfigById(this.idConfig);
      this.properties = [];

      this.properties.push(
        new CardViewTextItemModel({
          label: 'File Name',
          value: 'TODO',
          key: 'fileName',
          editable: false,
          clickCallBack: () => { }
        })
      );

      docConfig.formFields.forEach(el => {
        this.properties.push(
          new CardViewTextItemModel({
            label: el.label,
            value: 'TODO',
            key: el.key,
            editable: true,
            clickCallBack: () => { }
          })
        );
      });

      console.log(this.properties);
      /**
      this.nodeService.getNode(this.nodeId).subscribe((entry: MinimalNode) => {
        this.node= entry;
      });
      */
    });

  }

  ngOnInit() {
    this.onResize();
  }

  ngOnDestroy() {
    this.params.unsubscribe();
  }

}
