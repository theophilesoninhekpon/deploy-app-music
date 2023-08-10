import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Album, List } from './album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private _albumsUrl: string = environment.albumUrl;
  private _albumListUrl: string = environment.albumListUrl;

  subjectAlbum = new Subject<Album>();
  // Observable qui notifie aux abonné la page actuelle
  sendCurrentNumberPage = new Subject<number>();

  constructor(private http: HttpClient) { }

  /**
   * Fonction de recherche de tous les albums
   * @returns Retourne la liste de tous les albums
   */
  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this._albumsUrl).pipe(
      map((albums: Album[]) => {
        return albums.sort(
          (a: Album, b: Album) => b.duration - a.duration
        );
      })
    );
  }

  /**
   * Fonction de recherche d'un album particulier
   * @param id identifiant de l'album à rechercher
   * @returns Retourne l'album correspondant; undefined si aucun identifiant ne correspond
   */
  getAlbum(id: string): Observable<Album> | undefined {
    return this.http.get<Album>(this._albumsUrl + '/' + id)
      .pipe(
        map((album: Album) => album)
      );
  }


  /**
   * Fonction de recherche des sons d'un albums
   * @param id identifiant de l'album à rechercher
   * @returns La référence sera retourné si elle existe; undefined si l'id n'existe pas dans la liste.
   */
  getAlbumList(id: string): Observable<List> {
    return this.http.get<List>(this._albumListUrl + '/' + id);
  }

  /**
   * Fonction qui retourne le nombre d'albums
   * @returns Le nombre d'albums
   */
  count(): Observable<number> {
    return this.http.get<Album[]>(this._albumsUrl).pipe(
      map((albums: Album[]) => albums.length)
    );
  }


  // order(callback: SortAlbumCallback): AlbumService {
  //   this._albums.sort(callback);
  //   return this; // retourne le service pour permettre le chainage de méthodes
  // }

  // limit(start: number, end: number): AlbumService {
  //   this._albums = this._albums.slice(start, end)
  //   return this; // retourne le service pour permettre le chainage de méthodes
  // }

  paginate(start: number, end: number): Observable<Album[]> {
    return this.http.get<Album[]>(this._albumsUrl).pipe(
      map(
        (albums) => albums.sort(
          (a, b) => b.duration - a.duration
        ).slice(start, end)
      )
    );
  }
/**
 * Type de requête
 *
 * get  => récupérer une resource
 * post => envoyer une resource
 * put  => m-à-j une resource
 */
  search(word: string): Observable<Album[]> {
    return this.http.get<Album[]>(this._albumsUrl).pipe(
      map((albums: Album[]) => {
        // parcourir le tableau d'albums
        return albums.filter(album => {
          // retourner ceux contenant le string de la variable "word"
          return album.title
            .toLowerCase()
            .includes(word.trim().toLowerCase());
        });

      })
    )
  }

  // searchV2(word: string): Album[] {
  //   let re = new RegExp(word.trim(), "g");
  //   return this._albums.filter(album => album.title.match(re));
  // }

  shuffle(songs: string[]) {
    for (let i = songs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    return songs;
  }

  /**
   * Méthode qui renvoi le nombre d'album qu'on
   * aura par page
   */
  paginateNumberPage(): number {
    return environment.numberPage;
  }

  /**
   * Méthode qui signale à tous les composants
   * la page actuelle
  * @param numberPage numéro de la page actuelle
   * @returns
   */
  currentPage(numberPage: number) {
    return this.sendCurrentNumberPage.next(numberPage);
  }

  /**
   * Méthode qui permet de changer le status d'un album à "on"
   * @param album : l'album dont le status doit passer à "on"
  */
  switchOn(album: Album): void {
    album.status = "on";
    // le code ci-dessous s'exécute car on y souscrit
    this.http.put<void>(this._albumsUrl + '/' + album.id, album)
            .subscribe({
              next: (data) => console.log(data),
              error: (err) => console.warn(err),
              complete: () => this.subjectAlbum.next(album)
            })
  }

  /**
    * Méthode qui permet de changer le status d'un album à "off"
    * @param album : l'album dont le status doit passer à "off"
    */
  switchOff(album: Album): void {
    album.status = "off";
    /**
     * renvoi un observable, est ne s'exécute
     * donc qu'à la souscription. Du coup,
     * il faut il souscrire, pour l'exécuter
     */
    this.http.put<void>(`${this._albumsUrl}/${album.id}`, album)
              .subscribe(() => {});
  }
}
