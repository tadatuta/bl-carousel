BEM port of Twitter Bootstrap carousel
======================================

````javascript
{
    block: 'carousel',
    mods: { animate: 'yes' },
    content: [
        {
            elem: 'inner',
            content: [
                {
                    elem: 'item',
                    elemMods: { state: 'active' },
                    content: {
                        elem: 'img',
                        url: 'https://lh5.ggpht.com/sxYdNHOqblPwcd3fCR1sj5gzlib4sy2sl1btHdwA28WVPDxyj6hpXoOT-a4fz4nzKwnX'
                    }
                },
                {
                    elem: 'item',
                    content: {
                        elem: 'img',
                        url: 'https://lh5.ggpht.com/s7830ZGWwOtA2CTApJk0ZvWny7zIbuXaOe5GlqPkknGktUmh9LBM0ojT-tjy-0dp1gM'
                    }
                },
                {
                    elem: 'item',
                    content: {
                        elem: 'img',
                        url: 'https://lh6.ggpht.com/Ar_0ImGRpXy7F1QlXWQmsT6IjKPzqC8uQ9n8JgefpZzZsUK_Xpz2sL8SyFGwVJR37YTH'
                    }
                }
            ]
        },
        {
            elem: 'control',
            elemMods: { type: 'left' },
            content: '&lsaquo;'
        },
        {
            elem: 'control',
            elemMods: { type: 'right' },
            content: '&rsaquo;'
        }
    ]
}
````
