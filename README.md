# GP11 Android ゲーム制作 7/28

## やることリスト

### マッチング処理の実装
  - [サンプル](http://vga-unity.github.com/gp11-android-0728/demo.html)を見てみる。
  - Master server への登録方法。
  - Master server からの取得方法。

### 補間処理の実装
  - 内挿法・外挿法とは。
  - 移動処理の分離。
  - OnSerializeNetworkView

### おまけ：FPS にしてみる
  - [サンプル](http://vga-unity.github.com/gp11-android-0728/demo-fps.html)を見てみる。
  - カメラの組み込み。
  - 移動方法の変更。
  - マウスによる回転。

## 課題
FPS 版をベースにして独自のアレンジを施してみてください。例えば……

  - ジャンプを実装してみる（けっこう難しいと思います）。
  - 武器を増やしてみる。
    - グレネード
    - ショットガン
  - 体力判定を付けてみる。
    - 死んだら (0,0,0) から復活。
  - 障害物を作ってみる。
    - 今の実装だと障害物をすり抜けてしまうのでやや意味無し。ちょっと前に授業でも使った Character Controller を組み込めば、障害物判定できるのですが……

例によって提出するには pull request を出してください。Git for Windows 上で Commit と Sync をしたあとに、GitHub ウェブサイト上で pull request ボタン押下です。