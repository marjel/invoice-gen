import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ItemsFormComponent } from './items-form.component';

describe('ItemsFormComponent', () => {
  let component: ItemsFormComponent;
  let fixture: ComponentFixture<ItemsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemsFormComponent],
      imports: [ReactiveFormsModule, FormsModule, RouterTestingModule],
      providers: [provideMockStore({})]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new item', () => {
    const initialLength = component.items.length;
    component.addItem();
    expect(component.items.length).toBe(initialLength + 1);
  });

  it('should remove an item', () => {
    component.addItem();
    const lengthBeforeRemove = component.items.length;
    component.removeItem(0);
    expect(component.items.length).toBe(lengthBeforeRemove - 1);
  });

  it('should mark form as invalid when name is too short', () => {
    component.items.at(0).get('name')?.setValue('a');
    expect(component.form.invalid).toBeTrue();
  });

  it('should mark form as invalid when count is out of range', () => {
    component.items.at(0).get('count')?.setValue(0);
    expect(component.form.invalid).toBeTrue();
    component.items.at(0).get('count')?.setValue(101);
    expect(component.form.invalid).toBeTrue();
  });

  it('should mark form as invalid when price is out of range', () => {
    component.items.at(0).get('price')?.setValue(0);
    expect(component.form.invalid).toBeTrue();
    component.items.at(0).get('price')?.setValue(1000001);
    expect(component.form.invalid).toBeTrue();
  });

  it('should alert when submitting empty form', () => {
    spyOn(window, 'alert');
    component.items.clear();
    component.submit();
    expect(window.alert).toHaveBeenCalledWith('Please add items');
  });
});
