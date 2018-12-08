import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-preview-window',
  templateUrl: './preview-window.component.html',
  styleUrls: ['./preview-window.component.scss']
})
export class PreviewWindowComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  get talkData() {
    if (window.localStorage.getItem('talkData') != null) {
      return JSON.parse(window.localStorage.getItem('talkData'));
    }else {
      return [];
    }
  }

  /**
   * 発言の表示部分
   */
  messageClassPlus(index: number) {
    return {
      'mt-3': index != 0,
      'md-3': index != this.talkData.length - 1,
    }
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
}
