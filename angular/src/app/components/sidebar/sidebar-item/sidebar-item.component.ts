import { Component, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Module } from '../../../interfaces/module.interface';
import { FavoriteService } from '../../../services/favorite.service';

@Component({
  selector: 'app-sidebar-item',
  imports: [RouterLink, RouterLinkActive, SidebarItemComponent],
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.scss'
})
export class SidebarItemComponent {
  module = input.required<Module>();
  depth = input<number>(0);
  showStar = input<boolean>(false);

  expanded = signal(false);

  constructor(private favoriteService: FavoriteService) {}

  toggle(): void {
    this.expanded.update(v => !v);
  }

  get hasChildren(): boolean {
    return this.module().children && this.module().children.length > 0;
  }

  get paddingLeft(): string {
    return `${this.depth() * 16}px`;
  }

  get isFavorite(): boolean {
    return this.favoriteService.isFavorite(this.module().id);
  }

  onStarClick(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.favoriteService.toggleFavorite(this.module().id);
  }
}
