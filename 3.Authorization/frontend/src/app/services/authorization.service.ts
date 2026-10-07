import { Injectable, inject, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserClaim } from '../types/userClaim';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private http = inject(HttpClient);

  readonly userClaims$ = this.http.get<UserClaim[]>(
    '/account/getUserClaims?slide=false'
  );
  readonly userClaims = toSignal(this.userClaims$, { initialValue: [] });

  private roleClaim = computed(() => {
    const role = this.userClaims()?.find((claim) => claim.type === 'role');
    return role ? role.value : '';
  });

  nameClaim = computed(() => {
    const name = this.userClaims()?.find((claim) => claim.type === 'name');
    return name ? name.value : '';
  });

  authenticated = computed(() => {
    return (this.userClaims()?.length ?? 0) > 0;
  });

  canSeeHouseDetails(): boolean {
    return this.roleClaim() === 'User';
  }

  canAddHouse(): boolean {
    return this.roleClaim() === 'Contributor';
  }
}
