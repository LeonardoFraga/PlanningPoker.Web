import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignalRService } from '../services/signal-r.service';
import { cardsLengthValidator, commaSeparationValidator } from '../helpers/comma-separaton-validator';
import { PokerTable } from '../models/poker-table';
import { PokerTableService } from '../services/poker-table.service';

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
  
  constructor(private router: Router, public signalRService: SignalRService, private pokerService: PokerTableService) { }

  ngOnInit(): void {
    this.buildCreateForm();
    this.buildJoinForm();
  }

  onJoinSubmit(){
    this.joinFormSubmitted = true;

    if(this.joinForm.invalid){
      return;
    }

    var joinForm = this.joinForm.value;
    this.onSubmit(joinForm);
  }

  onCreateSubmit(){
    this.createFormSubmitted = true;

    if(this.createForm.invalid){
      return;
    }
    
    let pokerTable = this.createPokerTable(this.createForm.value);
    
    this.pokerService.savePokerTableCards(pokerTable);

    this.onSubmit(pokerTable);
  }

  onSubmit(form) {
    this.signalRService.joinGroup(form.pokerTableId);
    this.router.navigate(['/poker-table', form.pokerTableId]);
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

  private createPokerTable(createForm): PokerTable{
    let pokerTableId = this.generatePokerTableHash();
    let selectedCards = createForm.selectedCards === 'Custom' 
                          ? createForm.customCards
                          : createForm.selectedCards

    let pokerTable = new PokerTable(pokerTableId, selectedCards)

    return pokerTable;
  }
}
