import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate: Date;
  salary: number;
  department: string;
  deleted?: boolean;
}

@Component({
  selector: 'app-edit-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
  ],
  template: `
    <h2 mat-dialog-title>
      <mat-icon>edit</mat-icon>
      Editar Usuario
    </h2>

    <mat-dialog-content>
      <form [formGroup]="userForm" class="user-form">
        <mat-form-field appearance="outline">
          <mat-label>Nombre</mat-label>
          <mat-icon matPrefix>person</mat-icon>
          <input matInput formControlName="name" placeholder="Nombre completo" />
          <mat-error *ngIf="userForm.get('name')?.hasError('required')"> El nombre es requerido </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Email</mat-label>
          <mat-icon matPrefix>email</mat-icon>
          <input matInput formControlName="email" type="email" placeholder="correo@ejemplo.com" />
          <mat-error *ngIf="userForm.get('email')?.hasError('required')"> El email es requerido </mat-error>
          <mat-error *ngIf="userForm.get('email')?.hasError('email')"> Email inválido </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Rol</mat-label>
          <mat-icon matPrefix>badge</mat-icon>
          <mat-select formControlName="role">
            <mat-option value="admin">Administrador</mat-option>
            <mat-option value="developer">Desarrollador</mat-option>
            <mat-option value="designer">Diseñador</mat-option>
            <mat-option value="manager">Gerente</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Estado</mat-label>
          <mat-icon matPrefix>info</mat-icon>
          <mat-select formControlName="status">
            <mat-option value="active">Activo</mat-option>
            <mat-option value="inactive">Inactivo</mat-option>
            <mat-option value="pending">Pendiente</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Departamento</mat-label>
          <mat-icon matPrefix>business</mat-icon>
          <input matInput formControlName="department" placeholder="Departamento" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Fecha de Ingreso</mat-label>
          <mat-icon matPrefix>calendar_today</mat-icon>
          <input matInput [matDatepicker]="picker" formControlName="joinDate" />
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Salario</mat-label>
          <mat-icon matPrefix>attach_money</mat-icon>
          <input matInput formControlName="salary" type="number" placeholder="0" />
          <mat-error *ngIf="userForm.get('salary')?.hasError('min')"> El salario debe ser mayor a 0 </mat-error>
        </mat-form-field>
      </form>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">
        <mat-icon>close</mat-icon>
        Cancelar
      </button>
      <button mat-raised-button color="primary" (click)="onSave()" [disabled]="!userForm.valid">
        <mat-icon>save</mat-icon>
        Guardar
      </button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      h2[mat-dialog-title] {
        display: flex;
        align-items: center;
        gap: 12px;
        color: var(--mat-sys-primary);
        margin: 0;
        padding: 24px 24px 16px;
      }

      mat-dialog-content {
        padding: 0 24px;
        min-width: 500px;
        max-height: 70vh;
        overflow-y: auto;
      }

      .user-form {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 16px 0;
      }

      mat-form-field {
        width: 100%;
      }

      mat-dialog-actions {
        padding: 16px 24px 24px;
        gap: 8px;

        button {
          display: flex;
          align-items: center;
          gap: 8px;
        }
      }
    `,
  ],
})
export class EditUserDialogComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.userForm = this.fb.group({
      name: [data.name, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      role: [data.role, Validators.required],
      status: [data.status, Validators.required],
      department: [data.department, Validators.required],
      joinDate: [data.joinDate, Validators.required],
      salary: [data.salary, [Validators.required, Validators.min(0)]],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.userForm.valid) {
      const updatedUser: User = {
        ...this.data,
        ...this.userForm.value,
      };
      this.dialogRef.close(updatedUser);
    }
  }
}
