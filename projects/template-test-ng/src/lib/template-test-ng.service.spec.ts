import { TestBed } from '@angular/core/testing';

import { TemplateTestNgService } from './template-test-ng.service';

describe('TemplateTestNgService', () => {
  let service: TemplateTestNgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplateTestNgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
