import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [MatCard, MatIcon, MatCardContent, RouterLink, MatButton],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFound {

}
