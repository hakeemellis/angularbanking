import { Component } from '@angular/core';
import {RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-cannotaccess',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './cannotaccess.component.html',
  styleUrl: './cannotaccess.component.scss'
})
export class CannotAccessComponent {

}
