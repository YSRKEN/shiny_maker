import { Component, OnInit, Input } from '@angular/core';
import { stringify } from '@angular/core/src/render3/util';

@Component({
  selector: 'app-message-window',
  templateUrl: './message-window.component.html',
  styleUrls: ['./message-window.component.scss']
})
export class MessageWindowComponent implements OnInit {

  /**
   * 名前欄
   */
  @Input() name: string;

  /**
   * メッセージ欄
   */
  @Input() text: string;

  constructor() { }

  ngOnInit() {
  }

  /**
   * @Inputでは改行文字が自動で修正されるのでその対策
   */
  get messageText(): string {
    return this.text.replace('\\n', '\n');
  }
}
