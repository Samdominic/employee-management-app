import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-dialog',
  imports: [MatProgressSpinner],
  templateUrl: './loading-dialog.html',
  styleUrl: './loading-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingDialog {
  public data = inject<{ message: string }>(MAT_DIALOG_DATA);

}
