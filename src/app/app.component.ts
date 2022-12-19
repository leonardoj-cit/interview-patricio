import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'book-store';

  ngOnInit(): void {
    const userId = sessionStorage.getItem('userId');
  }
}
