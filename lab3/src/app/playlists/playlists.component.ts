import { Component, OnInit } from '@angular/core';

import { Playlist } from '../playlist';
import { PlaylistService } from '../playlist.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {
  playlists: Playlist[] = [];

  constructor(private playlistService: PlaylistService) { }

  ngOnInit(): void {
    this.getPlaylists();
  }

  getPlaylists(): void {
    this.playlistService.getPlaylists()
    .subscribe(playlists => this.playlists = playlists);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.playlistService.addPlaylist({ name } as Playlist)
      .subscribe(playlist => {
        this.playlists.push(playlist);
      });
  }

  delete(playlist: Playlist): void {
    this.playlists = this.playlists.filter(h => h !== playlist);
    this.playlistService.deletePlaylist(playlist.id).subscribe();
  }

}
