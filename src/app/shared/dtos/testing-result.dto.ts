export class TestingResultDto {
  public score: number;
  public file: string;

  public constructor(score: number, file: string) {
    this.score = score;
    this.file = file;
  }
}
