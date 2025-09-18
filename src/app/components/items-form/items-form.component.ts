import { Component, inject } from '@angular/core';
import { FormBuilder, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { addItems } from '../../store/invoice/invoice.actions';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-items-form',
  templateUrl: './items-form.component.html',
  styleUrls: ['./items-form.component.scss'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class ItemsFormComponent {

  private fb: FormBuilder = inject(FormBuilder);
  private store: Store = inject(Store);
  private router: Router = inject(Router);

  form = this.fb.group({
    items: this.fb.array([])
  });

  constructor() {
    this.addItem();
  }

  get items() {
    return this.form.get('items') as FormArray;
  }

  addItem() {
    this.items.push(this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      count: [1, [Validators.required, Validators.min(1), Validators.max(100)]],
      price: [1, [Validators.required, Validators.min(1), Validators.max(1000000)]]
    }));
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  submit() {

    if (this.items.length === 0) {
      alert('Please add items');
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const items: Item[] = this.form.value.items as Item[] ?? [];
    this.store.dispatch(addItems({ items }));
    this.router.navigate(['/invoice-summary']);
  }
}
