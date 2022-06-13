export class TrainingDto {
  public target_column: string;
  public file_content: string;
  public file_name: string;
  public language: string;

  public constructor(
    column: string,
    file: string,
    filename: string,
    language: string
  ) {
    this.target_column = column;
    this.file_content = file;
    this.file_name = filename;
    this.language = language;
  }
}
