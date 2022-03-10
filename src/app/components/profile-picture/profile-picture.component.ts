import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss'],
})
export class ProfilePictureComponent {
  @Input() imageUrl = '';
  @Input() name = '';

  public isSpecialName(): boolean {
    return this.name.includes('Cristina');
  }
}
