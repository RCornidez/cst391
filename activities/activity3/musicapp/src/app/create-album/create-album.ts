import { Component } from '@angular/core';
import { Track } from '../models/tracks.model';
import { MusicService } from '../services/music.service';
import { Album } from '../models/albums.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-album',
  imports: [FormsModule],
  templateUrl: './create-album.html',
  styleUrl: './create-album.css',
})
export class CreateAlbum {

  album: Album = {
    albumId: Math.floor(Math.random() * 1000000),
    title: "",
    artist: "",
    description: "",
    year: "",
    image: "",
    tracks: [],
  };

  tracksRaw: string = "";
  wasSubmitted: boolean = false;

  constructor(private service: MusicService) { }

  ngOnInit() {
  }

  public onSubmit() {
    // Parse the Tracks and add to the Album then call the Service to create the new Album
    let tracks: Track[] = [];
    let tracksAll = this.tracksRaw.split('\n');
    for (let i = 0; i < tracksAll.length; ++i) {
      let title = "";
      let lyrics = "";
      let video = "";
      let trackInfo = tracksAll[i];
      let trackParts = trackInfo.split(':');
      if (trackParts.length == 3) {
        title = trackParts[0];
        lyrics = trackParts[1];
        video = trackParts[2];
      }
      else if (trackParts.length == 2) {
        title = trackParts[0];
        lyrics = trackParts[1];
      }
      else {
        title = trackParts[0];
      }
      tracks.push(
        { trackId: Math.floor(Math.random() * 1000000), number: i + 1, title, lyrics, video }
      );
    }
    this.album.tracks = tracks;
    console.log(this.album);
    let status = this.service.createAlbum(this.album);
    console.log("The return from createAlbum() was " + status);
    this.wasSubmitted = true;
  }
}
