// Compiler: 遍历模板，分析其中哪些用到了data中的key以及事件等指令
// 这时认为是一个依赖，创建一个Watcher实例，使界面中的dom更新函数和那个key
// 挂钩，如果更新了key，则执行这个更新函数

class Compiler {
    // el: 宿主元素
    // vm：KVue实例
    constructor(el, vm) {
        this.$vm = vm;

        this.$el = document.querySelector(el);

        // 执行编译
        this.compile(this.$el)
        // 追加
        // this.$el.appendChild(this.$el)

    }

    compile(el) {
        const childNodes = el.childNodes;
        Array.from(childNodes).forEach(node => {
            // 判断节点类型
            if (this.isElement(node)) {
                // 元素 <div></div>
                // console.log('编译元素：' + node.nodeName);
                this.compileElement(node);
            } else if (this.isInter(node)) {
                // 插值文本 {{xx}}
                // console.log('编译插值文本：' + node.textContent);
                this.compileText(node)
            }

            // 递归可能存在的子元素
            this.compile(node);
        })
    }

    isElement(node) {
        return node.nodeType === 1;
    }

    isInter(node) {
        // 是否插值表达式：是文本节点并且复合正则
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }

    // 编译插值文本
    compileText(node) {
        // {{xx}}
        // node.textContent = this.$vm[RegExp.$1];
        this.update(node, RegExp.$1, 'text')
    }

    // update函数：负责更新dom，同时创建watcher实例在两者之间挂钩
    update(node, exp, dir) {
        // 首次的初始化
        const updaterFn = this[dir + 'Updater']
        updaterFn && updaterFn(node, this.$vm[exp])

        // 更新
        new Watcher(this.$vm, exp, function(value) {
            updaterFn && updaterFn(node, value)
        })
    }

    textUpdater(node, value) {
        node.textContent = value;
    }

    compileElement(node) {
        // 获取属性
        const nodeAttrs = node.attributes;
        Array.from(nodeAttrs).forEach(attr => {
            // k-text="exp"
            const attrName = attr.name; // k-text
            const exp = attr.value;     // exp

            if (this.isDirective(attrName)) {
                // 截取指令的名字
                const dir = attrName.substring(2); // text
                // 执行响应更新函数
                this[dir] && this[dir](node, exp);
            }
            // 事件处理
            if (this.isEvent(attrName)) {
                // @click = "onClick"
                const dir = attrName.substring(1); // click
                // exp 是 onClick
                this.eventHandler(node, exp, dir);
            }
        })
    }

    isDirective(attr) {
        return attr.indexOf('k-') == 0;
    }

    isEvent(attr) {
        return attr.indexOf('@') == 0;
    }

    text(node, exp) {
        this.update(node, exp, 'text')
    }

    html(node, exp) {
        this.update(node, exp, 'html')
    }

    htmlUpdater(node, value) {
        node.innerHTML = value;
    }

    model(node, exp) {
        // 赋值
        this.update(node, exp, 'model')

        // 事件监听
        node.addEventListener('input', e => {
            this.$vm[exp] = e.target.value;
        })
    }

    modelUpdater(node, value) {
        node.value = value
    }

    eventHandler(node, exp, dir) {
        const fn = this.$vm.$options.methods && this.$vm.$options.methods[exp]
        if (fn) {
            node.addEventListener(dir, fn.bind(this.$vm))
        }
    }
}
