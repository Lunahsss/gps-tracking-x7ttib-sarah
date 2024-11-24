import { Component, OnDestroy, OnInit, VERSION } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Vehicle } from './dtos/vehicle.dto';
import { DataService } from './services/data.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public selectedVehicle$: Observable<Vehicle>;

  private _vehicles$: BehaviorSubject<Vehicle[]> = new BehaviorSubject<
    Vehicle[]
  >([]);
  public vehicles$: Observable<Vehicle[]> = this._vehicles$.asObservable();
  private _loadingVehicles$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  public loadingVehicles$: Observable<boolean> =
    this._loadingVehicles$.asObservable();
  private _vehiclesSubscription: Subscription;

  constructor(
    private _userService: UserService,
    private _dataService: DataService
  ) {
    this.selectedVehicle$ = this._userService.selectedVehicle$;
  }

  ngOnInit() {
    this._dataService.getVehicles().then((next) => {
      this._vehicles$.next(next);
    });
  }

  vehicleSelectionChanged(event) {
    this._userService.login(event.value);
  }

  ngOnDestroy() {
    if (this._vehiclesSubscription) this._vehiclesSubscription.unsubscribe();
  }
}
