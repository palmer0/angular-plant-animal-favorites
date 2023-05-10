import { Component, OnInit } from '@angular/core';
import {Plant} from "../../models/plant.model";
import {PlantService} from "../../services/plant.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css']
})
export class PlantListComponent implements OnInit {

  plants: Plant[] = [];
  showFavorites = false;

  constructor(
    private plantService: PlantService,
    private router: Router) {}

  ngOnInit(): void {
    this.getPlants();
  }

  getPlants(): void {
    this.plantService.getPlants()
      .subscribe(plants => this.plants = plants);
  }

  /*deletePlant(id: string): void {
    this.plantService.deletePlant(id);
  }

  favoritePlant(id: string): void {
    this.plantService.favoritePlant(id);
  }*/

  /*selectPlant(plant: Plant): void {
    //this.plantService.setSelectedPlant(plant);
    this.router.navigate(['plants', plant.id]);
  }*/

  deletePlant(plant: Plant): void {
    if (plant.id ) {
      //this.plantService.deletePlant(plant.id);
      this.plantService.deletePlant(plant);
      this.router.navigate(['plants']);
    }
  }

  favoritePlant(plant: Plant): void {
    if (plant.id ) {
      //this.plantService.favoritePlant(plant.id);
      this.plantService.favoritePlant(plant);
    }
  }


}
