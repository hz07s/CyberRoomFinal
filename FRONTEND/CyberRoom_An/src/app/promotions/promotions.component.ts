import { Component, OnInit } from '@angular/core';
import { PromotionsService } from '../services/promotions.service';
import { Promotion } from '../models/promotion';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {

  promotions: any[] = []; // Array para almacenar promociones

  constructor(private promotionService: PromotionsService,) { }

  ngOnInit(): void {
    this.getPromotions();
  }

  getPromotions(): void {
    this.promotionService.getPromotions().subscribe((data: Promotion[]) => {
      this.promotions = data;
      console.log(data);
    });
  }
}
