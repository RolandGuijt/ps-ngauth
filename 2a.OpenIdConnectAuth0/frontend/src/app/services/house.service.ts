import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { House } from '../types/house';

@Injectable({
  providedIn: 'root',
})
export class HouseService {
  private http = inject(HttpClient);

  getHouses(): Observable<House[]> {
    return this.http.get<House[]>('/houses');
  }

  getHouse(id: number): Observable<House> {
    return this.http.get<House>(`/houses/${id}`);
  }
}
