import {GoogleMap} from "@angular/google-maps";
import {AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {team_info} from "./markers";
import {MapInfoWindow, MapMarker} from '@angular/google-maps';

@Component({
  selector: 'app-map-google',
  templateUrl: 'map-google.component.html',
  styleUrls: ['map-google.component.scss']
})

export class MapGoogleComponent implements AfterViewInit, OnInit {

  mapOptions: google.maps.MapOptions = {
    gestureHandling: 'greedy'
  }

  markers = team_info.map((v: any) => {
    const photoUrl = (v.SlackPhoto.split('-',4).join("-"))+"-40"

    return {position: {lat: v.lat, lng: v.lon},
            options: {icon: photoUrl, label: v.place},
    };
  });

  clusters :any = {}

  infoWindows :any = {}


  @ViewChild(GoogleMap) map!: GoogleMap;

  @ViewChildren(MapInfoWindow) mapInfoWindows!: QueryList<MapInfoWindow>;

  ngOnInit()
  {
    team_info.forEach((iw: any) => {
      const photoUrl = (iw.SlackPhoto.split('-',4).join("-"))+"-50"

      let person_cards = {
        position: {lat: iw.lat, lng: iw.lon},
        icon: photoUrl, place: iw.place, name: iw.name
      };
      if (!this.clusters[iw.place]) {
        this.clusters[iw.place] = {
          position: {lat: iw.lat, lng: iw.lon},
          options: {icon: photoUrl, place: iw.place, name: iw.name},
          persons : []};
      }
      (this.clusters)[iw.place].persons.push(person_cards)
    });

    this.infoWindows = Object.values(this.clusters)
  }

  openInfoWindow(window: MapInfoWindow, marker: MapMarker): void {
    window.open(marker);
  }

  ngAfterViewInit() {
    console.log("@@ infoWindows",this.infoWindows);

    this.mapInfoWindows.forEach((window)=>window.open())

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






