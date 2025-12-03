import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Dashboard } from './pages/dashboard/dashboard';
import { Register } from './pages/register/register';
import { UpdateProfile } from './pages/update-profile/update-profile';

export const routes: Routes = [
    {
        path: "",
        component: Home
    },
    {
        path: "login",
        component: Login
    },
    {
        path: "dashboard",
        component: Dashboard
    },
    {
        path: "register",
        component: Register
    },
    {
        path: "update-profile",
        component: UpdateProfile
    }
   ];
