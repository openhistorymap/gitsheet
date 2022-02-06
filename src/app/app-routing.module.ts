import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { IndexComponent } from './index/index.component';
import { SelectorComponent } from './selector/selector.component';

const routes: Routes = [
  {path: 'work', component: SelectorComponent},
  {path: 'work/:id', component: EditorComponent},
  {path: '**', component: IndexComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
