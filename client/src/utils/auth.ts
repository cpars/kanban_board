import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // Return the decoded token
    return jwtDecode<JwtPayload>(this.getToken());
  }

  loggedIn() {
    // Return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token;
  }
  
  isTokenExpired(token: string) {
    // Return a value that indicates if the token is expired
      const decoded = jwtDecode<JwtPayload>(token);

      if (!decoded.exp) {
        return false;
      }
      return decoded.exp && decoded.exp < Date.now() / 1000;
    
  }

  getToken(): string {
    // Return the token
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    return token;
  }

  login(idToken: string) {
    // Set the token to localStorage
    localStorage.setItem('token', idToken);
    
    // Redirect to the home page
    window.location.assign('/');
  }

  logout() {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    // Redirect to the login page
    window.location.assign('/login');
  }
}

export default new AuthService();
