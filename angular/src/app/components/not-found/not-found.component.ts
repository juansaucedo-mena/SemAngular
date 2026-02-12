import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent implements OnInit {
  attemptedUrl = '';
  timestamp = '';
  errorId = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.attemptedUrl = this.router.url;
    this.timestamp = new Date().toLocaleString('es-ES', {
      dateStyle: 'long',
      timeStyle: 'medium'
    });
    this.errorId = this.generateErrorId();
  }

  get errorDetails(): string {
    return [
      `Error: 404 - Pagina no encontrada`,
      `URL: ${this.attemptedUrl}`,
      `Fecha: ${this.timestamp}`,
      `ID: ${this.errorId}`,
      `Navegador: ${navigator.userAgent}`
    ].join('\n');
  }

  copyDetails(): void {
    navigator.clipboard.writeText(this.errorDetails);
    this.copied = true;
    setTimeout(() => this.copied = false, 2000);
  }

  copied = false;

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  private generateErrorId(): string {
    return 'ERR-' + Date.now().toString(36).toUpperCase();
  }
}
