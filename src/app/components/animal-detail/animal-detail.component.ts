import { Component, OnInit } from '@angular/core';
import {Animal} from "../../models/animal.model";
import {AnimalService} from "../../services/animal.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.css']
})
export class AnimalDetailComponent implements OnInit {

  animal?: Animal;

  constructor(
    private route: ActivatedRoute,
    private animalService: AnimalService
  ) {}

  /*ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.animal = this.animalService.getAnimalById(id);
    });
  }*/

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.animalService.getAnimalById(id)
        .subscribe((animal) => {
          this.animal = animal;
        });
    }
  }

  /*ngOnInit() {
    this.animal = this.animalService.getSelectedAnimal();
  }*/

  /*editAnimal(): void {
    if(this.animal){
      //this.animalService.editAnimal(this.animal.id!, this.animal);
      this.animalService.editAnimal(this.animal);
    }

  }*/

  deleteAnimal(): void {
    if(this.animal) {
      //this.animalService.deleteAnimal(this.animal.id!);
      this.animalService.deleteAnimal(this.animal);
    }
  }

  favoriteAnimal(): void {
    if(this.animal) {
      //this.animalService.favoriteAnimal(this.animal.id!);
      this.animalService.favoriteAnimal(this.animal);
    }
  }
}
