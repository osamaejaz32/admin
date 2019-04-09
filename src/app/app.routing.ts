import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ErrorComponent } from './pages/error/error.component'
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthGuard } from './_guards';
// const routes: Routes =[
//   {
//     path: '',
//     redirectTo: 'dashboard',
//     pathMatch: 'full',
//     canActivate: [AuthGuard]
//   }, {
//     path: '',
//     component: AdminLayoutComponent,
//     canActivate: [AuthGuard],
//     children: [
//         {
//       path: '',
//       loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
//   }]},
//   {path:'login',component: LoginComponent},
//   {path:'**',component: ErrorComponent}
//     // { path: 'dashboard',      component: DashboardComponent },
//     // { path: 'user-profile',   component: UserProfileComponent },
//     // { path: 'table-list',     component: TableListComponent },
//     // { path: 'typography',     component: TypographyComponent },
//     // { path: 'icons',          component: IconsComponent },
//     // { path: 'maps',           component: MapsComponent },
//     // { path: 'notifications',  component: NotificationsComponent },
//     // { path: 'upgrade',        component: UpgradeComponent },
//     // { path: '',               redirectTo: 'dashboard', pathMatch: 'full' }
// ];
const routes: Routes = [
  {
    path:'',
    redirectTo:'dashboard',
    pathMatch:'full',
    canActivate:[AuthGuard]
  },{
    path:'',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path:'',
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
