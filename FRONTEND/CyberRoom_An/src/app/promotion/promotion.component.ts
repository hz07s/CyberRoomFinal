import { Component, OnInit } from '@angular/core';
import { PromotionsService } from '../services/promotions.service';
import { Promotion } from '../models/promotion';
@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {

  promotions: any[] = [];
  newPromotion: Promotion = this.initializePromotion();
  selectedPromotion: Promotion = this.initializePromotion();
  isEditing = false;
  get currentPromotion(): Promotion {
    return this.isEditing ? this.selectedPromotion : this.newPromotion;
  }

  constructor(
    private promotionService: PromotionsService,
  ) {}

  ngOnInit(): void {
    this.getPromotions();
  }

  getPromotions(): void {
    this.promotionService.getPromotions().subscribe((data: Promotion[]) => {
      this.promotions = data;
    });
  }

  createPromotions(): void {
    this.promotionService.createPromotions(this.newPromotion).subscribe(() => {
      this.getPromotions();
      this.resetForm();
    });
  }

  deletePromotion(id: number): void {
    this.promotionService.deletePromotion(id).subscribe(() => {
      this.getPromotions();
    });
  }

  editPromotion(Promotion: Promotion): void {
    this.selectedPromotion = { ...Promotion };
    this.isEditing = true;
  }

  updatePromotion(): void {
    if (this.selectedPromotion && this.selectedPromotion.id) {
      this.promotionService.updatePromotion( this.selectedPromotion).subscribe(() => {
        this.getPromotions();
        this.resetForm();
        this.isEditing = false;
      });
    }
  }

  resetForm(): void {
    this.newPromotion = this.initializePromotion();
    this.selectedPromotion = this.initializePromotion();
    this.isEditing = false;
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.updatePromotion();
    } else {
      this.createPromotions();
    }
  }

  private initializePromotion(): Promotion {
    return {
      id: 0,
      namePromotion: '',
      description: '',
      startDate: new Date(),
      completionDate: new Date(),
    };
  }

}
