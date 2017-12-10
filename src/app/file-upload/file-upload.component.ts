import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  borderStyle = 'dashed';

  constructor() { }

  ngOnInit() {
  }

  onDrop(event) {
    event.preventDefault();
    this.borderStyle = 'dashed';
    console.log('drop');
    console.log(event);
    console.log(event.dataTransfer.files[0]);
  }

  onDragOver(event) {
    event.preventDefault();
  }

  onDragEnd(event) {
    event.preventDefault();
    this.borderStyle = 'dashed';
    console.log('dropped');
  }

  onDragEnter(event) {
    event.preventDefault();
    this.borderStyle = 'solid';
    console.log('drag enter');
  }

  onDragLeave(event) {
    event.preventDefault();
    this.borderStyle = 'dashed';
  }

}
