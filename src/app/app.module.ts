import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
// table related imports
import { HomeComponent } from './components/home/home.component';
import { HistoryComponent } from './components/history/history.component';
import { TrackingComponent } from './components/tracking/tracking.component';
import { UserService } from './services/user.service';
import { DataService } from './services/data.service';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ButtonModule,
    DropdownModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'tracking', component: TrackingComponent },
    ]),
  ],
  entryComponents: [],
  declarations: [
    AppComponent,
    HomeComponent,
    HistoryComponent,
    TrackingComponent,
  ],
  bootstrap: [AppComponent],
  providers: [DataService, UserService],
})
export class AppModule {}
