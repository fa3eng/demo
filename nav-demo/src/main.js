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

const removeFormart = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '');
}

let render = () => {
    // 每一次render之前先把除了最后一个节点的所有节点删除一下
    $siteList.find('li:not(.last)').remove();


    hashMap.forEach((node, index) => {
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

        $li.on('click', () => {
            window.open(node.url)
        })

        $li.on('click', '.close', (e) => {
            e.stopPropagation() // 阻止冒泡
            hashMap.splice(index, 1);
            render()
        })
    })
}



// 自己先初始化一遍
render();

document.querySelector('.btn-addsite').addEventListener('click', () => {
    let url = window.prompt('你要输入的网址是个啥');

    if (url.indexOf('http') !== 0) {
        url = 'https://' + url;
    }

    hashMap.push({
        logo: url[0],
        logoType: 'text',
        url: url,
    })

    render();
});

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap);
    localStorage.setItem('x', string);
}


$(document).on('keypress', (e) => {
    const {
        key
    } = e;

    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url);
        }
    }
})