import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { Client, Account, Databases, Query } from 'appwrite';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  private client = new Client();
  private db: any;
  map: L.Map;
  trackSessions: any;
  history: { lat: number; lng: number }[];

  constructor() {}

  ngOnInit() {
    this.initMap();
    this.client
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject('65a14b60b046343c3fe7');
    this.db = new Databases(this.client);
    this.db
      .listDocuments('65a14a43ef0738e45cc9', '65a14b60b046343c3fe7', [])
      .then((response) => {
        this.trackSessions = response.documents;
        console.log('data', response);
      })
      .catch((err) => console.log('err', err));
  }

  getAndViewHistory(trackSession: any) {
    this.db
      .listDocuments('65a14a43ef0738e45cc9', 'Id', [
        Query.equal('tracksession', [trackSession.$id]),
      ])
      .then((response) => {
        console.log('data', response);
      })
      .catch((err) => console.log('err', err));
  }

  private initMap(): void {
    this.map = L.map('map').setView([0, 0], 2); // set initial view
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
      this.map
    );
  }

}
