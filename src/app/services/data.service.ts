import { Injectable } from '@angular/core';
import { Client, Databases, Query, Models, ID } from 'appwrite';
import { Vehicle } from '../dtos/vehicle.dto';

@Injectable()
export class DataService {
  private _client: Client;
  private _db: Databases;
  private _projectId: string = '65a1384dc3b538475405';
  private _endpoint: string = 'https://cloud.appwrite.io/v1';
  private _databaseId: string = '65a14a43ef0738e45cc9';
  private _collectionIdVehicles = '65a187466d649208fae4';
  private _collectionIdGeolocation = '65a1874e6753e6f2362c';

  constructor() {
    this._client = new Client();
    this._client.setEndpoint(this._endpoint).setProject(this._projectId);
    this._db = new Databases(this._client);
    this.test2();
    this.test();
  }

  public getVehicles(): Promise<Vehicle[]> {
    return this._db
      .listDocuments(this._databaseId, this._collectionIdVehicles, [])
      .then((response) => {
        const documents = response.documents || [];
        return documents.map(
          (doc: Models.Document) => doc as unknown as Vehicle
        );
      }) as Promise<Vehicle[]>;
  }

  public getGeolocations(): Promise<any[]> {
    return this._db
      .listDocuments(this._databaseId, this._collectionIdGeolocation, [])
      .then((response) => {
        const documents = response.documents || [];
        return documents.map((doc: Models.Document) => doc as unknown as any);
      }) as Promise<any[]>;
  }

  test2() {
    this.getGeolocations().then((next) => {
      console.log('test2', next);
    });
  }

  test() {
    const vehicleResponse = this._db
      .createDocument(
        this._databaseId,
        this._collectionIdGeolocation,
        ID.unique(),
        {
          lat: 1,
          long: 1,
        }
      )
      .then(
        (next) => {
          console.log('test', next);

          const x = this._db
            .updateDocument(
              this._databaseId,
              this._collectionIdVehicles,
              '65a188153461297f5da6',
              {
                geolocation: next,
              }
            )
            .then(
              (next) => {
                console.log('testxxxxx', next);
              },
              (err) => {
                console.log('testxxxx', err);
              }
            );
        },
        (err) => {
          console.log('test', err);
        }
      );
  }
}
