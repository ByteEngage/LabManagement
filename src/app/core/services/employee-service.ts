import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  employeeId: number;
  employeeCode: string;
  name: string;
  email: string;
  department: string | null;
  isActive: boolean;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = '/api/Employee_Management';

  constructor(private http: HttpClient) {}

  getEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }
  getEmployeebyID(id:number): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/${id}`);
  }
}