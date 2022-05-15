import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUseCase } from 'src/app/shared/models/useCase.model';

@Component({
  selector: 'app-industry-card',
  templateUrl: './industry-card.component.html',
  styleUrls: ['./industry-card.component.scss'],
})
export class IndustryCardComponent {
  @Input() cardTitle = '';
  @Input() cardUseCases: IUseCase[] = [];
  @Input() buttonText = 'more-details';
  @Output() onClickButton = new EventEmitter<void>();

  public onClick(): void {
    this.onClickButton.emit();
  }
}
