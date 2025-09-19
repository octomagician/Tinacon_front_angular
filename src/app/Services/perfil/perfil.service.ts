import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PerfilService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  updatePassword(data: { password: string; password_new: string; password_confirmation: string }): Observable<any> {
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté guardado
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/updatePassword`;
    return this.http.post(url, data, { headers });
  }
  
  updateUser(user: any): Observable<any> {
    const token = localStorage.getItem('token'); // Asegúrate de haber guardado el token al iniciar sesión
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/update`;
    return this.http.post(url, user, { headers });
  }

  uploadImage(image: File): Observable<any> {
    const token = localStorage.getItem('token'); // Asegúrate de haber guardado el token al iniciar sesión
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.baseUrl}/imagen`;
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post(url, formData, { headers });
  }


  resetPassword(email: string): Observable<any> {
    const url = `${this.baseUrl}/reset-password`;
    return this.http.post(url, { email });
  }
  sendEmail(email: string): Observable<any> {
    const url = `${this.baseUrl}/sendEmail`;
    return this.http.post(url, { email });
  }
}
