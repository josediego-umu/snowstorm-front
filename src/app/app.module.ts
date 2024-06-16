import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './handler/interceptor/jwt-interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { MessageComponent } from './components/message/message.component';
import { HandlerMessageComponent } from './handler/handler-message/handler-message.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { DataStructComponent } from './components/data-struct/data-struct.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ModalComponent } from './components/modal/modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogCustomComponent } from './components/dialog-custom/dialog-custom.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogWithTemplateComponent } from './components/dialog-with-template/dialog-with-template.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconButton } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SearchComponent } from './components/search/search.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import { MatListModule } from '@angular/material/list'; 
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ConfigComponent } from './components/config/config.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TreeModule } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TreeTableModule } from 'primeng/treetable';
import { AnimateModule } from 'primeng/animate';
import { TreeTableBasicDemo } from './tree-table-basic-demo/tree-table-basic-demo.component';
import { TreeTableTestComponent } from './tree-table-test/tree-table-test.component';
import { ContextMenuModule } from 'primeng/contextmenu';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    MessageComponent,
    HandlerMessageComponent,
    ProfileComponent,
    ProjectFormComponent,
    DataStructComponent,
    ModalComponent,
    DialogCustomComponent,
    DialogWithTemplateComponent,
    SearchComponent,
    ConfigComponent,
    TreeTableBasicDemo,
    TreeTableTestComponent,
    
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonModule,
    NgbModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatRadioModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    TreeModule,
    TreeSelectModule,
    TreeTableModule,
    AnimateModule,
    SelectButtonModule,
    ContextMenuModule
  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
