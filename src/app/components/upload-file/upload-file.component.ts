import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent {
  public filename: string = '';
  @Output()
  public csvContent = new EventEmitter<string>();
  @Output()
  public file = new EventEmitter<File>();

  public changeListener(event: any) {
    let files = event.target.files;
    console.log(files);
    if (files && files.length > 0) {
      let file = files.item(0);
      this.file.emit(file);
      this.filename = file?.name;

      let reader: FileReader = new FileReader();
      reader.readAsText(file!!);

      reader.onload = (e) => {
        let csv: string = reader.result as string;
        this.csvContent.emit(csv);
      };
    }
  }
}
