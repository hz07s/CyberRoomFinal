import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreditCardService } from '../services/credit-card.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {
  creditCards: any[] = [];
  creditCardForm: FormGroup;
  editMode = false;
  currentCreditCardId: number | null = null;

  constructor(private fb: FormBuilder, private creditCardService: CreditCardService) {
    this.creditCardForm = this.fb.group({
      idUser: ['', Validators.required],
      creditCardBalance: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
    });
  }

  ngOnInit(): void {
    this.loadCreditCards();
  }

  loadCreditCards(): void {
    this.creditCardService.getCreditCards().subscribe(
      data => this.creditCards = data,
      error => console.error(error)
    );
  }

  onSubmit(): void {
    if (this.creditCardForm.invalid) return;

    if (this.editMode) {
      this.creditCardService.updateCreditCard(this.currentCreditCardId!, this.creditCardForm.value).subscribe(
        () => this.loadCreditCards(),
        error => console.error(error)
      );
    } else {
      this.creditCardService.createCreditCard(this.creditCardForm.value).subscribe(
        () => this.loadCreditCards(),
        error => console.error(error)
      );
    }

    this.resetForm();
  }

  onEdit(creditCard: any): void {
    this.editMode = true;
    this.currentCreditCardId = creditCard.id;
    this.creditCardForm.patchValue(creditCard);
  }

  onDelete(id: number): void {
    this.creditCardService.deleteCreditCard(id).subscribe(
      () => this.loadCreditCards(),
      error => console.error(error)
    );
  }

  resetForm(): void {
    this.editMode = false;
    this.currentCreditCardId = null;
    this.creditCardForm.reset();
  }
}
