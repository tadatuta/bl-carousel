modules.define('i-bem__dom', ['jquery'], function(provide, $, DOM) {

DOM.decl('carousel',
{
    onSetMod: {
        js: {
            inited: function() {
                this.params.pause == 'hover' && this
                    .bindTo('mouseenter', this.pause)
                    .bindTo('mouseleave', this.cycle);

                if (this.params.to) {
                    this.to(this.params.to);
                } else if (this.params.action) {
                    this[this.params.action]();
                } else if (this.params.interval) this.cycle();

                this.bindTo('control', 'click', function(e) {
                    this[this.getMod($(e.currentTarget), 'type') == 'right' ? 'next' : 'prev']();
                });
            }
        }
    },

    cycle: function(e) {
        if (!e) this.paused = false;

        // TODO: use channels here
        // note: don't drop current implementation support
        this.params.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.params.interval));

        return this;
    },

    to: function(pos) {
        var _this = this,
            active = this.findElem('item', 'state', 'active'),
            children = this.elem('item'),
            activePos = children.index(active);

        if (pos > (children.length - 1) || pos < 0) return;

        if (this.sliding) {
            return this.on('slid', function() {
                _this.to(pos);
                // TODO: check, originally was `one` binding
                _this.un('slid');
            });
        }

        if (activePos == pos) {
            return this.pause().cycle();
        }

        return this.slide(pos > activePos ? 'next' : 'prev', $(children[pos]));
    },

    pause: function(e) {
        if (!e) this.paused = true;

        if ((this.findElem('item', 'type', 'next').length || this.findElem('item', 'type', 'prev').length) && $.support.transition.end) {
            this.domElem.emit($.support.transition.end);
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
            active = this.findElem('item', 'state', 'active'),
            next = next || active[type](),
            isCycling = this.interval,
            direction = type == 'next' ? 'left' : 'right',
            fallback  = type == 'next' ? 'first' : 'last';

        this.sliding = true;

        isCycling && this.pause();

        next = next.length ? next : this.elem('item')[fallback]();

        if (this.hasMod(next, 'state', 'active')) return;

        // TODO: check if mod name slide is ok
        if ($.support.transition && this.hasMod('animate', 'yes')) {
            this.emit('slide', { relatedTarget: next[0] }); // TODO: check why we need relatedTarget
            // if (e.isDefaultPrevented()) return;
            this.setMod(next, 'type', type);
            next[0].offsetWidth; // force reflow
            this
                .setMod(active, 'dir', direction)
                .setMod(next, 'dir', direction);

            this.bindTo($.support.transition.end, function() {

                _this
                    .unbindFrom($.support.transition.end)
                    .delMod(next, 'type')
                    .delMod(next, 'dir')
                    .setMod(next, 'state', 'active')
                    .delMod(active, 'state')
                    .delMod(active, 'dir')
                    .sliding = false;

                setTimeout(function() { _this.emit('slid'); }, 0);
            });

        } else {

            this.emit('slide', {
                relatedTarget: next[0]
            });

            // if (e.isDefaultPrevented()) return;

            this
                .delMod(active, 'state')
                .setMod(next, 'state', 'active')
                .emit('slid')
                .sliding = false;
        }

        isCycling && this.cycle();

        return this;
    },

    getDefaultParams: function() {
        return {
            interval: 5000,
            pause: 'hover'
        };
    }

});

provide(DOM);

});
