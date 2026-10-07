import { Component, OnInit, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { House } from '../../types/house';
import { HouseService } from '../../services/house.service';
import { RouterLink } from '@angular/router';
import {AuthorizationService} from "../../services/authorization.service";

@Component({
    selector: 'app-house-list',
    imports: [RouterLink],
    templateUrl: './house-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrl: './house-list.component.css'
})
export class HouseListComponent implements OnInit {
  private houseService = inject(HouseService);
  public authorizationService = inject(AuthorizationService);

  houses = signal<House[]>([]);

  ngOnInit(): void {
    this.houseService.getHouses().subscribe((h) => this.houses.set(h));
  }

  addHouse() {
    const newHouse: House = {
      id: 3,
      address: '32 Valley Way, New York',
      description: '',
      country: 'USA',
      price: 1000000,
      photo: '',
    };
    this.houses.update((list) => [...list, newHouse]);
  }
}
