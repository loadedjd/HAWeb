import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule, MatButtonModule, MatIconModule, MatGridListModule, MatListModule, MatCardModule,
  MatTableModule, MatExpansionModule, MatSelectModule } from '@angular/material';
import { ConnectedClientsComponent } from './connected-clients/connected-clients.component';
import { IncomingDataComponent } from './incoming-data/incoming-data.component';
import { ClientComponent } from './client/client.component';
import { DatabaseService } from './Services/DatabaseService';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { HistoricalComponent } from './historical/historical.component';
import { FormsModule } from '@angular/forms';
import { ChartComponent } from './chart/chart.component';

const routes: Routes = [{
  path: 'realTime',
  component: IncomingDataComponent
},
{
  path: 'clients',
  component: ConnectedClientsComponent
}, {
  path: 'historical',
  component: HistoricalComponent
}];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConnectedClientsComponent,
    IncomingDataComponent,
    ClientComponent,
    HistoricalComponent,
    ChartComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatExpansionModule,
    MatSelectModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DatabaseService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
