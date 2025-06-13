// Responsive breakpoints tanımı (main.js'den)
breakpoints({
    xlarge:   [ '1281px',  '1680px' ],
    large:    [ '981px',   '1280px' ],
    medium:   [ '737px',   '980px'  ],
    small:    [ '481px',   '736px'  ],
    xsmall:   [ '361px',   '480px'  ],
    xxsmall:  [ null,      '360px'  ]
});

// Sayfa yüklenince animasyon başlat (main.js'den)
$(window).on('load', function() {
    window.setTimeout(function() {
        $('body').removeClass('is-preload');
    }, 100);
});

// Mobil cihazda body'ye is-touch ekle (main.js'den)
if (browser.mobile)
    $('body').addClass('is-touch');

// util.js'den: $.prioritize fonksiyonu (responsive için gereklidir)
$.prioritize = function($elements, condition) {
    var key = '__prioritize';
    if (typeof $elements != 'jQuery')
        $elements = $($elements);

    $elements.each(function() {
        var $e = $(this), $p,
            $parent = $e.parent();

        if ($parent.length == 0) return;

        if (!$e.data(key)) {
            if (!condition) return;
            $p = $e.prev();
            if ($p.length == 0) return;
            $e.prependTo($parent);
            $e.data(key, $p);
        }
        else {
            if (condition) return;
            $p = $e.data(key);
            $e.insertAfter($p);
            $e.removeData(key);
        }
    });
};
