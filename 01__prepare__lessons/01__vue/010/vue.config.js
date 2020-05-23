const path = require('path') 
function addStyleResource(rule) { 
    rule.use('style-resource')
    .loader('style-resources-loader')
    .options({ 
        patterns: [ 
            path.resolve(__dirname, './src/styles/imports.scss'), 
        ], 
    })
}


module.exports = { 
    chainWebpack: config => { 
        const types = ['vue-modules', 'vue', 'normal-modules', 'normal'] 
        types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type))) 
    },
    publicPath: process.env.NODE_ENV === 'production' ? '/cart/' : '/c' ,
    devServer:{ 
        // before(app) { 
        //     app.get('/api/courses', (req, res) => {
        //         setTimeout(() => {
        //             res.json([{ 
        //                 name: 'web全栈', price: 8999 
        //             }, { 
        //                 name: 'web高级', price: 8999 
        //             }])
        //         }, 1000)
        //     }) 
        // },
        proxy: 'http://localhost:3000'  // 接口地址（代理服务器）
    }
}