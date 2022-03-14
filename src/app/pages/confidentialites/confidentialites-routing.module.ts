import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfidentialitesPage } from './confidentialites.page';

const routes: Routes = [
  {
    path: '',
    component: ConfidentialitesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfidentialitesPageRoutingModule {}
