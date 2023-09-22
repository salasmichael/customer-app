import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppModule } from './app.module'; // Asegúrate de que coincida con el nombre de tu módulo principal
import { AppComponent } from './app.component';

describe('AppModule', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AppModule], // Importa tu módulo principal aquí
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent); // Crea el componente principal
      fixture.detectChanges(); // Inicia la detección de cambios
    });
  }));

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy(); // Verifica que el componente se haya creado correctamente
  });

  it('should display "clientApp app is running!"', () => {
    const appElement = fixture.nativeElement;
    expect(appElement.textContent).toContain('clientApp app is running!'); // Verifica que el texto deseado esté presente en el elemento
  });
});
