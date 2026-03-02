import { Component, Input } from '@angular/core';
import { Album } from '../models/albums.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-display-album',
  imports: [RouterLink],
  templateUrl: './display-album.html',
  styleUrl: './display-album.css',
})
export class DisplayAlbum {
  @Input() album: Album | undefined;

}
