import { AuthGuardBase, AuthenticationService, AppConfigService } from "@alfresco/adf-core";
import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { IncompleteDocsService } from "./incomplete-docs.service";

@Injectable({
    providedIn: 'root'
})
export class MyAuthGuard extends AuthGuardBase {
    constructor(authenticationService: AuthenticationService,
        router: Router,
        appConfigService: AppConfigService,
        private incompleteServ: IncompleteDocsService) {
        super(authenticationService, router, appConfigService);
    }

    checkLogin(activeRoute: ActivatedRouteSnapshot, redirectUrl: string): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.incompleteServ.loaded) {
            this.incompleteServ.loadConfig();
        }

        if (this.authenticationService.isEcmLoggedIn() || this.withCredentials) {
            return true;
        }

        if (!this.authenticationService.isOauth() || this.isOAuthWithoutSilentLogin()) {
            this.redirectToUrl('ECM', redirectUrl);
        }

        return false;
    }
}