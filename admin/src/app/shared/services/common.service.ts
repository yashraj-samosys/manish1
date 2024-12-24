import { Injectable } from '@angular/core';
import { NgZone } from "@angular/core";
import { MapsAPILoader } from '@agm/core';
import { HttpService } from '../services/http.service';
import { ApiUrlService } from '../services/apiUrl.service';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommonService {
  address;
  latitude;
  longitude;
  geoCoder;
  mainAddress = { address: '', latitude: '', longitude: '' };
  mainAddress1 = { address: '', latitude:0, longitude: 0 };
  isMore = false;
  state_Obj;
  city_Obj;
  country_Json;
  map_address;
  constructor(
    private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader,
    private http: HttpService,
    private apiUrl: ApiUrlService,
  ) { }

  getAddress(element) {
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(element);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //verify result
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

  // getAddress1(element) {
  //   this.mapsAPILoader.load().then(() => {
  //     this.geoCoder = new google.maps.Geocoder;
  //     let autocomplete = new google.maps.places.Autocomplete(element);
  //     autocomplete.addListener("place_changed", () => {
  //       this.ngZone.run(() => {
  //         //get the place result
  //         let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  //         //verify result
  //         if (place.geometry === undefined || place.geometry === null) return;
  //         this.mainAddress1.address = place['formatted_address'];
  //         this.mainAddress1.latitude =place.geometry.location.lat();
  //         this.mainAddress1.longitude =place.geometry.location.lng();
         
  //         });
  //     });
      
  //   });    
  // }



  getAddress1(element) {

    this.country_Json = [];
    this.state_Obj = [];
    this.city_Obj = [];
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(element);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) return;
          this.mainAddress1.address = place['formatted_address'];
          this.mainAddress1.latitude = place.geometry.location.lat();
          this.mainAddress1.longitude = place.geometry.location.lng();
          // var latlng = { lat: (place.geometry.location.lat()), lng: (place.geometry.location.lng()) };
          // this.geoCoder.geocode({ 'location': latlng }, (results, status) => {
          //    if (status === 'OK') {
          //      console.log(results)
          //      if (results[0]) {
          //        var street = "";
          //        var city = "";
          //        var state = "";
          //        var country = "";
          //        var zipcode = "";
          //        for (var i = 0; i < results.length; i++) {
          //          if (results[i].types[0] === "locality") {
          //            city = results[i].address_components[0].long_name;
          //            state = results[i].address_components[2].long_name;
                     
          //          }
          //          if (results[i].types[0] === "postal_code" && zipcode == "") {
          //            zipcode = results[i].address_components[0]?.long_name;
          //            city = results[i].address_components[2]?.long_name;
          //            state = results[i].address_components[3]?.long_name;
                     
       
          //          }
       
          //          if (results[i].types[0] === "country") {
          //            country = results[i].address_components[0]?.long_name;
       
          //          }
          //          if (results[i].types[0] === "route" && street == "") {
       
          //            for (var j = 0; j < 4; j++) {
          //              if (j == 0) {
          //                street = results[i].address_components[j]?.long_name;
          //              } else {
          //                street += ", " + results[i].address_components[j]?.long_name;
          //              }
          //            }
       
          //          }
          //          if (results[i].types[0] === "street_address") {
          //            for (var j = 0; j < 4; j++) {
          //              if (j == 0) {
          //                street = results[i].address_components[j]?.long_name;
          //              } else {
          //                street += ", " + results[i].address_components[j]?.long_name;
          //              }
          //            }
       
          //          }
          //        }
          //        if (zipcode == "") {
          //          if (typeof results[0].address_components[8] !== 'undefined') {
          //            zipcode = results[0].address_components[8]?.long_name;
          //          }
          //        }
          //        if (country == "") {
          //          if (typeof results[0].address_components[7] !== 'undefined') {
          //            country = results[0].address_components[7]?.long_name;
          //          }
          //        }
          //        if (state == "") {
          //          if (typeof results[0].address_components[6] !== 'undefined') {
          //            state = results[0].address_components[6]?.long_name;
          //          }
          //        }
          //        if (city == "") {
          //          if (typeof results[0].address_components[5] !== 'undefined') {
          //            city = results[0].address_components[5].long_name;
          //          }
          //        }
       
          //        this.map_address = {
          //          "street": street,
          //          "city": city,
          //          "state": state,
          //          "country": country,
          //          "zipcode": zipcode,
          //        };
          //       }
          //     }
          //   })
          });
      });
      
    });    
  } 

  async getClientDetails(id) {
    let result = await this.http.get(this.apiUrl.url.getAgentById + id);
    return result;
  }

  textTruncate(str,str1, limit) {
    if(str1 == null) str1=str;
    if (str && str.length >= limit && !this.isMore) return str1.substring(0, limit) + "...";
    else return str;
  }
  readMore() { this.isMore = !this.isMore }
}
