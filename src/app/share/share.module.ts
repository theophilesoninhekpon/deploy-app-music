import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginateComponent } from '../paginate/paginate.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [PaginateComponent],
  imports: [
    CommonModule,
    // Importation du module de formulaire réactif
    ReactiveFormsModule
  ],

  // Exportation de ReactiveFormsModule
  exports: [PaginateComponent, ReactiveFormsModule]
})
export class ShareModule { }
