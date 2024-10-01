import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompoundService {
  private apiUrl = 'https://nuvertos.onrender.com/api/v1';

  constructor(private http: HttpClient) { }

  // Get all compounds
  getCompounds(page:number,limit:number): Observable<any> {
    return this.http.get(`${this.apiUrl}/allcompounds?page=${page}&limit=${limit}`);
  }

  // Get a specific compound by ID
  getCompoundById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/compound/${id}`);
  }

  // Update compound details
  updateCompound(id: number, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/updateCompound/${id}`, data);
  }

  addCompound(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/createCompound`, data);
  }
}
