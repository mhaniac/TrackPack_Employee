import { Component, Input ,OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() header: string;
  @Input() title: string;
  @Input() cardText: string;
  @Input() cardNumber: number;
  @Input() icon: string;

  constructor() { }

  ngOnInit(): void {
  }

}
