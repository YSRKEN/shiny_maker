import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';

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
  talkData: {'name': string, 'text': string, 'selected': boolean }[] = [];

  /**
   * キャラ名
   */
  name_ = '真乃';
  get name(): string {
    return this.name_;
  }
  set name(value: string) {
    this.name_ = value;
    window.localStorage.setItem('name', this.name_);
  }

  /**
   * 発言
   */
  message_ = 'はい、鳩さんとは仲良しで、\nつい時間を忘れて遊んでしまうんです';
  get message(): string {
    return this.message_;
  }
  set message(value: string) {
    this.message_ = value;
    window.localStorage.setItem('message', this.message_);
  }

  constructor(private router: Router) { }

  ngOnInit() {
    if (window.localStorage.getItem('name') != null) {
      this.name = window.localStorage.getItem('name');
    }
    if (window.localStorage.getItem('message') != null) {
      this.message = window.localStorage.getItem('message');
    }
    this.loadTalkFromLocalStrage();
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
    element.setAttribute('data-url', "https://shiny-maker.firebaseapp.com");
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
  selectedIdol_ = '真乃';
  get selectedIdol(): string {
    return this.selectedIdol_;
  }
  set selectedIdol(value: string) {
    this.selectedIdol_ = value;
    if (this.selectedIdol_ != '') {
      this.name = this.selectedIdol_;
    }
  }

  /**
   * 会話を追加する
   */
  addTalk() {
    this.talkData.push({'name': this.name, 'text': this.message, 'selected': false });
    this.saveTalkToLocalStrage();
  }

  /**
   * 会話を更新する
   */
  updateTalk(){
    const index = this.selectedTalkIndex;
    if (index >= 0) {
      this.talkData[index].name = this.name;
      this.talkData[index].text = this.message;
      this.saveTalkToLocalStrage();
    }
  }

  /**
   * 会話を上に上げる
   */
  upTalk() {
    const index = this.selectedTalkIndex;
    if (index<= 0) {
      return;
    }
    const temp = this.talkData[index];
    this.talkData[index] = this.talkData[index - 1];
    this.talkData[index - 1] = temp;
    this.saveTalkToLocalStrage();
  }

  /**
   * 会話を下に下げる
   */
  downTalk() {
    const index = this.selectedTalkIndex;
    if (index < 0 || index >= this.talkData.length - 1) {
      return;
    }
    const temp = this.talkData[index];
    this.talkData[index] = this.talkData[index + 1];
    this.talkData[index + 1] = temp;
    this.saveTalkToLocalStrage();
  }

  /**
   * 会話を削除する
   */
  deleteTalk() {
    const index = this.selectedTalkIndex;
    if (index >= 0) {
      this.talkData.splice(index, 1);
      this.saveTalkToLocalStrage();
    }
  }

  /**
   * 会話を選択する
   * @param index 会話のインデックス
   */
  clickTalk(index: number){
    for(let i = 0; i < this.talkData.length; ++i){
      if (i == index) {
        // クリックしたインデックスの要素については選択を反転させる
        this.talkData[i].selected = !this.talkData[i].selected;

        // その結果、選択状態になった場合、入力欄の内容を修正する
        if (this.talkData[i].selected) {
          // 発言はそのままコピーでいい
          this.message = this.talkData[i].text;

          // キャラ名については、セレクトボックスの方も修正を掛ける
          if (this.idolNameList.filter(pair => pair.key == this.talkData[i].name).length > 0) {
            this.selectedIdol = this.talkData[i].name;
          }else {
            this.selectedIdol = '';
            //意味不明なことに、ここのコメントを外すと、
            //キャラ名が「その他(自分で入力できるやつ)」なものを選択した際、
            //[(ngModel)]="selectedIdol"なセレクトボックスの選択が空になる。
            //関係ないセレクトボックスの選択に影響してんじゃねーよボケが！
            // this.name = this.talkData[i].name;
          }
        }
      } else {
        // クリックした以外のインデックスの要素は一律に選択を解除する
        this.talkData[i].selected = false;
      }
    }
    this.saveTalkToLocalStrage();
  }

  /**
   * 会話画像を保存(HTML2Canvasを使用)
   */
  saveTalk() {
    if (this.talkData.length == 0) {
      return;
    }
    html2canvas(document.querySelector("#capture"), {
      allowTaint: true,
      useCORS: true,
      proxy: true,
      scale: 2,
      background :'#FFFFFF',
      onrendered: function (canvas) {
        canvas.toDataURL();
      }
    }).then(canvas => {
      // Base64データに変換
      const base64 = canvas.toDataURL();

      // blobに変換
      const blob = this.Base64toBlob(base64);

      // ファイルの保存イベントを走らせる
      this.saveBlob(blob, "shiny_maker.png");
    }).catch((error) => {
      window.alert('エラー：画像を保存できませんでした。');
    });
  }

  /**
   * Base64をblobに変換する
   * @param base64 Base64
   */
  Base64toBlob(base64): Blob {
    var tmp = base64.split(',');
    var data = atob(tmp[1]);
    var mime = tmp[0].split(':')[1].split(';')[0];
    var buf = new Uint8Array(data.length);
    for (var i = 0; i < data.length; i++) {
      buf[i] = data.charCodeAt(i);
    }
    var blob = new Blob([buf], { type: mime });
    return blob;
  }

  /**
   * blobを保存する
   * @param blob 
   */
  saveBlob(blob: Blob, fileName: string){
    const url = window.URL;
    const dataUrl = url.createObjectURL(blob);
    const event = document.createEvent("MouseEvents");
    event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    const a = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
    (a as HTMLAnchorElement).href = dataUrl;
    (a as HTMLAnchorElement).download = fileName;
    a.dispatchEvent(event);
  }

  /**
   * サンプル会話で初期化
   */
  initialTalk() {
    this.talkData = [];
    this.talkData.push({'name': '真乃', 'text': '「普通の系譜」にしては珍しいほんわか枠。\nおっとりとした性格の中にカイデーを隠し持つ。\n鳩を飼っているが食用ではないので注意。', 'selected': false});
    this.talkData.push({'name': '灯織', 'text': '「蒼の系譜」だがファッションセンスも備えている。\nその割に占いを信じやすい茶目っ気を持つ。\n髪型などから「美城常務の娘」説まであるとか。', 'selected': false});
    this.talkData.push({'name': 'めぐる', 'text': '「個性の系譜」らしく髪の毛が黄色い。\n"ちゃんみお"を彷彿とさせるコミュ強が特徴。\nそれと……ふふっ、アメリカ人なんてどうだ？', 'selected': false});
    this.talkData.push({'name': 'プロデューサー', 'text': 'ちひろと美咲ちゃの手を逃れたプロデューサーを\n待っていたのは、またアイドル事務所だった。\n次回『担当』。来週も地獄のレッスンに付き合ってもらう。', 'selected': false});
    this.talkData.push({'name': 'はづき', 'text': '「事務員の系譜」の中でもマルチな才能を持つ。\nボイトレからメイクまでをこなせるのは圧巻の一言。\nその能力の代償として、一日の大半を寝て過ごすことに。', 'selected': false});
    this.talkData.push({'name': '社長', 'text': '「社長の系譜」に違わずアイコンが黒塗りである。\n名前が「あまい」なのに「私は甘くはないぞ」が口癖らしい。\nＣＶが完全に海馬社長なのが面白いと思いました……。', 'selected': false});
    this.saveTalkToLocalStrage();
  }

  /**
   * 全会話を削除
   */
  allDeleteTalk() {
    if (window.confirm('会話を全て削除します。よろしいですか？')) {
      this.talkData = [];
      this.saveTalkToLocalStrage();
    }
  }

  /**
   * 会話内容を保存
   */
  saveTalkToLocalStrage() {
    window.localStorage.setItem('talkData', JSON.stringify(this.talkData));
  }

  /**
   * 会話内容を復元
   */
  loadTalkFromLocalStrage() {
    if (window.localStorage.getItem('talkData') != null) {
      this.talkData = JSON.parse(window.localStorage.getItem('talkData'));
    }
  }

  /**
   * 別の画面に遷移し、そちらで大きくプレビューさせる
   */
  async openPreviewWindow() {
    await this.router.navigate(['/preview']);
  }

  /**
   * いずれかの会話が選択されていたらtrue
   */
  get selectAnyTalk(): boolean {
    for(let i = 0; i < this.talkData.length; ++i){
      if (this.talkData[i].selected) {
        return true;
      }
    }
    return false;
  }

  /**
   * 選択された会話のインデックスを返す
   */
  get selectedTalkIndex(): number {
    for(let i = 0; i < this.talkData.length; ++i){
      if (this.talkData[i].selected) {
        return i;
      }
    }
    return -1;
  }
}
