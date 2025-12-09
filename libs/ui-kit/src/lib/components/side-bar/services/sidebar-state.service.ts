// sidebar-state.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarStateService {
  private sidebarClosedSubject = new BehaviorSubject<boolean>(true);
  sidebarClosed$ = this.sidebarClosedSubject.asObservable();

  setSidebarClosed(isClosed: boolean) {
    this.sidebarClosedSubject.next(isClosed);
  }

  isSidebarClosed(): boolean {
    return this.sidebarClosedSubject.value;
  }
}