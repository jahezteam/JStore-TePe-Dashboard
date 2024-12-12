import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  @Input() lat: number = 24.45215015618098;
  @Input() lng: number = 39.61865667278247;
  @Output() coordinatesSelected: EventEmitter<L.LatLng> =
    new EventEmitter<L.LatLng>();
  map!: L.Map;

  constructor() {}

  ngOnInit() {
    this.initializeMap();
  }
  ngAfterViewInit() {
    const map = L.map('map').setView([24.4683, 39.6138], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    // Fix map rendering issue
    setTimeout(() => {
      map.invalidateSize();
    }, 200);
  }

  private initializeMap() {
    this.map = L.map('map').setView([this.lat, this.lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    this.map.on('click', (e) => {
      this.lat = e.latlng.lat;
      this.lng = e.latlng.lng;
    });
  }
  saveCoordinates() {
    this.coordinatesSelected.emit(new L.LatLng(this.lat, this.lng));
  }
}
