import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class JwtService {

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  getDecodedToken(): any | null {

    // ✅ Works in BOTH SSR + browser
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    const token = localStorage.getItem('token');

    if (!token) {
      return null;
    }

    try {
      const payload = token.split('.')[1];

      const decoded = atob(
        payload.replace(/-/g, '+').replace(/_/g, '/')
      );

      return JSON.parse(decoded);
    } catch (e) {
      console.error('Invalid JWT Token');
      return null;
    }
  }
}