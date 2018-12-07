import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainWindowComponent } from './main-window/main-window.component';
import { PreviewWindowComponent } from './preview-window/preview-window.component';

const routes: Routes = [
  { path: '', component: MainWindowComponent },
  { path: 'preview', component: PreviewWindowComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
