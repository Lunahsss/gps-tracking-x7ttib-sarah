import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  map: any;
  history: { lat: number; lng: number }[] = [];
  iconUrl: string = '../../assets/location.svg';
  polyline: any;

  historyKey: string;

  ngAfterViewInit() {
    this.initializeMap();
    this.trackLocation();
  }

  initializeMap() {
    this.map = L.map('map', {
      zoom: 3,
    }).setView([0, 0], 15);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
      minZoom: 1,
    }).addTo(this.map);

    // Initialize an empty polyline
    this.polyline = L.polyline([], { color: 'blue' }).addTo(this.map);
  }

  trackLocation() {
    if (navigator.geolocation) {
      var currentPos = navigator.geolocation.getCurrentPosition(
        this.success,
        this.error,
        this.options
      );
      if (currentPos != null) {
        this.track(navigator.geolocatin.getCurrentPosition);
      }
      // this.track(navigator.geolocation.getCurrentPosition);
      navigator.geolocation.watchPosition(
        (position) => {
          this.track(position);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  success(pos) {
    console.log('Your current position is:');
    console.log(`Latitude : ${pos.latitude}`);
    console.log(`Longitude: ${pos.longitude}`);
    console.log(`More or less ${pos.accuracy} meters.`);
  }

  error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  track(position) {
    console.log(position);
    const currentLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };

    // Voeg huidige locatie toe aan de geschiedenis
    this.history.push(currentLocation);

    // Update de polyline met de nieuwe geschiedenis
    this.polyline.setLatLngs(this.history);
    // Update de kaart met de huidige locatie
    this.map.setView(currentLocation, 15);

    // Create a custom icon for the marker
    const customIcon = L.icon({
      iconUrl: '',
      iconSize: [10, 10], // Adjust the size of your icon
      iconAnchor: [8, 16],
      popupAnchor: [0, -32],
    });

    // Add the marker with the custom icon to the map
    L.marker(currentLocation, { icon: customIcon }).addTo(this.map);
  }

  SaveHistory() {
    const storedList = localStorage.getItem('historykeys');
    var historyKeys = storedList ? JSON.parse(storedList) : [];

    historyKeys.push(this.historyKey);

    console.log(historyKeys);

    localStorage.setItem('historykeys', JSON.stringify(historyKeys));
    localStorage.setItem(this.historyKey, JSON.stringify(this.history));
  }
}
