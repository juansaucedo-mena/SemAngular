# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SEM is a fullstack application with a **Laravel 12** backend API and an **Angular 21** frontend SPA, each in its own directory (`laravel/` and `angular/`). Authentication uses Laravel Sanctum with token-based API auth.

## Development Commands

### Backend (Laravel)

```bash
# Start dev server (port 8001 — port 8000 is occupied)
cd laravel && php artisan serve --port=8001

# Run all dev services (server + queue + logs + Vite)
cd laravel && composer dev

# Run tests (uses SQLite in-memory)
cd laravel && php artisan test

# Run a single test file
cd laravel && php artisan test --filter=ExampleTest

# Database reset with seed data (creates admin@sem.com / password)
cd laravel && php artisan migrate:fresh --seed

# Code style
cd laravel && ./vendor/bin/pint
```

### Frontend (Angular)

```bash
# Start dev server (port 4200)
cd angular && ng serve

# Run tests (Vitest)
cd angular && ng test

# Production build
cd angular && ng build
```

## Architecture

### API Routes (`laravel/routes/api.php`)

All endpoints prefixed with `/api`:
- `POST /login` — public, returns Sanctum token
- `GET /user` — protected, returns authenticated user
- `POST /logout` — protected, revokes current token

### Auth Flow

1. Angular `LoginComponent` → `AuthService.login()` → POST `/api/login`
2. Laravel validates credentials, returns Sanctum `plainTextToken`
3. Angular stores token in `localStorage['auth_token']`
4. `authInterceptor` (functional) attaches `Authorization: Bearer` header to all requests
5. `authGuard` checks token existence for protected routes (e.g., `/dashboard`)

### Angular App Structure (`angular/src/app/`)

Uses **standalone components** with functional interceptors and guards:
- `components/` — routed components (login, dashboard)
- `services/auth.service.ts` — API calls, token management, `loggedIn$` BehaviorSubject
- `guards/auth.guard.ts` — route protection
- `interceptors/auth.interceptor.ts` — adds auth headers
- `interfaces/` — TypeScript interfaces (User)
- `app.routes.ts` — standalone routing config
- `app.config.ts` — bootstrap providers (router, HTTP client, interceptors)

**Note:** A legacy `app.module.ts` with `InMemoryWebApiModule` coexists alongside the standalone setup.

### Laravel Structure (`laravel/`)

Standard Laravel 12 layout:
- `app/Http/Controllers/AuthController.php` — login/logout/user endpoints
- `app/Models/User.php` — uses `HasApiTokens` trait
- `config/cors.php` — allows `http://localhost:4200`
- `config/sanctum.php` — stateful domains config

### Key Configuration

- API base URL is hardcoded in `AuthService`: `http://localhost:8001/api`
- CORS allows only `http://localhost:4200`
- Sanctum stateful domain: `localhost:4200` (set in `.env`)
- PHPUnit uses SQLite in-memory (`phpunit.xml`)
- Angular uses strict TypeScript (`strict: true`, `noImplicitReturns`, etc.)
- UI text is in **Spanish**

### Database

MySQL (host: 127.0.0.1:3306, db: sem, user: sem). Key tables:
- `users` — standard Laravel users with email unique constraint
- `personal_access_tokens` — Sanctum token storage
- `sessions`, `cache`, `jobs` — Laravel infrastructure