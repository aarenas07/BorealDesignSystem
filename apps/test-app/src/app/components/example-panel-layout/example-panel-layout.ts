import { Component, signal, input, output } from '@angular/core'; // <--- Agregamos input y output
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutPanelComponent } from '@organizacion/ui-kit';

// --- MOCK / DUMMY COMPONENT CORREGIDO ---
@Component({
  selector: 'app-gestionar-activo',
  standalone: true,
  imports: [MatButtonModule],
  template: `
    <div style="padding: 20px;">
      <h2>Editando: {{ activo()?.placa }}</h2>
      <h2>Editando: {{ activo()?.descripcion }}</h2>
      <h2>Editando: {{ activo()?.codigo }}</h2>
      <h2>Editando: {{ activo()?.estado }}</h2>
      <h2>Editando: {{ activo()?.ubicacion }}</h2>
      <p>Formulario simulado...</p>
      <div style="margin-top: 20px; display: flex; gap: 10px;">
        <button mat-stroked-button (click)="cancel.emit()">Cancelar</button>
        <button mat-flat-button color="primary" (click)="save.emit(activo())">Guardar Cambios</button>
      </div>
    </div>
  `,
})
export class MockGestionarActivoComponent {
  // CORRECCIÓN: Usamos 'input' para recibir datos y 'output' para eventos
  activo = input.required<any>();
  cancel = output<void>();
  save = output<any>();
}
// ------------------------------

@Component({
  selector: 'app-example-panel-layout',
  standalone: true,
  imports: [CommonModule, LayoutPanelComponent, MatTableModule, MatIconModule, MockGestionarActivoComponent],
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

  // 3. DATOS DE LA TABLA
  displayedColumns: string[] = ['placa', 'descripcion', 'estado', 'ubicacion'];
  dataSource = [
    { placa: '000063429', descripcion: 'Breve descripción del activo', codigo: '123456', estado: 'Activo', ubicacion: 'Antioquia' },
    { placa: '000063430', descripcion: 'Transformador 50kVA', codigo: '234567', estado: 'Activo', ubicacion: 'Valle' },
    { placa: '000063431', descripcion: 'Poste de concreto 12m', codigo: '345678', estado: 'Mantenimiento', ubicacion: 'Bogotá' },
  ];

  selectItem(row: any) {
    this.selectedItem.set(row);
    console.log(this.selectedItem());
    this.isPanelOpen.set(true);
  }

  guardarCambios(data: any) {
    console.log('Guardando...', data);
    this.isPanelOpen.set(false);
    this.selectedItem.set(null);
  }
}
