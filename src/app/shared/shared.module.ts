import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroPesquisaPipe } from './filtro-pesquisa.pipe';

import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [FiltroPesquisaPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    CommonModule,
    ReactiveFormsModule,
    FiltroPesquisaPipe,
  ]
})
export class SharedModule { }
