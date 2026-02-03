import { Component } from '@angular/core';
import { SearchbarComponent } from '@organizacion/ui-kit';

@Component({
  selector: 'app-example-searchbar',
  imports: [SearchbarComponent],
  templateUrl: './example-searchbar.html',
  styleUrl: './example-searchbar.scss',
})
export class ExampleSearchbar {
  onSearchClick() {
    console.log('Search clicked / expanded');
  }

  onSearchClose() {
    console.log('Search closed / collapsed');
  }

  onSearchChange(value: string) {
    console.log('Search value changed:', value);
  }
}
