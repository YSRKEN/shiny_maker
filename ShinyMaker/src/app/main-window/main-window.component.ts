import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.scss']
})
export class MainWindowComponent implements OnInit {

  title = 'シャニマス会話メーカー';

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){

    var element = document.createElement('a');
    element.setAttribute('href',"https://twitter.com/share?ref_src=twsrc%5Etfw");
    element.setAttribute('class',"twitter-share-button");
    element.setAttribute('data-size',"large");
    element.setAttribute('data-text',"");
    element.setAttribute('data-url',"https://shiny_maker.firebaseapp.com");
    element.setAttribute('data-hashtags', this.title);
    element.setAttribute('data-show-count',"false");

    var script = document.createElement('script');
    script.async = true;
    script.setAttribute('src',"https://platform.twitter.com/widgets.js");
    script.setAttribute('charset','utf-8');

    var div = document.getElementById("anchor");
    div.parentNode.insertBefore(element,div.nextSibling);
    div.parentNode.insertBefore(script,div.nextSibling);
  }
}
