import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IncompleteDocsService } from 'app/services/incomplete-docs.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor (private router: Router,
                private incompleteServ: IncompleteDocsService) {}

  mySuccessMethod(event) {
    if (!this.incompleteServ.loaded) {
      this.incompleteServ.loadConfig();
  }
    this.router.navigate(['/']);
  }
}
