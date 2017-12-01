import { Component, AfterViewInit, Input } from '@angular/core';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss']
})
export class ThumbnailComponent implements AfterViewInit {
  @Input() thumbUrl;
  @Input() seek;

  tileWidth = 320;

  xpos = 0;
  xratio = 0;

  numTiles = 30;

  heightRatio = 56;
  marginTop = 0;

  hovering = false;

  constructor(){}

  ngAfterViewInit() {
    // once image is loaded, we need to find the image width
    let image = new Image();
    image.addEventListener('load', (e) => this.handleImageLoad(e));
    image.src = this.thumbUrl;
  }

  test() {
    console.log('test');
  }

  handleImageLoad(event): void {
    let imgWidth = event.target.width;
    let numTiles = imgWidth / this.tileWidth;

    this.numTiles = numTiles - 1;

    this.heightRatio = event.target.height / (imgWidth / numTiles) * 100;
    this.marginTop = (this.heightRatio - 56) * -0.5;

    this.xratio = 100.0 / this.numTiles;
  }

  mouseenter(e) {
    this.hovering = true;
  }

  mousemove(e) {
    let xPerc = e.offsetX / e.target.offsetWidth;

    this.xpos = Math.round(xPerc * this.numTiles) * this.xratio; 
    //this.xPerc = xPerc * 100;

    e.stopPropagation();
    e.preventDefault();
    return false;
  }

  mousemoveFromOutside(e) {
    let xPerc = e.offsetX / e.target.offsetWidth;

    this.xpos = Math.round(xPerc * this.numTiles) * this.xratio; 
    //this.xPerc = xPerc * 100;

    e.stopPropagation();
    e.preventDefault();
    return false;
  }

}
