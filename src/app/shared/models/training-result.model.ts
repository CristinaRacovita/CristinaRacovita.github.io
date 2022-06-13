export class TrainingResultModel {
  public score: number;
  public shape: string;
  public uselessColumns: string;
  public duplicatedRows: string;
  public featuresReportFile: string;
  public featureImportanceImage: string;

  public constructor(
    score: number,
    shape: string,
    uselessColumns: string,
    duplicatedRows: string,
    featuresReportFile: string,
    featureImportanceImage: string
  ) {
    this.score = score;
    this.shape = shape;
    this.uselessColumns = uselessColumns;
    this.duplicatedRows = duplicatedRows;
    this.featuresReportFile = featuresReportFile;
    this.featureImportanceImage = featureImportanceImage;
  }
}
