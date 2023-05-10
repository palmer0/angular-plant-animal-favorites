import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import { AnimalListComponent }
  from './components/animal-list/animal-list.component';
import { AnimalDetailComponent }
  from './components/animal-detail/animal-detail.component';
import { AnimalCreateComponent }
  from './components/animal-create/animal-create.component';
import {FormsModule} from "@angular/forms";
import { PlantListComponent }
  from './components/plant-list/plant-list.component';
import { PlantCreateComponent }
  from './components/plant-create/plant-create.component';
import { FilterFavoritesPipe }
  from './pipes/filter-favorites.pipe';
import { PlantDetailComponent }
  from './components/plant-detail/plant-detail.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

const firebaseConfig = {
  apiKey: "AIzaSyDMg3i_HPHF6ZGVLYFgupLT4Y5jipK-1Tg",
  authDomain: "favoritos-plantas-animales.firebaseapp.com",
  projectId: "favoritos-plantas-animales",
  storageBucket: "favoritos-plantas-animales.appspot.com",
  messagingSenderId: "820281706374",
  appId: "1:820281706374:web:93abe25e9e16539be50e07"
};


@NgModule({
  declarations: [
    AppComponent,
    AnimalListComponent,
    AnimalDetailComponent,
    AnimalCreateComponent,
    PlantListComponent,
    PlantCreateComponent,
    PlantDetailComponent,
    FilterFavoritesPipe,
    FavoritesComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
