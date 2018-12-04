import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.scss']
})
export class MainWindowComponent implements OnInit {

  /**
   * アプリのタイトル
   */
  title = 'シャニマス会話メーカー';

  /**
   * キャラ名一覧
   */
  idolNameList = [
    { key: '真乃', name: '櫻木真乃' },
    { key: '灯織', name: '風野灯織' },
    { key: 'めぐる', name: '八宮めぐる' },
    { key: '恋鐘', name: '月岡恋鐘' },
    { key: '摩美々', name: '田中摩美々' },
    { key: '咲耶', name: '白瀬咲耶' },
    { key: '結華', name: '三峰結華' },
    { key: '霧子', name: '幽谷霧子' },
    { key: '果穂', name: '小宮果穂' },
    { key: '智代子', name: '園田智代子' },
    { key: '樹里', name: '西城樹里' },
    { key: '凛世', name: '杜野凛世' },
    { key: '夏葉', name: '有栖川夏葉' },
    { key: '甘奈', name: '大崎甘奈' },
    { key: '甜花', name: '大崎甜花' },
    { key: '千雪', name: '桑山千雪' },
    { key: 'プロデューサー', name: 'プロデューサー' },
    { key: 'はづき', name: '七草はづき' },
    { key: '社長', name: '天井社長' },
    { key: '', name: 'その他' }
  ]

  /**
   * 発言情報
   */
  talkData: {'name': string, 'text': string}[] = [];

  /**
   * キャラ名
   */
  name = '恋鐘';

  /**
   * 発言
   */
  message = '問題なかよ！\nヤサイマシマシやけん！';

  constructor() { }

  ngOnInit() {
  }

  /**
   * Twitterボタンを設置
   */
  ngAfterViewInit() {
    var element = document.createElement('a');
    element.setAttribute('href', "https://twitter.com/share?ref_src=twsrc%5Etfw");
    element.setAttribute('class', "twitter-share-button");
    element.setAttribute('data-size', "large");
    element.setAttribute('data-text', "");
    element.setAttribute('data-url', "https://shiny_maker.firebaseapp.com");
    element.setAttribute('data-hashtags', this.title);
    element.setAttribute('data-show-count', "false");

    var script = document.createElement('script');
    script.async = true;
    script.setAttribute('src', "https://platform.twitter.com/widgets.js");
    script.setAttribute('charset', 'utf-8');

    var div = document.getElementById("anchor");
    div.parentNode.insertBefore(element, div.nextSibling);
    div.parentNode.insertBefore(script, div.nextSibling);
  }

  /**
   * 現在選択しているキャラ名
   */
  selectedIdol_ = '恋鐘';
  get selectedIdol(): string {
    return this.selectedIdol_;
  }
  set selectedIdol(value: string) {
    this.selectedIdol_ = value;
    if (this.selectedIdol_ != '') {
      this.name = this.selectedIdol_;
    }
    console.log(this.selectedIdol_);
  }

  /**
   * 会話を追加する
   */
  addTalk() {
    this.talkData.push({'name': this.name, 'text': this.message});
    console.log(this.talkData);
  }
}
