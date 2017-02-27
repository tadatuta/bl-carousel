modules.define('carousel', ['jquery', 'i-bem-dom'], function(provide, $, bemDom) {

provide(bemDom.declBlock(this.name,
{
    onSetMod: {
        js: {
            inited: function() {
                var isVertical = this.hasMod('orientation', 'vertical');
                this._direction = {
                    next: isVertical ? 'top' : 'left',
                    prev: isVertical ? 'bottom' : 'right'
                };

                this.params.pause == 'hover' &&
                    this._domEvents().on('mouseenter', this.pause) &&
                    this._domEvents().on('mouseleave', this.cycle);

                if (this.params.to) {
                    this.to(this.params.to);
                } else if (this.params.action) {
                    this[this.params.action]();
                } else if (this.params.interval) this.cycle();

                this._domEvents('control').on('click', function(e) {
                    var current = this.findChildElems('control').get($(e.currentTarget).index());
                    this[current.getMod('type') == 'right' ? 'next' : 'prev']();
                });
            }
        }
    },

    getCurrentSlideIndex: function() {
        var active = this.findChildElem('item', 'state', 'active');
        return active.domElem.index();
    },

    cycle: function(e) {
        if (!e) this.paused = false;

        // TODO: use channels here
        // note: don't drop current implementation support
        this.params.interval &&
        !this.paused &&
        (this.interval = setInterval($.proxy(this.next, this), this.params.interval));

        return this;
    },

    to: function(pos) {
        var _this = this,
            children = this._elems('item'),
            activePos = this.getCurrentSlideIndex();

        if (pos > (children.length - 1) || pos < 0) return;

        if (this.sliding) {
            return this._domEvents().on('slid', function() {
                _this.to(pos);
                // TODO: check, originally was `one` binding
                _this._domEvents().un('slid');
            });
        }

        if (activePos == pos) {
            return this.pause().cycle();
        }

        return this.slide(pos > activePos ? 'next' : 'prev', $(children[pos]));
    },

    pause: function(e) {
        if (!e) this.paused = true;

        if ((this.findChildElem('item', 'type', 'next').length || this.findChildElem('item', 'type', 'prev').length) && $.support.transition.end) {
            this.domElem.trigger($.support.transition.end);
            this.cycle();
        }

        clearInterval(this.interval);
        this.interval = null;
        return this;
    },

    next: function() {
        if (this.sliding) return;
        return this.slide('next');
    },

    prev: function() {
        if (this.sliding) return;
        return this.slide('prev');
    },

    slide: function(type, next) {
        var _this = this,
            active = this.findChildElem('item', 'state', 'active'),
            next = next || active.domElem[type](),
            bemNext = this.findChildElems('item').get(active.domElem.next().index()),
            isCycling = this.interval,
            direction = this._direction[type],
            fallback  = type == 'next' ? 'first' : 'last';

        this.sliding = true;

        isCycling && this.pause();

        next = next.length ? next : this._elem('item').domElem[fallback]();

        // if (bemNext.hasMod('state', 'active')) return;

        var nextIdx = next.index();

        // TODO: check if mod name slide is ok

        if ($.support.transition && this.hasMod('animate')) {
            this._emit('slide', { relatedTarget: next[0] }); // TODO: check why we need relatedTarget
            // if (e.isDefaultPrevented()) return;
            bemNext.setMod('type', type);

            next[0].offsetWidth; // force reflow

            active.setMod('dir', direction)
            bemNext.setMod('dir', direction);

            this._domEvents().on($.support.transition.end, function() {

                _this._domEvents().un($.support.transition.end);

                bemNext
                    .delMod('type')
                    .delMod('dir')
                    .setMod('state', 'active');
                active
                    .delMod('state')
                    .delMod('dir');

                _this.sliding = false;

                setTimeout(function() {
                    _this._emit('slid', { currentSlideIndex: nextIdx });
                }, 0);
            });

        } else {

            this._emit('slide', {
                relatedTarget: next[0]
            });

            // if (e.isDefaultPrevented()) return;

            active.delMod('state')
            bemNext.setMod('state', 'active')
            this._emit('slid', { currentSlideIndex: nextIdx })
                .sliding = false;
        }

        isCycling && this.cycle();

        return this;
    },

    _getDefaultParams: function() {
        return {
            interval: 5000,
            pause: 'hover'
        };
    }

}));

});
