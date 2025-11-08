import { Component, Inject, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-delete-dialogue',
  imports: [MatButton, MatDialogActions, MatDialogContent, MatDialogTitle, MatDialogClose],
  templateUrl: './employee-delete-dialogue.html',
  styleUrl: './employee-delete-dialogue.scss',
})
export class EmployeeDeleteDialogue {
  readonly dialogRef = inject(MatDialogRef<EmployeeDeleteDialogue>);
  readonly data = (inject(MAT_DIALOG_DATA) as { name: string } | undefined) ?? { name: '' };


}
