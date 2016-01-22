import {Component} from 'angular2/core';
import {CanActivate} from 'angular2/router';
import {JwtHelper} from '../angular2-jwt/angular2-jwt';

@Component({
  selector: 'home',
  templateUrl: './components/home/home.html'
})

@CanActivate(() => {
  var token = localStorage.getItem('jwt');
  var jwtHelper:JwtHelper = new JwtHelper();

  // Check if the token is valid
  try {
    jwtHelper.decodeToken(token);
  } catch (e) {
    return false;
  }

  // Check if the token is expired
  if (jwtHelper.isTokenExpired(token))
    return false;

  return true;
})

export class HomeComponent {}
