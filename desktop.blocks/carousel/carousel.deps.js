({
    mustDeps: [{
        block: 'i-bem',
        elems: ['dom']
    }],
    shouldDeps: [
        {
            block: 'jquery',
            elems: [{ elem: 'support', mods: { property: 'transition' } }]
        }
    ]
})
