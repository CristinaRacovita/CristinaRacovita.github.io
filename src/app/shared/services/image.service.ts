import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ImageService {
  //public imageBlobUrl = new BehaviorSubject<string | ArrayBuffer | null>('');

  public constructor(private sanitizer: DomSanitizer) {}

  public createImageFromBlob(imageB64: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      'data:image/jpg;base64,' + imageB64
    );
    // const image: Blob = this.convertBase64ToBlob(imageB64);
    // let reader = new FileReader();
    // reader.addEventListener(
    //   'load',
    //   () => {
    //     this.imageBlobUrl.next(reader.result);
    //   },
    //   false
    // );

    // if (image) {
    //   reader.readAsDataURL(image);
    // }
  }

  private convertBase64ToBlob(base64Image: string): Blob {
    const decodedData = atob(base64Image);
    const uInt8Array = new Uint8Array(decodedData.length);
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: 'application/image' });
  }
}
