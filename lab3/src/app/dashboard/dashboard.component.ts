import { Component, OnInit } from '@angular/core';
import { Playlist } from '../playlist';
import { PlaylistService } from '../playlist.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  playlists: Playlist[] = [];

  constructor(private playlistService: PlaylistService) { }

  ngOnInit(): void {
    this.getPlaylists();
  }

  getPlaylists(): void {
    this.playlistService.getPlaylists()
      .subscribe(playlists => this.playlists = playlists.slice(1, 5));
  }
}
