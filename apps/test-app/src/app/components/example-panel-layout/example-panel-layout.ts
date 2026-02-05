import { Component, signal, input, output } from '@angular/core'; // <--- Agregamos input y output
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutPanelComponent } from '@organizacion/ui-kit';
import { ExampleTable } from '../example-table/example-table';

// --- MOCK / DUMMY COMPONENT CORREGIDO ---
@Component({
  selector: 'app-gestionar-activo',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <div style="padding: 20px;">
      <h2>Editando: {{ data()?.name }}</h2>
      <p>Email: {{ data()?.email }}</p>
      <p>Rol: {{ data()?.role }}</p>
      <p>Estado: {{ data()?.status }}</p>
      <p>Departamento: {{ data()?.department }}</p>

      <div style="margin-top: 20px; display: flex; gap: 10px;">
        <button mat-stroked-button (click)="cancel.emit()">Cancelar</button>
        <button mat-flat-button color="primary" (click)="save.emit(data())">Guardar Cambios</button>
      </div>
    </div>
  `,
})
export class MockGestionarActivoComponent {
  // CORRECCIÓN: Usamos 'input' para recibir datos y 'output' para eventos
  data = input.required<any>();
  cancel = output<void>();
  save = output<any>();
}
// ------------------------------

@Component({
  selector: 'app-example-panel-layout',
  standalone: true,
  imports: [CommonModule, LayoutPanelComponent, MatTableModule, MatIconModule, MockGestionarActivoComponent, ExampleTable],
  templateUrl: './example-panel-layout.html',
  styleUrls: ['./example-panel-layout.scss'],
})
// IMPORTANTE: Esta clase se llama ExamplePanelLayoutComponent
export class ExamplePanelLayoutComponent {
  // 1. ESTADO DEL PANEL
  isPanelOpen = signal(false);
  userPreferredWidth = signal(400);

  // 2. ESTADO DE DATOS
  selectedItem = signal<any>(null);

  // 3. DATOS DE LA TABLA - Ya no necesitamos dataSource local ni columns porque viene de ExampleTable

  selectItem(row: any) {
    this.selectedItem.set(row);
    console.log('Selected item for panel:', this.selectedItem());
    this.isPanelOpen.set(true);
  }

  guardarCambios(data: any) {
    console.log('Guardando...', data);
    this.isPanelOpen.set(false);
    this.selectedItem.set(null);
  }
}
