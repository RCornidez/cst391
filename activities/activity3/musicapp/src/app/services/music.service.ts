import { Injectable } from '@angular/core';
import exampledata from '../../data/sample-music-data.json';
import { Artist } from './../models/artists.model';
import { Album } from '../models/albums.model';

@Injectable({ providedIn: 'root' })
export class MusicService {

  albums: Album[] = exampledata;

  public getArtists(): Artist[] {
    let artists: Artist[] = [];
    let artistSet = new Set<string>();

    // extract the artists from example data (albums)
    this.albums.forEach(a => artistSet.add(a.artist));
    artistSet.forEach(a => artists.push({artist: a}))

    return artists;
  }

  public getAlbums(): Album[] {
    // simply return the albums list
    return this.albums;
  }

  public getAlbumsOfArtist(artistName: String): Album[] {
    let albums: Album[] = [];

    // returns the album for the selected artist
    this.albums.forEach(album => {
      if (album.artist == artistName) {
        albums.push(album);
      }
    });
    return albums;

  }

  public createAlbum(album: Album): number {
    // Creates an album by pushing it to the albums list
    this.albums.push(album);
    return 1;
  }

}
