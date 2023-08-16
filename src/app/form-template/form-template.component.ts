import { Component } from '@angular/core';
import { Music } from '../music';

@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.css']
})
export class FormTemplateComponent {

  genres = ['Rock', 'Fusion', 'Hard Rock', 'Classique'];
  musicModel = new Music('', '', '');
  isSubmitted = false;

  // updateName(albumName: string){
  //   console.log(albumName)

  //   this.name = albumName;

  // }

  onSubmit(form: any){
    this.isSubmitted = true;
    console.log(this.isSubmitted)
  }
}

/**
 * visité : touched | untouched
 * changé : dirty | pristine
 * validé : valid | unvalid
 * 
 * FormGroup
 *  -> FormControl
 *  -> FormControl
 *  -> FormControl
 * 
 */