modules.define('carousel', ['jquery', 'i-bem-dom'], function(provide, $, bemDom, Carousel) {

    provide(bemDom.declBlock(Carousel, {
        onSetMod: {
            js: {
                inited: function() {
                    this.__base();

                    var _this   = this;
                    var buttons = this._elems('paginator-button');
                    buttons.get(this.getCurrentSlideIndex()).setMod('state', 'active');
                    buttons.forEach(function(button) {
                        _this._domEvents(button).on('click', function(e) {
                            this
                                .pause(e)
                                .to($(e.currentTarget).index());
                        });
                    });

                    this._events().on('slid', function(e, data) {
                        buttons.forEach(function(button) {
                            if (button.hasMod('state')) button.delMod('state');
                        });
                        buttons.get(data.currentSlideIndex).setMod('state', 'active');
                    });
                },
            },
        },
    }));

});
