import { Component, Input } from '@angular/core';
import { MusicService } from '../services/music.service';
import { Artist } from '../models/artists.model';
import { Album } from '../models/albums.model';
import { DisplayAlbum } from '../display-album/display-album';

@Component({
  selector: 'app-list-albums',
  imports: [DisplayAlbum],
  templateUrl: './list-albums.html',
  styleUrl: './list-albums.css',
})
export class ListAlbums {
  @Input() artist: Artist | undefined
  albums: Album[] = [];
  selectedAlbum: Album | null = null;

  constructor(private service: MusicService) {}

  ngOnInit()
  {
    this.albums = this.service.getAlbumsOfArtist(this.artist!.artist);
  }

  public onSelectAlbum(album: Album)
  {
    this.selectedAlbum = album;
  }
}
