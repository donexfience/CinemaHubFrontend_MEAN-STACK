import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-bg',
  standalone: true,
  templateUrl: './auth-bg.component.html',
  styleUrl: './auth-bg.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class AuthBgComponent {}
