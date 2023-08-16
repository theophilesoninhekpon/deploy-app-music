import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { fadeInAnimation } from '../animation.module';

@Component({
  selector: 'app-form-reactive',
  templateUrl: './form-reactive.component.html',
  styleUrls: ['./form-reactive.component.css'],
  animations: [fadeInAnimation]
})
export class FormReactiveComponent {

  constructor(private fb: FormBuilder){}
  
  genres = ['Rock', 'Fusion', 'Hard Rock', 'Classique'];

  musicForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    auteur: ['', Validators.required, Validators.minLength(4)],
    genre: [this.genres[0]]
  });

  get name() { return this.musicForm.get("name");}
  get auteur() { return this.musicForm.get("auteur");}
  get genre() { return this.musicForm.get("genre");}

  // search = new FormControl('');

  onSubmit() {
    console.warn(this.musicForm.value)
  }

}
