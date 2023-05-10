import { Component, OnInit } from '@angular/core';
import {Animal} from "../../models/animal.model";
import {AnimalService} from "../../services/animal.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.css']
})
export class AnimalListComponent implements OnInit {

  animals: Animal[] = [];
  showFavorites = false;

  constructor(
    private animalService: AnimalService,
    private router: Router) {}

  ngOnInit() {
    this.getAnimals();
  }

  getAnimals(): void {
    this.animalService.getAnimals()
      .subscribe(animals => this.animals = animals);
  }

  /*selectAnimal(animal: Animal): void {
    //this.animalService.setSelectedAnimal(animal);
    this.router.navigate(['animals', animal.id]);
  }*/


  deleteAnimal(animal: Animal): void {
    if (animal.id ) {
      //this.animalService.deleteAnimal(animal.id);
      this.animalService.deleteAnimal(animal);
      this.router.navigate(['animals']);
    }
  }

  favoriteAnimal(animal: Animal): void {
    if (animal.id ) {
      //this.animalService.favoriteAnimal(animal.id);
      this.animalService.favoriteAnimal(animal);
    }
  }

}
