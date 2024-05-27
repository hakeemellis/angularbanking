import { CanActivate } from '@angular/router';
// app.routes.ts

import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChequingComponent } from './components/chequing/chequing.component';
import { TransactionHistoryComponent } from './components/transaction-history/transaction-history.component';
import { SignupComponent } from './components/signup/signup.component';
import { SavingsComponent } from './components/savings/savings.component';
import { CannotAccessComponent } from './components/cannotaccess/cannotaccess.component';
import { authGuard } from './auth.guard';


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, // redirects "/" to where I want it to
    { path: 'home', component: HomeComponent }, // Loads Home Components
    { path: 'login', component: LoginComponent }, // Loads Login Components
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] }, // Loads Login Components
    { path: 'chequing', component: ChequingComponent }, // Loads Chequing Components
    { path: 'savings', component: SavingsComponent }, // Loads Chequing Components
    { path: 'transactionhistory', component: TransactionHistoryComponent }, // Loads Transaction History Components
    { path: 'signup', component: SignupComponent }, // Loads Transaction History Components
    { path: 'cannotaccess', component: CannotAccessComponent }, // Loads Cannot Accesss Components
    { path: '**', redirectTo: 'cannotaccess' } // Wildcard route to catch all/random routes
];