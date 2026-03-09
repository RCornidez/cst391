import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Snackbar } from './components/snackbar/snackbar';
import { ConfirmModal } from './components/confirm-modal/confirm-modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Snackbar, ConfirmModal],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
