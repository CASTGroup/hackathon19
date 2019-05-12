/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DocumentlistComponent } from './documentlist/documentlist.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { FileViewComponent } from './file-view/file-view.component';
import { MyFirstViewComponent } from './my-first-view/my-first-view.component';
import { MySecondViewComponent } from './my-second-view/my-second-view.component';
import { MyAuthGuard } from './services/my-auth-guard';

export const appRoutes: Routes = [
  { path: 'files/:nodeId/view', component: FileViewComponent, canActivate: [MyAuthGuard], outlet: 'overlay' },
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [MyAuthGuard],
    children: [
     /* {
        path: '',
        component: HomeComponent,
        canActivate: [MyAuthGuard],
      },*/
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [MyAuthGuard],
      },
      {
        path: 'documentlist',
        component: DocumentlistComponent,
        canActivate: [MyAuthGuard]
      },
      {
        path: 'my-first-view/:idconfig',
        component: MyFirstViewComponent,
        canActivate: [MyAuthGuard]
      },
      {
        path: 'my-second-view/:idconfig/:nodeId',
        component: MySecondViewComponent,
        canActivate: [MyAuthGuard]
      }

    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
