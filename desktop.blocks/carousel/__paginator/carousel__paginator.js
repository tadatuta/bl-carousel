modules.define('carousel', ['jquery'], function(provide, $, Carousel) {
    provide(Carousel.decl({
        onSetMod: {
            js: {
                inited: function() {
                    this.__base.apply(this, arguments);

                    var buttons = this.elem('paginator-button');
                    this.setMod(buttons.eq(this.getCurrentSlideIndex()), 'state', 'active')

                    this.bindTo(buttons, 'click', function(e) {
                        this
                            .pause()
                            .to(buttons.index($(e.currentTarget)));
                    });

                    this.on('slid', function(e, data) {
                        this.delMod(buttons, 'state')
                            .setMod(buttons.eq(data.currentSlideIndex), 'state', 'active');
                    });
                }
            }
        }
    }));
});
