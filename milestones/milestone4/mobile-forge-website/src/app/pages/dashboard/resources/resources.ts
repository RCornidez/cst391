import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.html',
  styleUrl: './resources.css',
  imports: [RouterLink],
})
export class Resources {
  gettingStartedMode: 'provision' | 'connect' = 'provision';
}
