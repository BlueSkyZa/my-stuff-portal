import { MatInputModule, MatButtonModule, MatNativeDateModule, MatSortModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';

import { NgModule } from '@angular/core';


@NgModule({
  providers: [
  ],
  imports: [
    MatInputModule, MatButtonModule, MatNativeDateModule, MatToolbarModule,
    MatFormFieldModule, MatTableModule, MatPaginatorModule,
    MatSortModule, MatCheckboxModule, MatDialogModule, MatIconModule
  ],
  exports: [
    MatInputModule, MatButtonModule, MatNativeDateModule, MatToolbarModule,
    MatFormFieldModule, MatTableModule, MatPaginatorModule,
    MatSortModule, MatCheckboxModule, MatDialogModule, MatIconModule
  ],
})

export class MaterialModule { }
