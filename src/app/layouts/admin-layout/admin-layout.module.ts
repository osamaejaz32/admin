import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { UsersComponent } from '../../pages/users/users.component';
import { AddProductComponent } from '../../pages/add-product/add-product.component';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { FileSelectDirective,FileDropDirective } from 'ng2-file-upload';
import { NgbdModalBasicComponent } from '../../pages/modal/modal.component';
import { BootstrapModalModule } from 'ng6-bootstrap-modal';
import {MatDialogModule} from '@angular/material/dialog';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../extra/modal/modal.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {TestComponent} from '../../pages/test/test.component';
import { FileDropModule } from 'ngx-file-drop';
import { UploadMultipleComponent } from '../../pages/upload-multiple/upload-multiple.component';
import { EventAddComponent } from '../../pages/event-add/event-add.component';
import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatIconModule,
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule ,
  MatCheckboxModule
} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgbModule,
    MatTooltipModule,
    BootstrapModalModule,
    MatDialogModule,
    DragDropModule,
    FileDropModule,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    NgbdModalBasicComponent,
    UpgradeComponent,
    UsersComponent,
    AddProductComponent,
    FileSelectDirective,
    FileDropDirective,
    TestComponent,
    UploadMultipleComponent,
    EventAddComponent
    // ModalComponent
  ]
})

export class AdminLayoutModule {}
