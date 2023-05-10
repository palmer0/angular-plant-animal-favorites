import { Component } from '@angular/core';
import {Animal} from "../../models/animal.model";
import {AnimalService} from "../../services/animal.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-animal-create',
  templateUrl: './animal-create.component.html',
  styleUrls: ['./animal-create.component.css']
})
export class AnimalCreateComponent {

  newAnimal: Animal = {
    name: '',
    description: '',
    favorite: false
  };

  imageFile?: File;

  constructor(
    private animalService: AnimalService,
    private router: Router) {}

  createAnimal(): void {
    if (this.imageFile) {
      this.animalService.createAnimal(this.newAnimal, this.imageFile);
      this.router.navigate(['animals']);
    }
  }

  onFileSelected(event: any): void {
    this.imageFile = event.target.files[0];
  }
}
