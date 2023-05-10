import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import {Animal} from "../models/animal.model";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/compat/firestore";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Plant} from "../models/plant.model";

@Injectable({
  providedIn: 'root'
})
export class AnimalService {


  private animalCollection: AngularFirestoreCollection<Animal>;
  private animals$: Observable<Animal[]>;
  //private selectedAnimal: Animal | undefined;


  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.animalCollection = firestore.collection<Animal>('animals');
    this.animals$ = this.animalCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Animal;
          const id = a.payload.doc.id;
          return {id, ...data};
        }))
    );
  }

  getAnimals(): Observable<Animal[]> {
    return this.animals$;
  }

  /*
  setSelectedAnimal(animal: Animal): void {
    this.selectedAnimal = animal;
  }


  getSelectedAnimal(): Animal | undefined {
    return this.selectedAnimal;
  }
  */

  getAnimalById(id: string): Observable<Plant | undefined> {
    return this.firestore
      .doc<Animal>(`animals/${id}`)
      .valueChanges({idField: id});
  }


  createAnimal(animal: Animal, imageFile: File): void {
    const ref =
      this.storage.ref('animals/' + animal.name);
    const task = ref.put(imageFile);
    task.snapshotChanges().pipe(
      finalize(() => {
        ref.getDownloadURL().subscribe(imageUrl => {
          animal.imageUrl = imageUrl;
          this.animalCollection.add(animal);
        });
      })
    ).subscribe();
  }

  /*editAnimal(id: string, animal: Animal): void {
    this.animalCollection.doc(id).update(animal);
  }*/

  /*editAnimal(animal: Animal): void {
    this.animalCollection.doc(animal.id).update(animal);
  }*/

  getFavorites(): Observable<Animal[]> {
    return this.animalCollection.valueChanges({idField: 'id'})
      .pipe(
        map(animals =>
          animals.filter(animal => animal.favorite)
        )
      );
  }

  deleteAnimal(animal: Animal): void {
    this.animalCollection.doc(animal.id).delete();
  }
  /*deleteAnimal(id: string): void {
    this.animalCollection.doc(id).delete();
  }*/

  favoriteAnimal(animal: Animal): void {
    //this.animalCollection.doc(animal.id).update({ favorite: !animal.favorite });
    animal.favorite = !animal.favorite;
    this.animalCollection.doc(animal.id).update(animal);
  }

  /*favoriteAnimal(id: string): void {
    this.animalCollection.doc(id).update({ favorite: true });
  }*/
}
