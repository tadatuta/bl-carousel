BEM port of Twitter Bootstrap carousel
======================================

````javascript
{
    block: 'carousel',
    mods: { orientation: 'horizontal', animate: true },
    content: [
        {
            elem: 'inner',
            content: [
                {
                    elem: 'item',
                    elemMods: { state: 'active' },
                    content: {
                        elem: 'img',
                        url: 'https://raw.githubusercontent.com/bem/bem-identity/master/sign/_theme/sign_theme_batman.png'
                    }
                },
                {
                    elem: 'item',
                    content: {
                        elem: 'img',
                        url: 'https://raw.githubusercontent.com/bem/bem-identity/master/sign/_theme/sign_theme_spots.png'
                    }
                },
                {
                    elem: 'item',
                    content: {
                        elem: 'img',
                        url: 'https://raw.githubusercontent.com/bem/bem-identity/master/sign/_theme/sign_theme_captain-america.png'
                    }
                }
            ]
        },
        {
            elem: 'control',
            elemMods: { type: 'left', theme: 'default' },
            content: '‹'
        },
        {
            elem: 'control',
            elemMods: { type: 'right', theme: 'default' },
            content: '›'
        }
    ]
}
````
