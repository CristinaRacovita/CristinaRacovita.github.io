export class TrainingResultDto {
  public metric: string;
  public score: number;

  public constructor(metric: string, score: number) {
    this.metric = metric;
    this.score = score;
  }
}
