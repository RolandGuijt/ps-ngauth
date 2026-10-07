import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthenticatorComponent } from './components/authenticator/authenticator.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, AuthenticatorComponent],
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Houses';
}
