import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Vehicle } from '../dtos/vehicle.dto';

@Injectable()
export class UserService {
  private _selectedVehicle$: BehaviorSubject<Vehicle> =
    new BehaviorSubject<Vehicle>(null);
  public selectedVehicle$: Observable<Vehicle> =
    this._selectedVehicle$.asObservable();

  constructor(private router: Router) {
    this._selectedVehicle$.next({} as Vehicle);
  }

  login(vehicle: Vehicle) {
    this._selectedVehicle$.next(vehicle);
  }
}
