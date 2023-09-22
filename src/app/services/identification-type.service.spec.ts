import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IdentificationTypeService } from './identification-type.service';

describe('IdentificationTypeService', () => {
  let service: IdentificationTypeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IdentificationTypeService],
    });

    service = TestBed.inject(IdentificationTypeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verificar que no haya solicitudes pendientes después de cada prueba.
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve identification types', () => {
    const mockIdentificationTypes = [
      { id: 1, name: 'Type A' },
      { id: 2, name: 'Type B' },
    ];

    service.getAllCustomers().subscribe((response) => {
      expect(response).toEqual(mockIdentificationTypes);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/identificationType');
    expect(req.request.method).toBe('GET');

    // Simular una respuesta del servidor
    req.flush(mockIdentificationTypes);
  });
});
