import { PopupComponent } from './popup/popup.component';
import { OptionsComponent } from './options/options.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'homepage', component: HomepageComponent },
      { path: 'options', component: OptionsComponent },
      { path: 'popup', component: PopupComponent },
      { path: '', redirectTo: 'homepage', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
