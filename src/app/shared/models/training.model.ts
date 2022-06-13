export class TrainingModel {
  public targetColumn: string;
  public fileContent: string;
  public filename: string;
  public lang: string;

  public constructor(
    column: string,
    file: string,
    filename: string,
    lang: string
  ) {
    this.targetColumn = column;
    this.fileContent = file;
    this.filename = filename;
    this.lang = lang;
  }
}
