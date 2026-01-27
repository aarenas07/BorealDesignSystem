import { Component } from '@angular/core';
import { AlertActionBds, AlertComponent } from '@organizacion/ui-kit';

@Component({
  selector: 'app-example-alert',
  imports: [AlertComponent],
  templateUrl: './example-alert.html',
  styleUrl: './example-alert.scss',
})
export class ExampleAlert {
  // Alert Actions
  alertActionsInfo: AlertActionBds[] = [
    { label: 'Detalles técnicos', variant: 'filled', action: () => console.log('Info - Detalles técnicos') },
    { label: 'Recodarme luego', variant: 'text', action: () => console.log('Info - Recordarme luego') },
  ];

  alertActionsSuccess: AlertActionBds[] = [
    { label: 'Detalles técnicos', variant: 'filled', action: () => console.log('Success - Detalles técnicos') },
    { label: 'Recodarme luego', variant: 'text', action: () => console.log('Success - Recordarme luego') },
  ];

  alertActionsWarning: AlertActionBds[] = [
    { label: 'Detalles técnicos', variant: 'filled', action: () => console.log('Warning - Detalles técnicos') },
    { label: 'Recodarme luego', variant: 'text', action: () => console.log('Warning - Recordarme luego') },
  ];

  alertActionsError: AlertActionBds[] = [
    { label: 'Detalles técnicos', variant: 'filled', action: () => console.log('Error - Detalles técnicos') },
    { label: 'Recodarme luego', variant: 'text', action: () => console.log('Error - Recordarme luego') },
  ];

  showTimedAlert = true;
  showTimedAlert2 = true;

  onAlertClose(event: any) {
    console.log('onAlertChange: ', event);
  }

  onTimedAlertClose() {
    this.showTimedAlert = false;
    console.log('Timed alert closed automatically or manually');
  }

  onTimedAlertClose2() {
    this.showTimedAlert2 = false;
    console.log('Timed alert closed automatically or manually');
  }
}
