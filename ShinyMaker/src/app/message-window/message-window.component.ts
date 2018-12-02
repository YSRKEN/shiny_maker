import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
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

  // 自分自身のサイズを知るための仕掛け
  @ViewChild('overall') overall: ElementRef;

  constructor() { }

  ngOnInit() {
    console.log('' + this.overall.nativeElement.offsetWidth + 'x' + this.overall.nativeElement.offsetHeight);
  }

  /**
   * @Inputでは改行文字が自動で修正されるのでその対策
   */
  get messageText(): string {
    return this.text.replace('\\n', '\n');
  }

  /**
   * 名前欄のフォントサイズ
   */
  get messageNameStylePlus() {
    return {
      fontSize: '' + (30 * this.overall.nativeElement.offsetWidth / 850) + 'px';
    }
  }

  /**
   * テキスト欄のフォントサイズ
   */
  get messageTextStylePlus() {
    return {
      fontSize: '' + (24 * this.overall.nativeElement.offsetWidth / 850) + 'px';
    }
  }
}
