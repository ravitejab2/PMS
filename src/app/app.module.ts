import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegisterComponent } from './register/register.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';

import { SharedSidenavComponent } from './layouts/shared-sidenav/shared-sidenav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedFooterComponent } from './layouts/shared-footer/shared-footer.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SharedLandingToolbarComponent } from './shared-landing-toolbar/shared-landing-toolbar.component';
import { HttpClientModule } from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AuthGuardService } from './authGuard/auth.guard';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { ToastrModule } from 'ngx-toastr';
import { ResponsiveService } from './responsive/responsive.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SharedSidenavComponent,
    SharedFooterComponent,
    ForgotPasswordComponent,
    SharedLandingToolbarComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatRadioModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ToastrModule.forRoot()
  ],
  providers: [AuthGuardService,ResponsiveService],
  bootstrap: [AppComponent]
})
export class AppModule { }
