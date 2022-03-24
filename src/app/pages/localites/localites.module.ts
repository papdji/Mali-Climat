import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocalitesPageRoutingModule } from './localites-routing.module';

import { LocalitesPage } from './localites.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocalitesPageRoutingModule,
    
  ],
  declarations: [LocalitesPage]
})
export class LocalitesPageModule {}
