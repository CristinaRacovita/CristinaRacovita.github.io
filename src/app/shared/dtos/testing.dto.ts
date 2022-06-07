export class TestingDto {
  public target_column: string;
  public file_content: string;
  public file_name: string;
  public train_file_name: string;

  public constructor(
    column: string,
    file: string,
    filename: string,
    trainFilename: string
  ) {
    this.target_column = column;
    this.file_content = file;
    this.file_name = filename;
    this.train_file_name = trainFilename;
  }
}
