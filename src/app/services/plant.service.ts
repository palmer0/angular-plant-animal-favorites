import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {finalize, map} from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/compat/firestore";
import {Plant} from "../models/plant.model";
import {Animal} from "../models/animal.model";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  private plantCollection: AngularFirestoreCollection<Plant>;
  private plants$: Observable<Plant[]>;
  //private selectedPlant: Plant | undefined;

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.plantCollection = firestore.collection<Plant>('plants');
    this.plants$ = this.plantCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Plant;
          const id = a.payload.doc.id;
          return {id, ...data};
        }))
    );
  }

  getPlants(): Observable<Plant[]> {
    return this.plants$;
  }

  /*setSelectedPlant(plant: Plant): void {
    this.selectedPlant = plant;
  }

  getSelectedPlant(): Plant | undefined {
    return this.selectedPlant;
  }*/

  /*createPlant(plant: Plant): void {
    this.plantCollection.add(plant);
  }*/

  createPlant(plant: Animal, imageFile: File): void {
    const ref =
      this.storage.ref('plants/' + plant.name);
    const task = ref.put(imageFile);
    task.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().subscribe(imageUrl => {
          plant.imageUrl = imageUrl;
          this.plantCollection.add(plant);
        });
      })
    ).subscribe();
  }

  /*deletePlant(id: string): void {
    this.plantCollection.doc(id).delete();
  }*/

  deletePlant(plant: Plant): void {
    this.plantCollection.doc(plant.id).delete();
  }

  getPlantById(id: string): Observable<Plant | undefined> {
    return this.firestore
      .doc<Plant>(`plants/${id}`)
      .valueChanges({idField: id});
  }


  /*editPlant(id: string, plant: Plant): void {
    this.plantCollection.doc(id).update(plant);
  }*/

  /*editPlant(plant: Plant): void {
    this.plantCollection.doc(plant.id).update(plant);
  }*/

  /*favoritePlant(id: string): void {
    this.plantCollection.doc(id).update({ favorite: true });
  }*/

  getFavorites(): Observable<Animal[]> {
    return this.plantCollection.valueChanges({idField: 'id'})
      .pipe(
        map(plants =>
          plants.filter(plant => plant.favorite)
        )
      );
  }

  favoritePlant(plant: Plant): void {
    //this.plantCollection.doc(plant.id).update({ favorite: true });
    //this.plantCollection.doc(plant.id).update({ favorite: !plant.favorite });
    plant.favorite = !plant.favorite;
    this.plantCollection.doc(plant.id).update(plant);
  }

  /*
  favoritePlant(id: string): void {
    const plant = this.plantCollection.doc(id);
    plant.get().toPromise().then(doc => {
      if (doc.exists) {
        const data = doc.data() as Plant;
        data.favorite = true;
        plant.update(data);
      }
    });
  }
  */
}
