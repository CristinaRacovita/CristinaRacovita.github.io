export class TrainingResultDto {
  public score: number;
  public shape: string;
  public useless_columns: string;
  public duplicated_rows: string;
  public features_report_file: string;
  public feature_importance_image: string;

  public constructor(
    score: number,
    shape: string,
    useless_columns: string,
    duplicated_rows: string,
    features_report_file: string,
    feature_importance_image: string
  ) {
    this.score = score;
    this.shape = shape;
    this.useless_columns = useless_columns;
    this.duplicated_rows = duplicated_rows;
    this.features_report_file = features_report_file;
    this.feature_importance_image = feature_importance_image;
  }
}
