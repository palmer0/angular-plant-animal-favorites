import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterFavorites'
})
export class FilterFavoritesPipe implements PipeTransform {

  transform(value: any[], showFavorites: boolean): any[] {
    if (showFavorites) {
      return value.filter(item => item.favorite);
    } else {
      return value;
    }
  }

}
