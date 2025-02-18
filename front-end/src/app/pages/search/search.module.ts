import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search/search.component';
import { SearchTableComponent } from 'src/app/components/search-table/search-table.component';
import { SearchInputComponent } from 'src/app/components/search-input/search-input.component';
import { PaginationComponent } from 'src/app/components/pagination/pagination.component';

@NgModule({
  declarations: [
    SearchComponent,
    SearchTableComponent,
    SearchInputComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule, 
    SearchRoutingModule,
    FormsModule
  ],
  exports: [
    SearchComponent,
    SearchTableComponent,
    SearchInputComponent
  ]
})
export class SearchModule { }

