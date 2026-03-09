import { Injectable, signal } from '@angular/core';

export type SnackbarType = 'success' | 'info' | 'error';

export interface SnackbarMessage {
  text: string;
  type: SnackbarType;
  id: number;
}

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  messages = signal<SnackbarMessage[]>([]);
  private nextId = 0;

  show(text: string, type: SnackbarType = 'info', duration = 4000) {
    const id = this.nextId++;
    this.messages.update(msgs => [...msgs, { text, type, id }]);
    setTimeout(() => this.dismiss(id), duration);
  }

  success(text: string) { this.show(text, 'success'); }
  info(text: string)    { this.show(text, 'info'); }
  error(text: string)   { this.show(text, 'error'); }

  dismiss(id: number) {
    this.messages.update(msgs => msgs.filter(m => m.id !== id));
  }
}
