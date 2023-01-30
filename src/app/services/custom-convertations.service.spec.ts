import { TestBed } from '@angular/core/testing';

import { CustomConvertationsService } from './custom-convertations.service';

describe('CustomConvertationsService', () => {
  let service: CustomConvertationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomConvertationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
