import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoClientesComponent } from './info-clientes.component';

describe('ListarClientesComponent', () => {
  let component: InfoClientesComponent;
  let fixture: ComponentFixture<InfoClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoClientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
