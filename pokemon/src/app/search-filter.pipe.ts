import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(pokemons: Pokemon[], searchValue: string): Pokemon[] {
    if (!pokemons || !searchValue) {
      return pokemons;
    }
    return pokemons.filter(pokemon => pokemon.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
  }
}
