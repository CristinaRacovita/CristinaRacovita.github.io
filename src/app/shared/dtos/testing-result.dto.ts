export class TestingResultDto {
  public metric: string;
  public score: number;
  public file: string;

  public constructor(metric: string, score: number, file: string) {
    this.metric = metric;
    this.score = score;
    this.file = file;
  }
}
