import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { NodesApiService, CardViewTextItemModel, CardViewUpdateService, UpdateNotification } from '@alfresco/adf-core';
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
  private cardViewUpdateServiceSub: any;
  idConfig : string;
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

  constructor(private nodeService: NodesApiService, 
    private route: ActivatedRoute, 
    private incompleteServ: IncompleteDocsService,
    private cardViewUpdateService: CardViewUpdateService
    ) {
    this.params = this.route.params.subscribe(params => {
      this.idConfig = params['idconfig'];
      this.nodeId = params['nodeId'];


      this.nodeService.getNode(this.nodeId).subscribe((entry: MinimalNode) => {
        this.node= entry;

        let docConfig = this.incompleteServ.getConfigById(this.idConfig);
        this.properties = [];
  
        this.properties.push(
          new CardViewTextItemModel({
          label: 'File Name',
          value: this.node.name,
          key: 'fileName',
          editable: false,
          clickCallBack : ()=>{ }
          })
        );
  
        docConfig.formFields.forEach(el => {
          this.properties.push(
            new CardViewTextItemModel({
            label: el.label,
            value: this.node.properties[el.key],
            key: el.key,
            editable: true,
            clickCallBack : ()=>{ }
            })
          );
        });
        
        console.log(this.properties);
        

      });
    });

  }

  ngOnInit() {
    this.cardViewUpdateServiceSub = this.cardViewUpdateService.itemUpdated$.subscribe(this.respondToCardUpdate.bind(this));
    this.onResize();
  }

  ngOnDestroy() {
    this.params.unsubscribe();
    this.cardViewUpdateServiceSub.unsubscribe();
  }

  respondToCardUpdate(un: UpdateNotification) {
    console.log(un)
    this.node.properties[un.target.key] = un.changed[un.target.key];
  }

  updateNodeProps() {
    this.nodeService.updateNode(this.nodeId, {
      properties: this.node.properties
    });
  }
}
