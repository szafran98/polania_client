module.exports = {
    lintOnSave: false,
    chainWebpack: (config) => {
        config.resolve.extensions
            .clear()
            .add('.vue')
            .add('.tsx')
            .add('.ts')
            .add('.mjs')
            .add('.js')
            .add('.jsx')
            .add('.json')
            .add('.wasm');
    },
};
