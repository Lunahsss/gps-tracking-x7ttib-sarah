import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss'],
})
export class TrackingComponent implements OnInit, OnDestroy {
  public intervallTimer = interval(5000);
  private _intervalSubscription: Subscription;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this._intervalSubscription = this.intervallTimer.subscribe(() =>
      this.updateLocation()
    );
  }

  updateLocation() {
    // console.log('updatingLocation');
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        this.sendLocationToBackend(pos.coords.latitude, pos.coords.longitude),
      (err) => console.log('updatelocation', err)
    );
  }

  sendLocationToBackend(latitude: number, longitude: number) {
    console.log('Stuur locatie naar backend:', { latitude, longitude });
    
  }

  ngOnDestroy() {
    if (this._intervalSubscription) this._intervalSubscription.unsubscribe();
  }
}
