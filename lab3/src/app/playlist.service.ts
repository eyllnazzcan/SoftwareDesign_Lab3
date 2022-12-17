import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Playlist } from './playlist';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class PlaylistService {
  private playlistsUrl = 'api/playlists'; 

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}


  getPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.playlistsUrl).pipe(
      tap((_) => this.log('fetched playlists')),
      catchError(this.handleError<Playlist[]>('getPlaylists', []))
    );
  }

  
  getPlaylistNo404<Data>(id: number): Observable<Playlist> {
    const url = `${this.playlistsUrl}/?id=${id}`;
    return this.http.get<Playlist[]>(url).pipe(
      map((playlists) => playlists[0]),
      tap((h) => {
        const outcome = h ? 'fetched' : 'did not find';
        this.log(`${outcome} playlist id=${id}`);
      }),
      catchError(this.handleError<Playlist>(`getPlaylist id=${id}`))
    );
  }


  getPlaylist(id: number): Observable<Playlist> {
    const url = `${this.playlistsUrl}/${id}`;
    return this.http.get<Playlist>(url).pipe(
      tap((_) => this.log(`fetched playlist id=${id}`)),
      catchError(this.handleError<Playlist>(`getPlaylist id=${id}`))
    );
  }

  
  searchPlaylists(term: string): Observable<Playlist[]> {
    if (!term.trim()) {
 
      return of([]);
    }
    return this.http.get<Playlist[]>(`${this.playlistsUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found playlists matching "${term}"`)
          : this.log(`no playlists matching "${term}"`)
      ),
      catchError(this.handleError<Playlist[]>('searchPlaylists', []))
    );
  }

 
  addPlaylist(playlist: Playlist): Observable<Playlist> {
    return this.http
      .post<Playlist>(this.playlistsUrl, playlist, this.httpOptions)
      .pipe(
        tap((newPlaylist: Playlist) =>
          this.log(`added playlist w/ id=${newPlaylist.id}`)
        ),
        catchError(this.handleError<Playlist>('addPlaylist'))
      );
  }

  deletePlaylist(id: number): Observable<Playlist> {
    const url = `${this.playlistsUrl}/${id}`;

    return this.http.delete<Playlist>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted playlist id=${id}`)),
      catchError(this.handleError<Playlist>('deletePlaylist'))
    );
  }

  updatePlaylist(playlist: Playlist): Observable<any> {
    return this.http.put(this.playlistsUrl, playlist, this.httpOptions).pipe(
      tap((_) => this.log(`updated playlist id=${playlist.id}`)),
      catchError(this.handleError<any>('updatePlaylist'))
    );
  }
 
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      
      console.error(error); 
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  
  private log(message: string) {
    this.messageService.add(`PlaylistService: ${message}`);
  }
}

