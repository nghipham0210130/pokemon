import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BackendService } from 'src/app/services/backend.service';
import type { PaginatorState } from '../../../components/paginator/paginator.component';

@Component({
  selector: 'pokemon-list',
  template: `
    <paginator
      [currentPage]="currentPage"
      [rowsPerPageOptions]="[10, 20, 40, 80]"
      [rows]="limit"
      [totalRecords]="totalRecords"
      (onPageChange)="onPageChanged($event)"
    ></paginator>
    <input
    type="text"
    class="w-2/4 p-2 rounded border border-gray-600"
    placeholder="Filter by pokemon name..."
    [formControl]="query"
  />
    <data-table [isLoading]="false" [data]="data" [searchValue]="query.value"></data-table>
  `,
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
  query = new FormControl('');
  searchValue: string = '';
  data = [];
  currentPage = 1;
  limit = 20;
  offset = 0;
  totalRecords = 0;

  constructor(private beService: BackendService) {}

  ngOnInit(){
    this.getPokemons();
    // Get total pokemons
    this.beService.getPokemonList().subscribe(pokemons => this.totalRecords = pokemons.count);
  }

  onPageChanged(paginatorState: PaginatorState) {
    this.currentPage = paginatorState.page;
    this.limit = paginatorState.rows;
    this.offset = paginatorState.first;
    this.getPokemons();
    console.log(paginatorState);
  }

  getPokemons() {
    this.beService.getPokemons(this.limit, this.offset).subscribe((data: any) => {
      this.data = data.results;
    });
  }
}
