import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { PokerTableComponent } from './poker-table/poker-table.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'poker-table/:porkerTableName', component: PokerTableComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component:  NotFoundPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  
 }
