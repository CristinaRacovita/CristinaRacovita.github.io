export class TestingModel {
  public targetColumn: string;
  public fileContent: string;
  public filename: string;
  public trainFilename: string;

  public constructor(
    column: string,
    file: string,
    filename: string,
    trainFilename: string
  ) {
    this.targetColumn = column;
    this.fileContent = file;
    this.filename = filename;
    this.trainFilename = trainFilename;
  }
}
