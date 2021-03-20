import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignalRService } from '../services/signal-r.service';
import { cardsLengthValidator, commaSeparationValidator } from '../helpers/comma-separaton-validator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  createForm: FormGroup;
  joinForm: FormGroup;
  selectedCards: string;
  createFormSubmitted = false;
  joinFormSubmitted = false;
  
  constructor(private router: Router, public signalRService: SignalRService) { }

  ngOnInit(): void {
    this.buildCreateForm();
    this.buildJoinForm();
  }

  onJoinSubmit(){
    this.joinFormSubmitted = true;
    console.log('Join');

    if(this.joinForm.invalid){
      return;
    }

    var joinForm = this.joinForm.value;
    console.log(joinForm);

    this.onSubmit(joinForm);
  }

  onCreateSubmit(){
    this.createFormSubmitted = true;

    if(this.createForm.invalid){
      return;
    }
    
    var createForm = this.createForm.value;
    createForm.pokerTableId = this.generatePokerTableHash();

    this.onSubmit(createForm);
  }

  onSubmit(form) {
    // How to send info to another page

    this.signalRService.joinGroup(form.pokerTableId);
    console.log(form);
    this.router.navigate(['/poker-table', form.pokerTableName]);
  }

  onSelectedCardsChange(selectedCards: string){
    this.selectedCards = selectedCards;
    if(selectedCards == 'Custom')
      this.createForm.get('customCards').setValidators([Validators.required, cardsLengthValidator, commaSeparationValidator]);
  }

  get createFormFields() { return this.createForm.controls; }
  get joinFormFields() { return this.joinForm.controls; }

  private buildCreateForm(){
    this.createForm = new FormGroup({
      playerName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      selectedCards: new FormControl('', [Validators.required]),
      customCards: new FormControl('')
    });
  }

  private buildJoinForm(){
    this.joinForm = new FormGroup({
      playerName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      pokerTableId: new FormControl('', [Validators.required, Validators.minLength(5)]),
    });
  }

  private generatePokerTableHash():string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}
