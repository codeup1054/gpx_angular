import {GoogleMap} from "@angular/google-maps";
import {Component, ViewChild} from '@angular/core';
import {team_info} from "./markers";

@Component({
  selector: 'app-map-google',
  templateUrl: 'map-google.component.html',
  styleUrls: ['map-google.component.scss'],
})

export class MapGoogleComponent {


  markers = team_info.map((v: any) => {
    return {position: {lat: v.lat, lng: v.lon}, options: {icon: v.SlackPhoto}}
  });


  // for (let [key, value] of team_info) {
  //   console.log(key, value);
  // }


  // marker1 = { position: { lat: 38.9987208, lng: -77.2538699 } };
  // marker2 = { position: { lat: 39.7, lng: -76.0 } };
  // marker3 = { position: { lat: 37.9, lng: -76.8 } };
  // markers = [this.marker1, this.marker2, this.marker3];


  @ViewChild(GoogleMap) map!: GoogleMap;

  ngAfterViewInit() {
    const bounds = this.getBounds(this.markers);
    if (this.map.googleMap) {
      this.map.googleMap.fitBounds(bounds);
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






