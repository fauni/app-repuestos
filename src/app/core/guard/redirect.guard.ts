import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';

export const RedirectGuard: CanActivateFn = () => {
  const tokenService = inject(AuthService);
  const router = inject(Router);

  const token = tokenService.getToken();
  
  if(token){
    // debugger
    router.navigate(['/home']);
    return false;
  } else {
    return true;
  }
};
