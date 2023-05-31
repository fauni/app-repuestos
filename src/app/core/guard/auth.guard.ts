import { inject } from '@angular/core';
import {
  Router,
  CanActivateFn,
} from '@angular/router';

import { AuthService } from '../service/auth.service';


export const AuthGuard: CanActivateFn = () => {
  const tokenService = inject(AuthService);
  const router = inject(Router);

  const token = tokenService.getToken();
  
  if(!token){
    router.navigate(['/authentication/signin']);
    return false;
  } else {
    return true;
  }
}
// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     if (this.authService.currentUserValue) {
//       return true;
//     }
//     this.router.navigate(['/authentication/signin']);
//     return false;
//   }
// }
