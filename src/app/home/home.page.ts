import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Geofence } from '@ionic-native/geofence/ngx';

declare var google;
let map: any;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('map',{static:false}) mapElement: ElementRef;

  constructor(public navCtrl: NavController, public platform: Platform, private geofence: Geofence) {
    geofence.initialize().then(
      () => console.log('Geofence Plugin Ready'),
      (err) => console.log(err)
    )

    platform.ready().then(() => {
      this.getPlaces();
    });
  }

  private addGeofence(id, idx, lat, lng, place, desc) {
    let fence = {
      id: id,
      latitude: lat,
      longitude: lng,
      radius: 50,
      transitionType: 3,
      notification: {
          id: idx,
          title: 'You crossed ' + place,
          text: desc,
          openAppOnClick: true
      }
    }
  
    this.geofence.addOrUpdate(fence).then(
       () => console.log('Geofence added'),
       (err) => console.log('Geofence failed to add')
     );
  }
  
  getPlaces() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 19.197787, lng: 72.827232},
      zoom: 17
    });
    let service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
      location: {lat: 19.197787, lng: 72.827232},
      radius: 500,
      type: ['restaurant']
    }, (results,status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          console.log(results[i]);
        }
      }
    });
  }
}
