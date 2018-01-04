import { Component, OnInit } from '@angular/core';
import {GeneralService} from '../../general.service';
import {GoogleMapComponent, MapsManager} from 'google-maps-ng2';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  // map = new google.maps.Map(document.getElementById('map'));
  latLng: any = [];
  lat: any;
  lng: any;
  map: any;
  iconBase = '../../assets/img/ambulance.png';
  constructor(private generalService: GeneralService) {
    this.generalService.emergencyData.subscribe(
      (data: any) => {
        this.lat = data.latitude;
        this.lng = data.longitude;
        const destination = new google.maps.LatLng(data.latitude, data.longitude);
        const origin = new google.maps.LatLng(9.92963, 8.87451);
        this.getMap(origin, destination);
      }
    );
  }

  ngOnInit() {
    this.initialize();
  }
  private getUserLocation() {
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(position => {
    //     this.lat = position.coords.latitude;
    //     this.lng = position.coords.longitude;
    //   });
    // }
     const lat = 9.92963;
     const lng = 8.87451;
     this.showLocation(lat, lng);
    // const destination = new google.maps.LatLng(lati, lngi);
    // const origin = new google.maps.LatLng(lat, lng);
    // this.getMap(lat, lng);
  }

  private initialize() {
    this.getUserLocation();
  }

  private getMap(t_origin: google.maps.LatLng, t_dest: google.maps.LatLng) {
    /*const lati = 9.932;
    const lngi = 8.864;*/
    const directionsDisplay = new google.maps.DirectionsRenderer();
    const origin = t_origin;
    const destination = t_dest;
    const mapOptions = {
      center: origin
    };
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    const orginmarker = new google.maps.Marker({
      position: origin,
      map: this.map,
      label: '',
      icon: this.iconBase
    });
    directionsDisplay.setMap(this.map);
    /*const orginmarker = new google.maps.Marker({
        position: origin,
        map: map,
        label: 'A'
      });*/
    this.calculateRoute(origin, destination, directionsDisplay);
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
      }
    });
  }

  private showLocation(lat: number, lng: number) {
    const directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
    const origin = new google.maps.LatLng(lat, lng);
    const mapOptions = {
      zoom: 15,
      center: origin
    };
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
    // const iconBase = '../../assets/img/ambulance.png';
    const orginmarker = new google.maps.Marker({
      position: origin,
      map: map,
      label: '',
      icon: this.iconBase
    });
    directionsDisplay.setMap(map);
  }
}
