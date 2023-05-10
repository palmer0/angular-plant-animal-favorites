import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AnimalListComponent}
  from "./components/animal-list/animal-list.component";
import {AnimalDetailComponent}
  from "./components/animal-detail/animal-detail.component";
import {AnimalCreateComponent}
  from "./components/animal-create/animal-create.component";
import {PlantListComponent}
  from "./components/plant-list/plant-list.component";
import {PlantCreateComponent}
  from "./components/plant-create/plant-create.component";
import {PlantDetailComponent}
  from "./components/plant-detail/plant-detail.component";
import {FavoritesComponent} from "./components/favorites/favorites.component";


const routes: Routes = [
  { path: '', redirectTo: '/favorites', pathMatch: 'full' },
  { path: 'animals/:id', component: AnimalDetailComponent },
  { path: 'animal', component: AnimalCreateComponent },
  { path: 'animals', component: AnimalListComponent },
  { path: 'plants/:id', component: PlantDetailComponent },
  { path: 'plant', component: PlantCreateComponent },
  { path: 'plants', component: PlantListComponent },
  { path: 'favorites', component: FavoritesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
