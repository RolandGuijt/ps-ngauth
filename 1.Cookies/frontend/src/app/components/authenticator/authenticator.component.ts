import { Component, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserClaim } from '../../types/userClaim';

@Component({
    selector: 'app-authenticator',
    imports: [],
    templateUrl: './authenticator.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrl: './authenticator.component.css'
})
export class AuthenticatorComponent {
  private http = inject(HttpClient);

  userClaims = toSignal(
    this.http.get<UserClaim[]>('/account/getUserClaims?slide=false'),
    { initialValue: undefined }
  );

  nameClaim = computed(() => {
    const claims = this.userClaims();
    const claim = claims?.find((c) => c.type === 'name');
    return claim ? claim.value : '';
  });

  authenticated = computed(() => {
    const claims = this.userClaims();
    return (claims?.length ?? 0) > 0;
  });
}
