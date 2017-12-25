import { Component, AfterViewInit, Input } from '@angular/core';
import { Images } from "../../../api/server/collections/images";
import { Image } from "../../../api/server/models/image";

import { Subject, Subscription, Observable } from "rxjs";
import { MeteorObservable } from "meteor-rxjs";

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss']
})
export class ThumbnailComponent implements AfterViewInit {
  @Input() thumbUrl;
  @Input() seek;

  image;
  imageSub: Observable<any>;

  src: any;

  tileWidth = 320;

  xpos = 0;
  xratio = 0;

  numTiles = 30;

  heightRatio = 56;
  marginTop = 0;

  hovering = false;

  constructor(){}

  ngOnInit() {
    // MeteorObservable.subscribe('images').subscribe(() => {
    //   MeteorObservable.autorun().subscribe(() => {
    //     this.image = Images.findOne({"name":"test_sprites_9600.jpg"});

    //     //console.log(this.image);
    //     this.handleImageLoad2();
    //   });
    // });

    // MeteorObservable.call('readImage', this.thumbUrl).subscribe({
    //   error: (e: Error) => {
    //     if (e) {
    //       console.log(e);
    //     }
    //     else {
    //       this.src = "data:image/jpg;base64," + res;
    //     }
    //   }
    // });

    let path = "/Users/michaelbattcock/Documents/VFX/site4/client_jobs/Nike/Sneakerboots/3d/assets/Butcontive/maya/movies/frames_sprites.jpg";

    let image = new Image();
    image.addEventListener('load', (e) => this.handleImageLoad(e));
    //image.src = this.thumbUrl;

    MeteorObservable.call('readImage2', path).subscribe((res) => {
        // Handle success and response from server!
        console.log('readImage2 surccess');
        this.thumbUrl = "data:image/jpg;base64," + res;
        image.src = this.thumbUrl;
     }, (err) => {
       console.log('error');
       console.log(err);
       // Handle error
     });
  }

  ngAfterViewInit() {
    // once image is loaded, we need to find the image width
    // let image = new Image();
    // image.addEventListener('load', (e) => this.handleImageLoad(e));
    // image.src = this.thumbUrl;
  }

  test() {
    console.log('test');
  }

  handleImageLoad(event): void {
    //this.image.url = this.thumbUrl;
    console.log('image loaded');
    console.log(event);

    let imgWidth = 9600;// event.target.width;
    let imgHeight = 180;//event.target.height;
    let numTiles = imgWidth / this.tileWidth;

    this.numTiles = numTiles - 1;

    this.heightRatio = imgHeight / (imgWidth / numTiles) * 100;
    this.marginTop = (this.heightRatio - 56) * -0.5;

    this.xratio = 100.0 / this.numTiles;
  }

  handleImageLoad2(): void {
    let imgWidth = this.image.width;
    let numTiles = imgWidth / this.tileWidth;

    this.numTiles = numTiles - 1;

    this.heightRatio = this.image.height / (imgWidth / numTiles) * 100;
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
