import { Component, signal } from '@angular/core';
import { RouterOutlet, Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('My Music Collection');
  protected readonly version = signal('1.0');

  constructor(private router: Router) {}
  
  displayVersion(): void {
    alert(`Version: ${this.version()}`);
  }

  displayArtistList(): void {
    this.router.navigate(['list-artists'], { queryParams: { data: new Date() } });
  }
}
