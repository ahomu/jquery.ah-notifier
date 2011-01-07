#jQuery ah-notifier Plugin

*A plugin supports display notify. As like a Growl (Mac application).*

MacのGrowlライクなnotificationを表示するjQueryプラグインです。notificationのデザインはCSSを適用します。Y軸方向に連続して表示されます。現在はheightがかさむと画面外に表示が飛びます。

##使い方 - Usage

※時間パラメーターは調整できますが、(interval - effectspeed) >= 300 でないと、ちょっとおかしくなるのは現バージョンの仕様です ;-)

サンプルコード:

    <script src="./js/jquery.ah-notifier.js" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript">
    $(function()
    {
        $('#jq-post_message').ahNotifier({
            width       : 200,       // 全体の最大幅(含padding&margin) [int(px)]
            margin      : 20,        // ユニット間の距離               [int(px)]
            initPosition: {          // 表示の開始位置                [object(prop:int(px))]
                right   : 10,
                top     : 10
            },
            interval    : 600,       // ユニットの表示間隔             [int(ms)]
            duration    : 5000,      // 表示されてからdestroyされるまで [int(ms)]
            effectSpeed : 'normal'   // 各種エフェクトの速度           [int(ms)|fast|slow|normal]
        });
    });
    </script>

    <style type="text/css">
    .jq-post_message-unit {
        width: 170px;
        font-size: 15px;
        font-weight: bold;

        padding: 15px;
        color: #ffffff;
        background-color: rgb(33, 33, 33);
        background-color: rgba(0, 0, 0, 0.66);
        text-align: center;

        -moz-border-radius: 7px;
        -webkit-border-radius: 7px;
        border-radius: 7px;
    }
    </style>

    <ul id="jq-post_message" style="display:none;">
        <li>?????1</li>
        <li>?????2<br />??????</li>
        <li>?????3</li>
        <li>?????4</li>
    </ul>

##クレジット - Credit

Copyright 2011, Ayumu Sato ( http://havelog.ayumusato.com )