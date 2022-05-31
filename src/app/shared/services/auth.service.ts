import { Injectable } from '@angular/core';
import jwt from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  accessAllowed(): boolean {
    return sessionStorage.getItem('role') === 'superAdmin';
  }
}
