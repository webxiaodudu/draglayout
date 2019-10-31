const install=(Vue)=>{
    
    const requireAll = context => context.keys().map(context)
    const component = require.context('@/components', false, /\.vue$/)

    requireAll(component).forEach(item => {
        const name = item.default.name
        Vue.component(`${name}`, item.default)
    })
}

export default install