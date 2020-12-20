const $siteList = $('.siteList');
const $btnList = $('.btn-list');

const x = localStorage.getItem('x');
const xObject = JSON.parse(x);

const hashMap = xObject || [{
        logo: 'B',
        logoType: 'text',
        url: 'https://www.bilibili.com'
    },
    {
        logo: 'B',
        logoType: 'text',
        url: 'https://www.bilibili.com',
    }
]



// 把url的格式改成我们需要的
const removeFormart = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '');
}

let render = () => {
    // 每一次render之前先把除了最后一个节点的所有节点删除一下
    $siteList.find('li:not(.btn-list)').remove();


    hashMap.forEach((node, index) => {
        // 遍历哈希表中存下的值
        const $li = $(`
        <li>
                <div class="site">
                    <div class="logo">
                        ${removeFormart(node.url)[0]}
                    </div>
                    <div class="link">
                        ${removeFormart(node.url)}
                    </div>

                    <div class="close">
                        <svg class="icon-close">
                            <use xlink:href="#icon-close"></use>
                        </svg>
                    </div>

                </div>
        </li>
        `).appendTo($siteList);
        $btnList.insertAfter($li);

        // 点击跳转
        $li.on('click', () => {
            window.open(node.url)
        })

        // 关闭
        $li.on('click', '.close', (e) => {
            e.stopPropagation() // 阻止冒泡
            hashMap.splice(index, 1);
            console.log(hashMap);
            render();
        })
    })
}

document.addEventListener('keypress', (e) => {
    const {
        key
    } = e;

    // 判断一下, 如果是
    if (e.target !== document.querySelector('#searchInput')) {
        for (let i = 0; i < hashMap.length; i++) {
            if (hashMap[i].logo.toLowerCase() === key) {
                window.open(hashMap[i].url);
            }
        }
    }

});


// 添加网址之前, 自己先初始化一遍
render();
document.querySelector('.btn-addsite').addEventListener('click', () => {
    let url = window.prompt('你要输入的网址是个啥');

    if (url.indexOf('http') !== 0) {
        url = 'https://' + url;
    }

    hashMap.push({
        logo: removeFormart(url)[0],
        // logo: url[0],
        logoType: 'text',
        url: url,
    });

    render();
});


// 在离开该页面的时候储存
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap);
    localStorage.setItem('x', string);
}