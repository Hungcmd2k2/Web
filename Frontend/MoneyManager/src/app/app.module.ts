import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageSignInComponent } from './Page-SignIn/Page-SignIn.component';
import { PageSignUpComponent } from './Page-SignUp/Page-SignUp.component';
import { PageHomeComponent } from './Page-Home/Page-Home.component';
import { PageNotFoundComponent } from './Page-NotFound/Page-NotFound.component';
import { PageAddGDComponent } from './Page-AddGD/Page-AddGD.component';
import { FormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { HttpClientModule } from '@angular/common/http';
import { PageUsersComponent } from './page-users/page-users.component';
import { ReactiveFormsModule, } from '@angular/forms';
import { PageEditUsersComponent } from './page-edit-users/page-edit-users.component';
import { PageEditGiaoDichComponent } from './page-edit-giao-dich/page-edit-giao-dich.component';
import { PageThongKeComponent } from './page-thong-ke/page-thong-ke.component';
@NgModule({
  declarations: [
    AppComponent,
      PageSignInComponent,
      PageSignUpComponent,
      PageHomeComponent,
      PageNotFoundComponent,
      PageAddGDComponent,
      PageUsersComponent,
      PageEditUsersComponent,
      PageEditGiaoDichComponent,
      PageThongKeComponent

   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HighchartsChartModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
