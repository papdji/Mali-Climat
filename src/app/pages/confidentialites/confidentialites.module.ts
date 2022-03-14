import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfidentialitesPageRoutingModule } from './confidentialites-routing.module';

import { ConfidentialitesPage } from './confidentialites.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfidentialitesPageRoutingModule
  ],
  declarations: [ConfidentialitesPage]
})
export class ConfidentialitesPageModule {}
