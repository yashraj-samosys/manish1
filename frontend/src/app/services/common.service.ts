import { Injectable } from '@angular/core';
import { NgZone } from "@angular/core";
import { MapsAPILoader } from '@agm/core';
import { HttpService } from '../services/http.service';
import { ApiUrlService } from '../services/apiUrl.service';
import { AbstractControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class CommonService {
  address:any;
  latitude:any;
  longitude:any;
  geoCoder:any;
  mainAddress = { address: '', latitude: '', longitude: '' };
  mainAddress1 = { address: '', latitude:0, longitude: 0 };
  isMore = false;
  constructor(
    private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader,
    private http: HttpService,
    private apiUrl: ApiUrlService,
  ) { }

  getAddress(element:any) {
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(element);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //verify result
          console.log('place',place)
          if (place.geometry === undefined || place.geometry === null) return;
          this.address = place['formatted_address'];
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();

          this.mainAddress.address = this.address;
          this.mainAddress.latitude = this.latitude;
          this.mainAddress.longitude = this.longitude;
        });
      });
    });
  }
  textTruncate(str: string, limit: number) {
    if (str && str.length >= limit && !this.isMore) return str.substring(0, limit) + "...";
    else return str;
  }


  // spaceOnlyValidator(
  //   control: AbstractControl
  // ): { [key: string]: any } | null {
  //   const isSpace = /^\s+$/.test(control.value);
  //   if (control.value && isSpace) {
  //     return { isOnlyWhiteSpace: true };
  //   }
  //   return null;
  // }


  private cache:{[key:string]:any} = {};

  set(key: string, data: any) {
    this.cache[key] = data;
  }
  
  get(key: string) {
    return this.cache[key];
  }
  
  clear(key: string) {
    delete this.cache[key];
  }


}
