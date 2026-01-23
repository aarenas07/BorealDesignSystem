import { Component } from '@angular/core';
import { CardComponent } from '@organizacion/ui-kit';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-example-cards',
  imports: [CardComponent, MatCardModule],
  templateUrl: './example-cards.html',
  styleUrl: './example-cards.scss',
})
export class ExampleCards {}
