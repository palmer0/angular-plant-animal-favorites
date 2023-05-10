import { Component } from '@angular/core';
import {Plant} from "../../models/plant.model";
import {PlantService} from "../../services/plant.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-plant-create',
  templateUrl: './plant-create.component.html',
  styleUrls: ['./plant-create.component.css']
})
export class PlantCreateComponent {

  newPlant: Plant = {
    name: '',
    description: '',
    favorite: false
  };

  imageFile?: File;

  constructor(
    private plantService: PlantService,
    private router: Router) {}

  /*
  createPlant(): void {
    this.plantService.createPlant(this.newPlant);
  }
  */

  createPlant(): void {
    if (this.imageFile) {
      this.plantService.createPlant(this.newPlant, this.imageFile);
      this.router.navigate(['plants']);
    }
  }

  onFileSelected(event: any): void {
    this.imageFile = event.target.files[0];
  }
}
