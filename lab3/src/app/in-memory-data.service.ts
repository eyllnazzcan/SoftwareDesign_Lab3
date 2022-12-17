import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Playlist } from './playlist';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const playlists = [
      { id: 1, name: 'Classic Road Trip Songs' },
      { id: 2, name: 'Dinner Music' },
      { id: 3, name: 'Feeling Good' },
      { id: 4, name: 'Soft Piano Songs' },
      { id: 5, name: 'Dance Party' },
      { id: 6, name: 'Throwback Party' },
      { id: 7, name: 'Rock This' },
      { id: 8, name: 'Acoustic Cafe' },
      { id: 9, name: 'Mood Booster' },
    ];
    return { playlists };
  }

  genId(playlists: Playlist[]): number {
    return playlists.length > 0
      ? Math.max(...playlists.map((playlist) => playlist.id)) + 1
      : 11;
  }
}

