import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Playlist } from '../playlist';
import { PlaylistService } from '../playlist.service';

@Component({
  selector: 'app-playlist-search',
  templateUrl: './playlist-search.component.html',
  styleUrls: [ './playlist-search.component.css' ]
})
export class PlaylistSearchComponent implements OnInit {
  playlists$!: Observable<Playlist[]>;
  private searchTerms = new Subject<string>();

  constructor(private playlistService: PlaylistService) {}
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.playlists$ = this.searchTerms.pipe(
     
      debounceTime(300),
      distinctUntilChanged(),

      switchMap((term: string) => this.playlistService.searchPlaylists(term)),
    );
  }
}
