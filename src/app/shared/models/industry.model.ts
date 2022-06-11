import { IUseCase } from './useCase.model';

export class IIndustry {
  public name: string;
  public useCases: IUseCase[];

  public constructor(name: string, useCases: IUseCase[]) {
    this.name = name;
    this.useCases = useCases;
  }
}
