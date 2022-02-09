import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchComponent } from './branch/branch.component';
import { EditorComponent } from './editor/editor.component';
import { IndexComponent } from './index/index.component';
import { RepoComponent } from './repo/repo.component';
import { SelectorComponent } from './selector/selector.component';

const routes: Routes = [
  {path: 'work/:iid', component: SelectorComponent},
  {path: 'work/:iid/:rid', component: RepoComponent},
  {path: 'work/:iid/:rid/:bid', component: BranchComponent},
  {path: 'work/:iid/:rid/:bid/:id', component: EditorComponent},
  {path: '**', component: IndexComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
