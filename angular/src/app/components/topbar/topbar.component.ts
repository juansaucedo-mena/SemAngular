import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-topbar',
  imports: [],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  pageTitle = input<string>('');
  toggleSidebar = output<void>();

  onToggle(): void {
    this.toggleSidebar.emit();
  }
}
