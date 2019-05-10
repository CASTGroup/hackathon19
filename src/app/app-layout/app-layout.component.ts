import { Component, OnInit } from '@angular/core';
import { IncompleteDocsService } from 'app/services/incomplete-docs.service';
import { DocumentsConfig } from 'app/app.component';

@Component({
  selector: 'app-root',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit {
  configArray: DocumentsConfig[] = [];

  constructor(private incompleteServ: IncompleteDocsService) {
  }

  ngOnInit() {
    this.incompleteServ.loadConfig();
    this.incompleteServ.configChanged$.subscribe(
      res => {
        this.configArray = res;
      }
    );

  }

  isMenuMinimized() {
    return false;
  }
}
