import { Component, OnInit } from '@angular/core';
import { SignalRService } from './services/signal-r.service';
import { HttpClient } from '@angular/common/http';
import { Vote } from './models/vote';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  vote: number;
  group: string;

  votes = new Array<Vote>();

  votted: Vote;
  voteForm = this.formBuilder.group({
    value: '',
    groupName: ''
  });

  constructor(public signalRService: SignalRService, private http: HttpClient, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.subscribeToEvents();
    //this.signalRService.startConnection();
    
    // this.startHttpRequest();
  }

  // private startHttpRequest = () => {
  //   this.http.get('https://localhost:5001/api/vote')
  //     .subscribe(res => {
  //       console.log(res);
  //     })
  //   }
  // onSubmit(): void {
  //   this.signalRService.addTransferChartDataListener();
  //   this.votted = this.voteForm.value;
  //   this.http.post('https://localhost:5001/Vote/AddVote', { value: this.votted.value })
  //     .subscribe(res => {
  //       console.log(res);
  //     })
  // }

  onSubmit(): void {
    
    this.votted = this.voteForm.value;
    this.signalRService.joinGroup(this.votted.groupName)
    this.signalRService.sendMessageToGroup(this.votted);
    // this.http.post('https://localhost:5001/Vote/SendGroupMessage', { value: this.votted.value, groupName: this.votted.groupName })
    //   .subscribe(res => {
    //     console.log('A respota voltou por aqui: ' + res);
    //   })
  }

  private subscribeToEvents(): void {  
    this.signalRService.messageReceived.subscribe((vote: Vote) => {  
     // put on screen
     //this.results = message;
     console.log('data', vote);  
     this.votes.push(vote);
     console.log(this.votes);
    });
  }
  // OnInput(event: any) {
  //   this.group = event.target.value;
  //   // this.http.post('https://localhost:5001/JoinGroup', { value: this.vote })
  //   //   .subscribe(res => {
  //   //     console.log(res);
  //   //   })
  //   console.log('Call send group');
  //   this.signalRService.sendMessageToGroup('Teste', 'ABC');
  // }
}
