import { Component } from '@angular/core';
import { MusicService} from '../services/music.service';
import { ActivatedRoute } from '@angular/router';
import { Artist } from '../models/artists.model';
import { ListAlbums } from '../list-albums/list-albums';

@Component({
  selector: 'app-list-artists',
  imports: [ListAlbums],
  templateUrl: './list-artists.html',
  styleUrl: './list-artists.css',
})
export class ListArtists {
  selectedArtist: Artist | null = null;
  artists: Artist[] = [];

  constructor(private route: ActivatedRoute, private service: MusicService) {}

  ngOnInit()
  {
    this.route.queryParams.subscribe(params => {
    console.log("Getting data....");
    this.service.getArtists((artists: Artist[]) => {
      this.artists = artists;
      console.log('this.artists', this.artists);
    });
    this.selectedArtist = null;
    });
  }

  onSelectArtist(artist: Artist) {
    this.selectedArtist = artist;
  }
}
