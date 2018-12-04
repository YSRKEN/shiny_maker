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

  /**
   * アイドルスタイルに変化する一覧
   */
  idolNameList = [
    '真乃', '灯織', 'めぐる', '恋鐘',
    '摩美々', '咲耶', '結華', '霧子',
    '果穂', '智代子', '樹里', '凛世',
    '夏葉', '甘奈', '甜花','千雪',
  ]

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
    } else if (this.idolNameList.includes(this.name)) {
      return 'idol-style';
    } else if(this.name == 'はづき') {
      return 'haduki-style';
    } else {
      return 'other-style';
    }
  }
}
