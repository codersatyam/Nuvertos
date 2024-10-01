import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompoundDetailComponent } from './compound-detail/compound-detail.component';
import { CompoundListComponent } from './compound-list/compound-list.component';
import { AddCompoundComponent } from './add-compound/add-compound.component';
const routes: Routes = [
  { path: '', redirectTo: '/compounds', pathMatch: 'full' }, 
  { path: 'compounds', component: CompoundListComponent }, 
  { path: 'compound/:id', component: CompoundDetailComponent }, 
  { path: 'createCompound', component: AddCompoundComponent }, 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
