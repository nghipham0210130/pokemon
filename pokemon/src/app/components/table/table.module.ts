import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableComponent } from './table.component';
import { SearchFilterPipe } from '../../search-filter.pipe';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [TableComponent, SearchFilterPipe],
  exports: [TableComponent]
})
export class TableModule {}
