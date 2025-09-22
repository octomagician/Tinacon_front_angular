import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { postTinaco } from '../../Interface/postTinaco';

@Injectable({
  providedIn: 'root'
})
export class TinacoService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  //retorna un arreglo de tinacos del usuario
  getTinacos(): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/tinaco`, { headers });
  }

  // Registro de tinaco
  postTinaco(tinaco: postTinaco): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.baseUrl}/tinaco`, tinaco, { headers });
  }
}
