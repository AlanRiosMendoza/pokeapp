import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.page.html',
  styleUrls: ['./pokemon-list.page.scss'],
})
export class PokemonListPage implements OnInit {
  pokemons: any[] = [];
  loading = false;
  search = false;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.fetchPokemons();
  }

  // Obtiene una lista de Pokémon
  fetchPokemons() {
    this.search = false;
    this.loading = true;
    this.pokemonService.getPokemons(50).subscribe({
      next: (res: any) => {
        this.pokemons = res.results;
        this.loading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  // Filtra Pokémon por nombre
  filterPokemons(name: string) {
    this.loading = true;
    this.search = true;
    this.pokemonService.getPokemonDetails(name).subscribe({
      next: (res: any) => {
        this.pokemons = [res];
        this.loading = false;
        this.search = true;
      },
      error: (err: any) => {
        console.error(err);
        this.loading = false;
        this.search = false;
      }
    });
  }

  // Manejador del evento de búsqueda
  onSearchChange(event: any) {
    const searchTerm = event.target.value.trim().toLowerCase();
    if (searchTerm) {
      this.filterPokemons(searchTerm);
    } else {
      this.fetchPokemons();
    }
  }
}
