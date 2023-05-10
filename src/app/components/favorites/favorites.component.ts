import { Component, OnInit } from '@angular/core';
import { PlantService } from 'src/app/services/plant.service';
import {Animal} from "../../models/animal.model";
import {Plant} from "../../models/plant.model";
import {AnimalService} from "../../services/animal.service";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  animals: Animal[] = [];
  plants: Plant[] = [];

  constructor(
    private animalService: AnimalService,
    private plantService: PlantService,
  ) { }

  ngOnInit(): void {
    this.animalService.getFavorites()
      .subscribe(animals => this.animals = animals);
    this.plantService.getFavorites()
      .subscribe(plants => this.plants = plants);
  }

  favoritePlant(plant: Plant) {

  }


  deletePlant(plant: Plant) {

  }

  favoriteAnimal(animal: Animal) {

  }

  deleteAnimal(animal: Animal) {

  }
}
