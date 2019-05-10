import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { NodesApiService, CardViewTextItemModel, CardViewUpdateService, UpdateNotification, CardViewDateItemModel, CardViewIntItemModel, CardViewDatetimeItemModel } from '@alfresco/adf-core';
import { ActivatedRoute, Router } from '@angular/router';
import { MinimalNode } from '@alfresco/js-api';
import { IncompleteDocsService } from 'app/services/incomplete-docs.service';

@Component({
  selector: 'app-my-second-view',
  templateUrl: './my-second-view.component.html',
  styleUrls: ['./my-second-view.component.scss']
})
export class MySecondViewComponent implements OnInit, OnDestroy {

  private params: any;
  private cardViewUpdateServiceSubscription: any;
  idConfig: string;
  nodeId: string; // sample
  height = '600px';
  node: MinimalNode;

  properties = null;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.height = document.querySelector('mat-sidenav-content').getBoundingClientRect().height + 'px';
  }

  constructor(private nodeService: NodesApiService,
    private route: ActivatedRoute,
    private incompleteServ: IncompleteDocsService,
    private cardViewUpdateService: CardViewUpdateService,
    private router: Router
  ) {
    this.params = this.route.params.subscribe(params => {
      this.idConfig = params['idconfig'];
      this.nodeId = params['nodeId'];


      this.nodeService.getNode(this.nodeId).subscribe((entry: MinimalNode) => {
        this.node = entry;
        const docConfig = this.incompleteServ.getConfigById(this.idConfig);
        //console.log(docConfig);
        this.properties = [];
        // The Filename is always the first element
        this.properties.push(
          new CardViewTextItemModel({
            label: 'File Name',
            value: this.node.name,
            key: 'fileName',
            editable: false
          })
        );
        // Push the remaining fields
        docConfig.formFields.forEach(el => {
          // Prepare the right CardView
          let tmpCard;
          if (el.type === 'date') {
            tmpCard = new CardViewDateItemModel({
              label: el.label,
              value: this.node.properties[el.key],
              format: 'DD/MM/YYYY',
              key: el.key,
              editable: true
            })
          } else if (el.type === 'datetime') {
            tmpCard = new CardViewDatetimeItemModel({
              label: el.label,
              value: this.node.properties[el.key],
              format: 'DD/MM/YYYY HH:mm:ss',
              key: el.key,
              editable: true
            })
          } else if (el.type === 'int') {
            tmpCard = new CardViewIntItemModel({
              label: el.label,
              value: this.node.properties[el.key],
              key: el.key,
              editable: true
            })
          } else {
            tmpCard = new CardViewTextItemModel({
              label: el.label,
              value: this.node.properties[el.key],
              key: el.key,
              editable: true
            })
          }
          // and push it
          this.properties.push(tmpCard);
        });
      });
    });
  }

  ngOnInit() {
    this.cardViewUpdateServiceSubscription = this.cardViewUpdateService.itemUpdated$.subscribe(this.respondToCardUpdate.bind(this));
    this.onResize();
  }

  ngOnDestroy() {
    this.params.unsubscribe();
    this.cardViewUpdateServiceSubscription.unsubscribe();
  }

  respondToCardUpdate(un: UpdateNotification) {
    this.node.properties[un.target.key] = un.changed[un.target.key];
  }

  updateNodeProps() {
    this.nodeService.updateNode(this.nodeId, {
      properties: this.node.properties
    }).subscribe(
      _ => this.router.navigate(['/my-first-view/'+this.router.url.substring(16, this.router.url.indexOf('/',16))])
    );
  }
}
