import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateTestNgComponent } from './template-test-ng.component';

describe('TemplateTestNgComponent', () => {
  let component: TemplateTestNgComponent;
  let fixture: ComponentFixture<TemplateTestNgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateTestNgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplateTestNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
