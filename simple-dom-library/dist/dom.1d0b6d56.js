// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"dom.js":[function(require,module,exports) {
window.dom = {};
/**
 * 根据参数创造新的节点
 * dom.create('<div>直接这么创建</div>');
 * @param {string} tagNameString 标签名
 */

dom.create = function (tagNameString) {
  var container = document.createElement('template');
  container.innerHTML = tagNameString.trim();
  return container.content.firstChild;
};
/**
 * 在node节点后面添加节点newNode
 * @param {Object} node 
 * @param {Object} newNode 新的节点
 */


dom.after = function (node, newNode) {
  var parent = node.parentNode; // parentNode.insertBefore(newNode, referenceNode); 返回的值是newNode 
  // node.nextSibling node节点的下一位

  return parent.insertBefore(newNode, node.nextSibling);
};
/**
 * 在node节点前面添加newNode节点
 * @param {Object} node 
 * @param {Object} newNode 
 */


dom.before = function (node, newNode) {
  var parent = node.parentNode;
  return parent.insertBefore(newNode, node);
};
/**
 * 给父节点添加子节点
 * @param {Object} parent 父节点
 * @param {Object} child 子节点
 */


dom.append = function (parent, child) {
  parent.appendChild(child);
};
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
    dom.before(targetNode, parent); // 使用appendChild后节点不会自己复制,而是直接改过去

    dom.append(parent, targetNode);
  }
};
/**
 * 删除目标节点
 * @param {Object} targetNode 目标节点
 * @returns {Object} 返回删除的子节点
 */


dom.remove = function (targetNode) {
  var parent = targetNode.parentNode;
  return parent.removeChild(targetNode);
}; // 删除子节点


dom.empty = function (targetNode) {
  var arr = new Array();
  var x = targetNode.firstChild;

  while (x) {
    arr.push(dom.remove(targetNode.firstChild));
    x = targetNode.firstChild;
  }

  return arr;
};
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
};
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
};
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
};
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
      var obj = name;

      for (key in obj) {
        console.log("obj:".concat(obj));
        console.log("key:".concat(key, ", value:").concat(obj[key]));
        node.style[key] = obj[key];
      }
    }
  }
}; // 重写节点样式

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
    node.style = "".concat(name, ":").concat(value, ";");
  } else if (arguments.length === 2) {
    var obj = name;

    for (key in obj) {
      node.style[key] = obj[key];
    }
  }
};

dom.class = {
  // 增加节点class
  add: function add(node, className) {
    node.classList.add(className);
  },
  // 删除节点class
  remove: function remove(node, className) {
    node.classList.remove(className);
  },
  // 判断节点是否有class
  has: function has(node, className) {
    node.classList.has(className);
  },
  // 替换
  replace: function replace(node, oldName, newName) {
    node.classList.replace(oldName, newName);
  }
};

dom.on = function (node, eventName, func) {
  node.addEventListener(eventName, func);
};

dom.off = function (node, eventName, func) {
  node.removeEventListener(eventName, func);
}; // 通过选择器,返回一个node


dom.find = function (selector, scope) {
  return (scope || document).querySelectorAll(selector);
}; // 返回父元素


dom.parent = function (node) {
  return node.parentNode;
}; // 返回子元素, 元素节点


dom.children = function (node) {
  return node.children;
}; // 返回兄弟元素,


dom.sibling = function (node) {
  return Array.from(node.parentNode.children).filter(function (n) {
    return n != node;
  });
};

dom.next = function (node) {
  var x = node.nextSibling;

  while (x && x.nodeType === 3) {
    x = x.nextSibling;
  }

  return x;
};

dom.previous = function (node) {
  var x = node.previousSibling;

  while (x && x.nodeType === 3) {
    x = x.previousSibling;
  }

  return x;
};

dom.each = function (nodeList, fn) {
  for (var i = 0; i < nodeList.length; i++) {
    fn.call(null, nodeList[i]);
  }
};

dom.index = function (node) {
  var list = dom.children(node.parentNode);
  var i;

  for (i = 0; i < list; i++) {
    if (node === list[i]) {
      break;
    }
  }

  return i;
};
},{}],"../../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53993" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","dom.js"], null)
//# sourceMappingURL=/dom.1d0b6d56.js.map