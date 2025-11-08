import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

export interface DeleteDialogData {
  title?: string;
  itemName: string;
  itemType?: string;
}


@Component({
  selector: 'app-delete-dialog',
  imports: [MatButton, MatDialogActions, MatDialogContent, MatDialogTitle, MatDialogClose],
  templateUrl: './delete-dialog.html',
  styleUrls: ['./delete-dialog.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteDialog {
  readonly dialogRef = inject(MatDialogRef<DeleteDialog>);
  readonly data = inject<DeleteDialogData>(MAT_DIALOG_DATA);


}
