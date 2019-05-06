import { Component, ViewEncapsulation } from '@angular/core';
import { TranslationService, AuthenticationService } from '@alfresco/adf-core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  constructor(translationService: TranslationService,
              private authService: AuthenticationService,
              private router: Router) {
    translationService.use('en');
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

}

export interface DocumentsConfig {
  id: string,
  label: string,
  query: string,
  formFields: DocumentsFormConfig[],
}

export interface DocumentsFormConfig {
  key: string,
  label: string,
  type: string,
  required: boolean,
}

export const configArray = [
  {
    id: "ConfigOne",
    label: "Test Config One",
    query : "TYPE:'demo:hackathon'",
    formFields : [
      {
        key: "demo:code",
        type: "text", // see https://www.alfresco.com/abn/adf/docs/core/components/card-view.component/ for avaiable types
        label: "Code",
        required: true
      },
      {
        key: "demo:description",
        type: "text",
        label: "Description",
        required: true
      },
      {
        key: "demo:value",
        type: "text",
        label: "Value",
        required: true
      },			
    ]
  },
]