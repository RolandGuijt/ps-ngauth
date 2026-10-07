import { Component, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthorizationService} from "../../services/authorization.service";

@Component({
    selector: 'app-authenticator',
    imports: [],
    templateUrl: './authenticator.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrl: './authenticator.component.css'
})
export class AuthenticatorComponent {
  public authorizationService  = inject(AuthorizationService);
}
