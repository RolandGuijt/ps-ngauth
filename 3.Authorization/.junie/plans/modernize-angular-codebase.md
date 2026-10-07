---
sessionId: session-261005-161437-1mt1
---

# Requirements

### Overview & Goals
Modernize the Angular application by implementing essential Angular 19 standards (Signals, `inject()`, `OnPush`, and proper state encapsulation) and fixing broken template markup, styles, and unit tests. Low-utility changes and nice-to-haves are excluded.

---

### Essential Scope
- **Change Detection**: Fix invalid `ChangeDetectionStrategy.Eager` to `ChangeDetectionStrategy.OnPush` across all components.
- **Dependency Injection**: Migrate constructor injection to the `inject()` function in all services and components.
- **State & Service Layer**: Extract auth state and HTTP calls from `AuthenticatorComponent` into a centralized `AuthService` using Signals.
- **Signals & Reactivity**: Replace mutable subscriptions and input setters with Angular Signals (`input()`, `toSignal()`).
- **Template & Markup Fixes**: Fix repeating `<tbody>` in `HouseListComponent` `@for`, add `@if` loading guards in `HouseComponent`, and replace click handlers with `[routerLink]`.
- **CSS & Unit Tests**: Fix invalid quoted values in `styles.css` and configure `provideHttpClientTesting()` so tests pass.

# Technical Design

### Core Changes by File

1. **`src/app/services/auth.service.ts` (New)**
   - Encapsulates `/account/getUserClaims`, `/login`, and `/logout`.
   - Exposes user state via `currentUser = signal<UserClaim[] | null>(null)` and `isAuthenticated = computed(...)`.

2. **`src/app/services/house.service.ts`**
   - Replace constructor injection with `private readonly http = inject(HttpClient)`.

3. **`src/app/components/authenticator/authenticator.component.*`**
   - Change `ChangeDetectionStrategy.Eager` to `OnPush`.
   - Inject `AuthService` instead of `HttpClient`; consume auth signals in template.

4. **`src/app/components/house-list/house-list.component.*`**
   - Change to `OnPush` and use `inject(HouseService)`.
   - Template: move `@for` to `<tr>` within a single `<tbody>`, track `house.id`, and use `[routerLink]="['/house', house.id]"`.

5. **`src/app/components/house/house.component.*`**
   - Change to `OnPush` and replace `@Input() set id` with Signal input `id = input.required<number>()`.
   - Fetch house data reactively via `toSignal()`/`switchMap`.
   - Template: wrap details in `@if (house())` to prevent runtime errors before data arrives.

6. **`src/app/app.component.ts` & `src/styles.css`**
   - Change `AppComponent` to `OnPush`.
   - Fix invalid quotes in `.subtitleStyle` (e.g. `font-style: italic; color: coral;`).

7. **Unit Test Suite (`*.spec.ts`)**
   - Add `provideHttpClient()` and `provideHttpClientTesting()` to test configurations.
   - Update `app.component.spec.ts` title assertion to `'Houses'`.

# Delivery Steps

### ✓ Step 1: Fix Change Detection Strategy Across All Components
All components adhere to standard `ChangeDetectionStrategy.OnPush` without invalid enum references.

- Replace `changeDetection: ChangeDetectionStrategy.Eager` with `ChangeDetectionStrategy.OnPush` in `src/app/app.component.ts`.
- Replace `changeDetection: ChangeDetectionStrategy.Eager` with `ChangeDetectionStrategy.OnPush` in `src/app/components/authenticator/authenticator.component.ts`.
- Replace `changeDetection: ChangeDetectionStrategy.Eager` with `ChangeDetectionStrategy.OnPush` in `src/app/components/house-list/house-list.component.ts`.
- Replace `changeDetection: ChangeDetectionStrategy.Eager` with `ChangeDetectionStrategy.OnPush` in `src/app/components/house/house.component.ts`.

### ✓ Step 2: Extract AuthService and Modernize Service Dependency Injection
Services use `inject()` and auth state is centralized in an injectable service.

- Create `AuthService` (`src/app/services/auth.service.ts`) with Signal-based state (`currentUser`, `isAuthenticated`) and methods for user claims and login/logout.
- Refactor `HouseService` (`src/app/services/house.service.ts`) to use `inject(HttpClient)`.

### ✓ Step 3: Refactor Components to Modern Angular Signals and inject()
Components consume injectable services via `inject()` and bind state with Signals.

- Refactor `AuthenticatorComponent` to consume `AuthService` signals instead of direct HTTP calls.
- Refactor `HouseComponent` to use `input.required<number>()` and reactive signal data fetching.
- Refactor `HouseListComponent` to use `inject(HouseService)` and reactive signals.

### ✓ Step 4: Fix Template Markup, Declarative Navigation, and Styles
Templates render valid HTML without runtime null errors, and CSS syntax is valid.

- Update `house-list.component.html` to loop `<tr>` inside a single `<tbody>` tracking `house.id`, using `[routerLink]`.
- Add `@if (house())` guards in `house.component.html` to prevent property access on undefined.
- Fix invalid quoted properties in `src/styles.css`.

### ✓ Step 5: Fix Vitest Unit Test Providers and Assertions
All unit tests execute and pass cleanly under Vitest.

- Configure `provideHttpClientTesting()` across all component and service spec files.
- Update `app.component.spec.ts` assertions to match component title `'Houses'` and expected DOM structure.