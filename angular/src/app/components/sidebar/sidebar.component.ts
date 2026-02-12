import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, combineLatest } from 'rxjs';
import { ModuleService } from '../../services/module.service';
import { AuthService } from '../../services/auth.service';
import { FavoriteService } from '../../services/favorite.service';
import { Module } from '../../interfaces/module.interface';
import { User } from '../../interfaces/user.interface';
import { SidebarItemComponent } from './sidebar-item/sidebar-item.component';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, SidebarItemComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit, OnDestroy {
  modules: Module[] = [];
  favoriteModules: Module[] = [];
  user: User | null = null;
  private favoritesSub?: Subscription;

  constructor(
    private moduleService: ModuleService,
    private authService: AuthService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.moduleService.getModules().subscribe({
      next: (modules) => this.modules = modules
    });

    this.authService.getUser().subscribe({
      next: (user) => this.user = user
    });

    this.favoriteService.loadFavorites();

    this.favoritesSub = combineLatest([
      this.moduleService.getModules(),
      this.favoriteService.favoriteIds$
    ]).subscribe(([modules, favoriteIds]) => {
      this.favoriteModules = this.collectLeaves(modules)
        .filter(m => favoriteIds.has(m.id));
    });
  }

  ngOnDestroy(): void {
    this.favoritesSub?.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
  }

  private collectLeaves(modules: Module[]): Module[] {
    const leaves: Module[] = [];
    for (const m of modules) {
      if (m.children && m.children.length > 0) {
        leaves.push(...this.collectLeaves(m.children));
      } else {
        leaves.push(m);
      }
    }
    return leaves;
  }
}
