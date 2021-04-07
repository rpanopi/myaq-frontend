import { Component, OnInit } from '@angular/core';
import { IServerDetails } from './server-details';
import { ITimezoneDB } from './timezonedb';
import { ServerDetailsService } from './server-details.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  pageTitle = 'Server Details';
  toZoneName = 'Asia/Manila';
  errorMessage = '';
  serverDetails: IServerDetails | undefined;
  timezoneDB: ITimezoneDB | undefined;

  constructor(private serverDetailsService: ServerDetailsService) {}

  ngOnInit(): void {
    this.getServerDetails();
  }

  getServerDetails(): void {
    this.getLocalDateTime();
    
  }

  getLocalDateTime(): void {
    this.serverDetailsService.getLocalDateTime().then((serverDetails) => {
      this.serverDetails = serverDetails;
      this.serverDetails.toZoneName = this.toZoneName;
      this.serverDetails.timestamp = new Date(this.serverDetails.date + " " + this.serverDetails.time).getTime().toString()     
      this.getConvertedTime(this.serverDetails!);
    })
    .catch((error) => {
      this.errorMessage = error;
      console.error("LocalDateTime Promise rejected with " + JSON.stringify(error));
    });
  }

  getConvertedTime(details: IServerDetails): void {
    this.serverDetailsService.convertTime(details).then((timezoneDB) => {
      this.timezoneDB = timezoneDB;
      this.serverDetails!.toTimestamp = (Number(this.timezoneDB!.toTimestamp) * 1000).toString();
    })
    .catch((error) => {
      this.errorMessage = error;
      console.error("CovertedTime Promise rejected with 2" + JSON.stringify(error));
    });
  }


}
