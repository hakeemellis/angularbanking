import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-etransfer',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './etransfer.component.html',
  styleUrl: './etransfer.component.scss'
})
export class EtransferComponent {

}
