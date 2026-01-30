import { Injectable } from '@angular/core';
import { USUARIOS_TEST_ONE } from '../../assets/files/data';
import { Observable, of } from 'rxjs';
import { User } from '../components/edit-user-dialog/edit-user-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  getTable(
    page: number,
    size: number
  ): Observable<{
    page: number;
    totalRecords: number;
    data: User[];
  }> {
    const listUser = USUARIOS_TEST_ONE;
    const listUserTMP = Array.from(listUser);
    let totalRecords = listUserTMP.length;
    let pageTmp = Math.ceil(totalRecords / size);
    let paginationUser = listUserTMP.splice(page * size, size);

    return of({
      page: pageTmp,
      totalRecords: totalRecords,
      data: paginationUser,
    });
  }
}
