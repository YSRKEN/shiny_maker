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
  }

  /**
   * @Inputでは改行文字が自動で修正されるのでその対策
   */
  get messageText(): string {
    return this.text.replace('\\n', '\n');
  }

  /**
   * 自身の横幅
   */
  get width(): number {
    return this.overall.nativeElement.offsetWidth;
  }

  /**
   * 名前欄のフォントサイズ
   */
  get messageNameStylePlus() {
    return {
      fontSize: '' + (30 * this.width / 850) + 'px'
    }
  }

  /**
   * テキスト欄のフォントサイズ
   */
  get messageTextStylePlus() {
    return {
      fontSize: '' + (24 * this.width / 850) + 'px'
    }
  }

  get overallStylePlus() {
    return {
      width: '' + this.width + 'px',
      height: '' + (this.width / 5) + 'px'
    }
  }

  get overallClassPlus() {
    if (this.name == 'プロデューサー') {
      return 'p-style';
    }else {
      return 'idol-style';
    }
  }
}
