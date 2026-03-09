import { Injectable, signal } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

export interface ConfirmModalConfig {
  title: string;
  message: string;
  confirmLabel?: string;
  danger?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ConfirmModalService {
  visible = signal(false);
  config = signal<ConfirmModalConfig>({ title: '', message: '' });

  private result$ = new Subject<boolean>();

  open(config: ConfirmModalConfig): Observable<boolean> {
    this.config.set({ confirmLabel: 'confirm', danger: false, ...config });
    this.visible.set(true);
    return this.result$.asObservable().pipe(take(1));
  }

  confirm() { this.visible.set(false); this.result$.next(true); }
  dismiss() { this.visible.set(false); this.result$.next(false); }
}
