import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-window',
  templateUrl: './message-window.component.html',
  styleUrls: ['./message-window.component.scss']
})
export class MessageWindowComponent implements OnInit {

  name: string = '真乃'
  text: string = 'はい、鳩さんとは仲良しで、\nつい時間を忘れて遊んでしまうんです'

  constructor() { }

  ngOnInit() {
  }

}
