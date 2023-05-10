import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PlantService} from "../../services/plant.service";
import {Plant} from "../../models/plant.model";

@Component({
  selector: 'app-plant-detail',
  templateUrl: './plant-detail.component.html',
  styleUrls: ['./plant-detail.component.css']
})
export class PlantDetailComponent implements OnInit {

  plant?: Plant;

  constructor(
    private route: ActivatedRoute,
    private plantService: PlantService
  ) {}

  /*ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.plant = this.plantService.getPlantById(id);
    });
  }*/

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.plantService.getPlantById(id)
        .subscribe((plant) => {
          this.plant = plant;
        });
    }
  }

  /*editPlant(): void {
    if(this.plant){
      //this.plantService.editPlant(this.plant.id!, this.plant);
      this.plantService.editPlant(this.plant);
    }
  }*/

  deletePlant(): void {
    if(this.plant) {
      //this.plantService.deletePlant(this.plant.id!);
      this.plantService.deletePlant(this.plant);
    }
  }

  favoritePlant(): void {
    if(this.plant) {
      //this.plantService.favoritePlant(this.plant.id!);
      this.plantService.favoritePlant(this.plant);
    }
  }

}
