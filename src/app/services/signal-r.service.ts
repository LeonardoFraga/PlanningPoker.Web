import { EventEmitter, Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { Vote } from '../models/vote';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  
  messageReceived = new EventEmitter<Vote>();
  private _hubConnection: signalR.HubConnection

  constructor() {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();
  }

  private createConnection() {
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/vote')
      .build();
  }

  private startConnection(): void {
    this._hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  private registerOnServerEvents(): void {
    this._hubConnection.on('sendMessageToAGroup', (data: Vote) => {
      this.messageReceived.emit(data);
    });
  }

  public joinGroup(group: string) {
    this._hubConnection.invoke('JoinGroup', group);
  }

  public sendMessageToGroup(vote: Vote) {
    this._hubConnection.invoke('SendGoupMessage', vote);
  }
}
