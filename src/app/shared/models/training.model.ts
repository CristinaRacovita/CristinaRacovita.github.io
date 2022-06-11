export class TrainingModel {
  public targetColumn: string;
  public fileContent: string;
  public filename: string;

  public constructor(column: string, file: string, filename: string) {
    this.targetColumn = column;
    this.fileContent = file;
    this.filename = filename;
  }
}
