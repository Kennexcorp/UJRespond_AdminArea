import { Component, OnInit } from '@angular/core';
import {GeneralService} from '../../general.service';
import {GoogleMapComponent, MapsManager} from 'google-maps-ng2';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  latitude: any;
  longitude: any;
  map: any;
  orginmarker: any;
  // 9.962685, 8.878975
  // iconBase = '../../assets/img/ambulance.png';
  constructor(private generalService: GeneralService) {
    this.initialize();
    /*this.generalService.emergencyData.subscribe(
      (data: any) => {
        this.lat = data.latitude;
        this.lng = data.longitude;
        const destination = new google.maps.LatLng(data.latitude, data.longitude);
        const origin = new google.maps.LatLng(this.latitude, this.longitude);
        this.getMap(origin, destination);
      }
    );*/
  }

  ngOnInit() {
    // this.initialize();
    this.showLocation(9.967226, 8.879246);
    this.generalService.emergencyData.subscribe(
      (data: any) => {
        // this.lat = data.latitude;
        // this.lng = data.longitude;
        const destination = new google.maps.LatLng(data.latitude, data.longitude);
        const origin = new google.maps.LatLng(9.967226, 8.879246);
        this.getMap(origin, destination);
      }
    );
  }
  /*private getUserLocation() {
     if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(position => {
         this.latitude = position.coords.latitude;
         this.longitude = position.coords.longitude;
       });
     }
  }*/

  private initialize() {
    // this.getUserLocation();
  }

  private getMap(t_origin: google.maps.LatLng, t_dest: google.maps.LatLng) {
    const directionsDisplay = new google.maps.DirectionsRenderer();
    const origin = t_origin;
    const destination = t_dest;
    const mapOptions = {
      center: origin
    };
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsDisplay.setMap(this.map);
    this.calculateRoute(origin, destination, directionsDisplay);
  }

  private showLocation(lat: number, lng: number) {
    const directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
    const origin = new google.maps.LatLng(lat, lng);
    const mapOptions = {
      zoom: 15,
      center: origin
    };

    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
    this.orginmarker = new google.maps.Marker({
      position: origin,
      map: map,
      label: '',
      title: 'Response Center',
    });
    directionsDisplay.setMap(map);
  }

  private calculateRoute(origin: google.maps.LatLng, destination: google.maps.LatLng, directionsDisplay: google.maps.DirectionsRenderer) {
    const dService = new google.maps.DirectionsService();
    const request: google.maps.DirectionsRequest = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING
    };

    dService.route(request, function (result, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(result);
        const orginmarker = new google.maps.Marker({
          position: origin,
          map: this.map,
          label: 'Response Center',
          title: 'Response Center',
        });
        const destinationMarker = new google.maps.Marker({
          position: destination,
          map: this.map,
          label: 'Emergency Location',
          title: 'Emergency Location',
        });
      }
    });
  }
}
