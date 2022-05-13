import {GoogleMap} from "@angular/google-maps";
import {Component, ViewChild} from '@angular/core';
import {team_info} from "./markers";
import {MapInfoWindow, MapMarker} from '@angular/google-maps';
import { faBus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-map-google',
  templateUrl: 'map-google.component.html',
  styleUrls: ['map-google.component.scss']
})

export class MapGoogleComponent {

  mapOptions: google.maps.MapOptions = {
    gestureHandling: 'greedy'
  }

  markers = team_info.map((v: any) => {
    const photoUrl = (v.SlackPhoto.split('-',4).join("-"))+"-40"

    return {position: {lat: v.lat, lng: v.lon},
            options: {icon: photoUrl, label: v.place},
    };
  });

  infoWindows = team_info.map((iw: any) => {
    const photoUrl = (iw.SlackPhoto.split('-',4).join("-"))+"-50"

    return {position: {lat: iw.lat, lng: iw.lon},
      options: {icon: photoUrl,  place: iw.place, name: iw.name},
    };
  });

  @ViewChild(GoogleMap) map!: GoogleMap;

  ngAfterViewInit() {
    const bounds = this.getBounds(this.markers);
    if (this.map.googleMap) {
      this.map.googleMap.fitBounds(bounds);
      // this.map.googleMap.setOptions({this.mapOptions});
    }

  }

  getBounds(markers: any) {
    let north =-90;
    let south =90;
    let east=-180;
    let west=180;

    for (const marker of markers) {
      // set the coordinates to marker's lat and lng on the first run.
      // if the coordinates exist, get max or min depends on the coordinates.
      north = north !== undefined ? Math.max(north, marker.position.lat) : marker.position.lat;
      south = south !== undefined ? Math.min(south, marker.position.lat) : marker.position.lat;
      east = east !== undefined ? Math.max(east, marker.position.lng) : marker.position.lng;
      west = west !== undefined ? Math.min(west, marker.position.lng) : marker.position.lng;
    }


    // const bounds = ;

    return {north, south, east, west};
  }


}






