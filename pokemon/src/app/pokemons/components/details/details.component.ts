import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SimplifiedPokemon } from 'src/app/models/pokemon';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend.service';
import { Location } from '@angular/common';

@Component({
  selector: 'pokemon-details',
  template: `
    <div class="flex gap-4 items-center justify-center">
      <button (click)="prevId()">
        <<
      </button>
      <pokemon-card [pokemon]="pokemon"></pokemon-card>
      <button (click)="nextId()">
        >>
      </button>
    </div>

    <div class="flex w-1/3 px-4 justify-between items-center">
      <button class="border border-gray-600 px-4 py-2 rounded" (click)="like()">
        Like
      </button>
      <button
        class="border border-gray-600 px-4 py-2 rounded"
        (click)="dislike()"
      >
        Dislike
      </button>
    </div>

    <div>
      <button class="btn__backto" [routerLink]="['/pokemons']">Back to Pokemon List</button>
    </div>
  `,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        height: calc(100% - 5rem);
      }

      .btn__backto {
        font-weight: bold;
        font-size: 1rem;
        color: rgb(45, 45, 45);
        &:hover {
          color: rgb(125, 125,125);
        }
      }

    `
  ]
})
export class DetailsComponent implements OnInit{
  [x: string]: any;
  @HostBinding('class') hostClass =
    'flex flex-col gap-4 items-center justify-center';
  pokemon!: SimplifiedPokemon;
  routeSub!: number;
  currentUser!: User;
  idPokemon!: string;
  maxIdPokemon!: string;

  constructor(
    private beService: BackendService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private location: Location) {}

    ngOnInit() {
      this.currentUser = this.authService.user;
      this.route.params.subscribe((params: Params) =>
      {
        this.idPokemon = params['id'];
      });
      this.beService.getPokemonDetail(this.idPokemon).subscribe(pokemon => this.pokemon = pokemon);
      // Get value for numberPokemon
      this.beService.getPokemonList().subscribe(pokemons => {this.maxIdPokemon = String(pokemons.count)});
    }

  // go to next id
  nextId() {
    if ( this.idPokemon == null || this.idPokemon == undefined ) {
      console.log("This Pokemon is not available");
    }
    else if ( this.idPokemon == String(this.maxIdPokemon)) {
      console.log("This Pokemon in the last index");
    }
    else {
      this.idPokemon = String(Number(this.idPokemon) + 1);
      this.gotoPokemon(this.idPokemon);
    }
  }

  // go to prev id
  prevId() {
    if ( this.idPokemon == null || this.idPokemon == undefined ) {
      console.log("This Pokemon is not available");
    }
    else if ( this.idPokemon == '1') {
      console.log("This Pokemon in the first index");
    }
    else {
      this.idPokemon = String(Number(this.idPokemon) - 1);
      this.gotoPokemon(this.idPokemon);

    }
  }

  // Go to Pokemon with input = id
  gotoPokemon(id: string) {
    return this.beService.getPokemonDetail(id).subscribe(pokemon => {
      this.pokemon = pokemon;
      this.location.replaceState('pokemons/' + id);
    });
  }

  like() {
    // like
    this.authService.countLikes();
    console.log(localStorage.getItem('User'));
  }

  dislike() {
    // dislike
    this.authService.countDislikes();
    console.log(localStorage.getItem('User'));
  }
}
