import { TestBed } from '@angular/core/testing';

import { DatasetManagerService } from './dataset-manager.service';

describe('DatasetManagerService', () => {
  let service: DatasetManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatasetManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
