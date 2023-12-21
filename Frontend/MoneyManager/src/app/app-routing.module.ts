import { PageNotFoundComponent } from './Page-NotFound/Page-NotFound.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageSignInComponent } from './Page-SignIn/Page-SignIn.component';
import { PageSignUpComponent } from './Page-SignUp/Page-SignUp.component';
import { PageHomeComponent } from './Page-Home/Page-Home.component';
import { PageAddGDComponent } from './Page-AddGD/Page-AddGD.component';
import { PageUsersComponent } from './page-users/page-users.component';
import { PageEditUsersComponent } from './page-edit-users/page-edit-users.component';
import { PageEditGiaoDichComponent } from './page-edit-giao-dich/page-edit-giao-dich.component';
import { PageThongKeComponent } from './page-thong-ke/page-thong-ke.component';


const routes: Routes = [
  { path: '', component: PageSignInComponent }, // Trang chủ
  { path: 'SignUp', component: PageSignUpComponent },
  { path: 'SignIn', component: PageSignInComponent },
  { path: 'HomePage', component: PageHomeComponent },
  { path: 'AddGD', component: PageAddGDComponent },
  { path: 'Users', component: PageUsersComponent },
  { path: 'Edit-Users', component: PageEditUsersComponent },
  { path: 'Edit-GD', component: PageEditGiaoDichComponent },
  { path: 'ThongKe', component: PageThongKeComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
