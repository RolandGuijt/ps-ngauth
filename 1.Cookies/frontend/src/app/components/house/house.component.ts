import { Component, inject, input, ChangeDetectionStrategy } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { HouseService } from '../../services/house.service';

@Component({
    selector: 'app-house',
    imports: [],
    templateUrl: './house.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrl: './house.component.css'
})
export class HouseComponent {
  private houseService = inject(HouseService);
  id = input<number>();

  houseResource = rxResource({
    params: () => this.id(),
    stream: ({ params: id }) => (id ? this.houseService.getHouse(id) : of(undefined))
  });
}
