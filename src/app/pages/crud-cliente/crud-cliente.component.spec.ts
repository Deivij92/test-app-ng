import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudClienteComponent } from './crud-cliente.component';

describe('CrudClienteComponent', () => {
  let component: CrudClienteComponent;
  let fixture: ComponentFixture<CrudClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudClienteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
