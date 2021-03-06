/*
 * jQuery ah-notifier plugin 1.0
 *
 * https://github.com/ahomu/jquery.ah-notifier
 *
 * Copyright (c) 2011 Ayumu Sato ( http://havelog.ayumusato.com )
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function($) {

$.fn.ahNotifier = function(options)
{
    // property
    var defaults = {
            width       : 200,       // 全体の最大幅(含padding&margin) [int(px)]
            margin      : 20,        // ユニット間の距離               [int(px)]
            initPosition: {          // 表示の開始位置                [object(prop:int(px))]
                right   : 10,
                top     : 10
            },
            interval    : 1000,      // ユニットの表示間隔             [int(ms)]
            duration    : 5000,      // 表示されてからdestroyされるまで [int(ms)]
            effectSpeed : 600        // 各種エフェクトの速度           [int(ms)]
        },
        settings = $.extend({}, defaults, options),
        units    = [],
        stands   = ('top' in settings.initPosition)  ? 'top'
                                                     : 'bottom',
        $wrapper = $('<div class="jq-post_message-wrapper" />').css($.extend({
            position: 'absolute',
            overflow: 'hidden',
            width   : settings.width
        }, settings.initPosition));

    // method
    var init    = function()
        {
            // vars
            var $lis    = $(this).children(),
                   i    = 0,
                  iz    = $lis.size();

            // wrapper appendTo body
            $wrapper.appendTo('body');

            // create notifier units
            $lis.each(function()
            {
                units.push(create($(this).html()));
            });

            // first adjust
            adjust(0);

            // intervals
            var cycle = setInterval(function()
            {
                if ( i >= iz ) {
                    clearInterval(cycle);
                } else {
                    // display
                    var $unit = $(units[i++]);
                    display($unit);
                }
            }, settings.interval);
        },
        create  = function(html)
        {
            var $unit = $('<div class="jq-post_message-unit" />').css({
                position: 'absolute'
            }).appendTo($wrapper).hide().html(html).fadeTo(0, 0.001);

            return $unit.get(0);
        },
        display = function($unit)
        {
            // show unit
            $unit.fadeTo(settings.effectSpeed, 1);

            // increment wrapper height (:disabled)
            $wrapper.height($wrapper.height() + $unit.outerHeight() + settings.margin);

            // suicide click
            $unit.click(function()
            {
                destroy($unit);
            });

            // suicide timer
            setTimeout(function()
            {
                destroy($unit);
            },settings.duration);
        },
        destroy = function($unit)
        {
            // remove and adjust
            $unit.fadeOut(settings.effectSpeed, function()
            {
                $unit.remove();
                adjust(300);
            });
        },
        adjust  = function(speed)
        {
            var i   = 0,
                iz  = units.length,
                pos = 0;

            for ( ; i < iz; i++ ) {
                var $unit = $(units[i]),
                    anime = {};

                if ( $unit.css('display') === 'none' ) {
                    continue;
                }

                anime[stands] = pos;
                $unit.animate(anime, speed);

                pos += parseInt($unit.outerHeight() + settings.margin);
            }
        };

    // construct
    this.each(function()
    {
        init.apply(this);
    });

    return this;
};
})(jQuery);