import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  private search: string;

  setSeasch(string): void {
      this.search = string;
  }
  getSearch(): string {
      return this.search;
  }
}
