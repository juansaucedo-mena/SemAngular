import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AsyncPipe } from '@angular/common';
import { Subscription, filter, map } from 'rxjs';
import { AuthService } from './services/auth.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe, SidebarComponent, TopbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  sidebarOpen = signal(true);
  pageTitle = signal('');
  private routerSub?: Subscription;

  constructor(
    protected authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.routerSub = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route.snapshot.data['title'] || '';
        })
      )
      .subscribe((title: string) => {
        this.pageTitle.set(title);
        this.titleService.setTitle(title ? `SEM - ${title}` : 'SEM');

        if (window.innerWidth <= 768) {
          this.sidebarOpen.set(false);
        }
      });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  toggleSidebar(): void {
    this.sidebarOpen.update(v => !v);
  }

  onBackdropClick(): void {
    this.sidebarOpen.set(false);
  }
}
