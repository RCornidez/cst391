import { Component, Input, OnInit, OnDestroy, signal } from '@angular/core';

@Component({
  selector: 'app-typewriter',
  imports: [],
  templateUrl: './typewriter.html',
  styleUrl: './typewriter.css',
})
export class Typewriter implements OnInit, OnDestroy {
  @Input() words: string[] = [];

  displayed = signal('');

  private wordIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private timeout: any;

  ngOnInit() {
    this.tick();
  }

  ngOnDestroy() {
    clearTimeout(this.timeout);
  }

  private tick() {
    const word = this.words[this.wordIndex];

    if (this.isDeleting) {
      this.charIndex--;
    } else {
      this.charIndex++;
    }

    this.displayed.set(word.slice(0, this.charIndex));

    let delay = this.isDeleting ? 75 : 110;

    if (!this.isDeleting && this.charIndex === word.length) {
      delay = 1800;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.wordIndex = (this.wordIndex + 1) % this.words.length;
      delay = 350;
    }

    this.timeout = setTimeout(() => this.tick(), delay);
  }
}
