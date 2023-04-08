import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import {FileUploadModule} from 'primeng/fileupload';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { PersonComponent } from './pages/person/person.component';
import { MenuComponent } from './layout/menu/menu.component';
import { MainComponent } from './pages/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PersonComponent,
    MenuComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MenubarModule,
    InputTextareaModule,
    InputTextModule,
    TableModule,
    CardModule,
    InputTextModule,
    DialogModule,
    ToolbarModule,
    ConfirmDialogModule,
    RatingModule,
    InputNumberModule,
    InputTextareaModule,
    RadioButtonModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    FileUploadModule,
    ConfirmDialogModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    MessageService, ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
