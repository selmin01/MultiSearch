import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchResource {
  private apiUrl = 'http://localhost:3000/search'; // ✅ Corrigido para apontar ao endpoint correto

  constructor(private http: HttpClient) {}

  public search(term: string): Promise<any> {
    return this.http.get<any>(`${this.apiUrl}?query=${term}`).toPromise();
  }
}
