window.dom = {};

/**
 * 根据参数创造新的节点
 * dom.create('<div>直接这么创建</div>');
 * @param {string} tagNameString 标签名
 */
dom.create = function (tagNameString) {

    const container = document.createElement('template');
    container.innerHTML = tagNameString.trim();
    return container.content.firstChild;

};

/**
 * 在node节点后面添加节点newNode
 * @param {Object} node 
 * @param {Object} newNode 新的节点
 */
dom.after = function (node, newNode) {
    let parent = node.parentNode;
    // parentNode.insertBefore(newNode, referenceNode); 返回的值是newNode 
    // node.nextSibling node节点的下一位
    return parent.insertBefore(newNode, node.nextSibling);
}

/**
 * 在node节点前面添加newNode节点
 * @param {Object} node 
 * @param {Object} newNode 
 */
dom.before = function (node, newNode) {
    let parent = node.parentNode;
    return parent.insertBefore(newNode, node);
}

/**
 * 给父节点添加子节点
 * @param {Object} parent 父节点
 * @param {Object} child 子节点
 */
dom.append = function (parent, child) {
    parent.appendChild(child);
}

/**
 * 将目标节点的父节点变为parent节点
 * way === 1 : parent节点建立在目标节点父节点的最后面
 * way === 2 : parent节点保持在目标节点原来的位置
 * @param {Object} targetNode 目标节点
 * @param {Object} parent 父节点
 * @param {Number} way 选择添加方式
 */
dom.wrap = function (targetNode, parent, way) {
    if (way === 1) {
        targetNode.parentNode.appendChild(parent);
        parent.appendChild(targetNode);
    } else if (way === 2) {
        dom.before(targetNode, parent);
        // 使用appendChild后节点不会自己复制,而是直接改过去
        dom.append(parent, targetNode);
    }
}

/**
 * 删除目标节点
 * @param {Object} targetNode 目标节点
 * @returns {Object} 返回删除的子节点
 */
dom.remove = function (targetNode) {
    let parent = targetNode.parentNode;
    return parent.removeChild(targetNode);
}

// 删除子节点
dom.empty = function (targetNode) {
    let arr = new Array();
    let x = targetNode.firstChild;

    while (x) {
        arr.push(dom.remove(targetNode.firstChild));
        x = targetNode.firstChild;
    }
    return arr;
}

/**
 * 获取或者设置节点的属性值
 * @param {Object} node 需要操作的节点
 * @param {String} attrName 属性名
 * @param {String} attrValue 属性值
 */
dom.attr = function (node, attrName, attrValue) {

    // 传了两个参数就是读属性,三个参数就是写属性, 重载
    if (arguments.length === 2) {
        return node.getAttribute(attrName);
    } else if (arguments.length === 3) {
        node.setAttribute(attrName, attrValue);
    }
}

/**
 * 读写文本内容
 * @param {Object} node 操作的节点
 * @param {String} textValue 文本内容
 */
dom.text = function (node, textValue) {

    if (arguments.length === 1) {
        return node.textContent;
    } else if (arguments.length === 2) {
        node.innerText = textValue;
    }
}

/**
 * 读写html内容
 * @param {Object} node 操作内容
 * @param {String} htmlValue html内容
 */
dom.html = function (node, htmlValue) {
    if (arguments.length === 1) {
        return node.innerHTML;
    } else if (arguments.length === 2) {
        node.innerHTML = htmlValue;
    }
}


/**
 * 增加节点的样式 / 获取节点的样式
 * @param {Object} node 
 * @param {String/Object} name 属性名或者是一个属性对象{key:value}
 * @param {String} value 属性值
 */
dom.style = function (node, name, value) {

    // style(test, `color`, `red`)
    if (arguments.length === 3) {
        node.style[name] = value;
    } else if (arguments.length === 2) {

        // 如果name是字符串就返回value
        if (typeof name === 'string') {
            return node.style[name];
        } else if (name instanceof Object) {
            const obj = name;
            for (key in obj) {
                console.log(`obj:${obj}`);
                console.log(`key:${key}, value:${obj[key]}`);
                node.style[key] = obj[key];
            }
        }

    }
}

// 重写节点样式
/**
 * 和增加节点样式的差不多, 区别是 1.不能获取样式 2. 每一次调用都重新写入样式
 * @param {Object} node 
 * @param {Object/String} name 
 * @param {Object} value 
 */
dom.reStyle = function (node, name, value) {

    // 清空样式
    node.style = '';

    if (arguments.length === 3) {
        node.style = `${name}:${value};`;
    } else if (arguments.length === 2) {
        const obj = name;
        for (key in obj) {
            node.style[key] = obj[key];
        }
    }
}

dom.class = {

    /**
     * 增加节点的class属性
     * @param {Object} node 操作节点
     * @param {String} className 类名
     */
    add(node, className) {
        node.classList.add(className);
    },

    /**
     * 删除节点class
     * @param {Object} node 操作节点
     * @param {String} className 需要删除的类名
     */
    remove(node, className) {
        node.classList.remove(className);
    },

    // 判断节点是否有class
    has(node, className) {
        node.classList.has(className);
    },
    // 替换
    replace(node, oldName, newName) {
        node.classList.replace(oldName, newName);
    }

};

/**
 * 添加监听node的eventName事件的func函数
 * @param {Object} node 操作节点
 * @param {String} eventName 事件名字
 * @param {Function} func 函数
 */
dom.on = function (node, eventName, func) {
    node.addEventListener(eventName, func)
}


/**
 * 取消监听node的eventName事件的func函数
 * @param {Object} node 操作节点
 * @param {String} eventName 事件名字
 * @param {Function} func 事件函数
 */
dom.off = function (node, eventName, func) {
    node.removeEventListener(eventName, func);
}

/**
 * 如果说没有指定作用域,那么就在document里面选, 如果给了就在scope里面选
 * @param {String} selector 选择器, '#xxx'
 * @param {Object} scope 作用域
 * @returns {Object} nodeList 选择器选出来的符合条件的伪数组
 */
dom.find = function (selector, scope) {
    return (scope || document).querySelectorAll(selector);
}

// 返回父元素
dom.parent = function (node) {
    return node.parentNode;
}

// 返回子元素, 元素节点
dom.children = function (node) {
    return node.children;
}

// 返回兄弟元素
/**
 * 返回一个兄弟元素, 将获得的伪数组改成数组,再用filter将自己剔除,然后返回一个数组
 * @param {Object} node 操作节点
 */
dom.sibling = function (node) {
    return Array.from(node.parentNode.children).filter(n => n != node);
}

/**
 * 返回当前元素节点的下一个元素节点(element node)
 * @param {Object} node 操作元素
 */
dom.next = function (node) {
    let x = node.nextSibling;
    // 用来判断是不是文本节点,是的话就再看前面一个
    while (x && x.nodeType === 3) {
        x = x.nextSibling;
    }
    return x;
}

dom.previous = function (node) {
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
        x = x.previousSibling;
    }
    return x;
}

/**
 * 遍历nodelist,然后执行相对的函数操作
 * @param {Object} nodeList 一个伪数组,包含着一个node的集合
 * @param {function} fn 函数
 */
dom.each = function (nodeList, fn) {

    for (let i = 0; i < nodeList.length; i++) {
        fn.call(null, nodeList[i]);
    }

}


dom.index = function (node) {
    const list = dom.children(node.parentNode);
    let i;
    for (i = 0; i < list; i++) {
        if (node === list[i]) {
            break;
        }
    }

    return i;
}