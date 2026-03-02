import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Info } from '../info/info';

@Component({
  selector: 'app-shop',
  imports: [ReactiveFormsModule, Info],
  templateUrl: './shop.html',
  styleUrl: './shop.css',
})
export class Shop {
  question: string = "What is your name?";
  answer: string = "unknown";
  appForm = new FormGroup({
    answer: new FormControl(''),
    });
    onSubmit(data: Partial<{answer: string | null}>) {
      this.answer = data.answer!;
      console.log("Your name is " + this.answer);
    };
}
