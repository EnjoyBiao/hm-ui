// 包的入口文件
// 定义 install 方法 ，接受vue 作为参数。如果使用use注册插件，则所有组建库都将被注册
import Button from './button'
import Dialog from './dialog'
import Input from './input'
import Radio from './radio'
import RadioGroup from './radio-group'
import SelectTree from  './selectTree'
import './fonts/iconfont.css'
const components = [
    Button,
    Dialog,
    Input,
    Radio,
    RadioGroup,
    SelectTree
]
const  install = function ( Vue) {
    components.forEach((item) => {
        Vue.component(item.name, item)
    })
    //注册所有的组建
    // console.log('123')
}
// 判断是否直接引入文件，如果是，就不用调用Vue.use();(如果不适用模块化开发，直接scrip标签的形式引入)
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}
export  default  {
    install
}
