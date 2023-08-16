import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup, FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import { AlbumService } from 'src/app/album.service';


@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.css']
})
export class AddAlbumComponent implements OnInit{

  // le formulaire
  albumForm!: FormGroup;



  // Injection du form Builder, du service AlbumService
  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {

      this.albumForm = this.fb.group({
        id: '',
        name: ['', [
          Validators.required, 
          // Longueur minimale
          Validators.minLength(5)
        ]],
        title: ['', [
          Validators.required, 
        ]],
        ref: ['', [
          Validators.required, 
          // 5 lettres exactes
          Validators.pattern('\\w{5}') // Validators.pattern('[A-Z0-9]{5}')  | doit avoir cinq caractères
        ]],
        duration: ['', [
          Validators.required, 
          Validators.pattern('[0-9]*'), // doit avoir une suite de chiffres
          Validators.max(900)
        ]],
        description: ['', [
          Validators.required, 
        ]],

        // Création d'un champ pour les tags
        tags: this.fb.array([
          this.fb.control('')
        ]), 
        
        /*ou
        tags: new FormArray([
          new FormControl('')
        ]),
        */
       
        status: 'off'
      })
  }

  // Getters de récupération de chaque entrée des champs du formulaire
  get name() {  return this.albumForm.get('name') }
  get title() {  return this.albumForm.get('title') }
  get ref() {  return this.albumForm.get('ref') }
  get duration() {  return this.albumForm.get('duration') }
  get description() {  return this.albumForm.get('description') }
  get tags() { return this.albumForm.get('tags') as FormArray}

  // \w: a-zA-Z0-9
  // \d: digits numbers
  // {number}: nombre d'occurence d'un caractère

  // Méthode exécutée à la soumission du formulaire
  onSubmit() {

    // Envoi dans la base de données 
    console.log(this.albumForm.value);

    // Rediriger sur la page admin
    this.router.navigate(['/admin'], {
      queryParams: {
        message: "Album ajouté avec succès"
      }
    })

  }

  /**
   * Fonction d'ajout d'une étiquette
   */

  addTag() {
    // Ajoute un champ de saisie dans le tableau tags
    this.tags.push(this.fb.control(''))
  }
}
