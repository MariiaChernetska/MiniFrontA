/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OfficeService } from './office.service';

describe('OfficeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OfficeService]
    });
  });

  it('should ...', inject([OfficeService], (service: OfficeService) => {
    expect(service).toBeTruthy();
  }));
});
