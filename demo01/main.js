
document.body.addEventListener('touchmove', function (e) {
    e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
}, { passive: false }); //passive 参数不能省略，用来兼容ios和android

let n = 0;
let style = document.querySelector('#style');
let html = document.querySelector('#html');
let string = `/*
你好,
我是方阿森,
一个学生,
想成为前端程序员,
现在的背景颜色太亮了,我来给个灰色
*/

body{
    background-color: #dfe1e5;
}

/*
现在我要在我页面的右边画一个太极的图案
看好了!
*/

/*
我先创建一个圆形出来
*/

#tai_ji {
    position: relative;
    width: 300px;
    height: 300px;
    border-radius: 50%;
}
  
/*
现在我把这个圆的背景色改一下
*/

#tai_ji {

    background: rgb(0,0,0);
    background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(255,255,255,1) 50%, rgba(255,255,255,1) 100%);
}

/*
现在我给它添加两个伪元素
让这个两个伪元素放在他上面
*/

#tai_ji::after {
    position: absolute;
    content: '';
    display: block;
    width: 150px;
    height: 150px;
  
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
  
    background: rgb(255,255,255);
    background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 25%, rgba(0,0,0,1) 25%);
  
  }
  
  #tai_ji::before {
    position: absolute;
    content: '';
    display: block;
    width: 150px;
    height: 150px;
  
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
  
    background: rgb(0,0,0);
    background: radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(255,255,255,1) 25%);
  
}

/*
ok , 大功告成了!👏
*/
`;

let string2 = '';

let step = () => {
    setTimeout(() => {

        if (string[n] === '\n') {
            string2 = string2 + '<br>';
        } else if (string[n] === ' ') {
            string2 = string2 + '&nbsp';
        } else {
            string2 += string[n];
        }

        html.innerHTML = string2;
        style.innerHTML = string.substring(0, n);
        window.scrollTo(0, 99999);
        html.scrollTo(0, 99999);
        if (n + 1 < string.length) {
            n = n + 1;
            step();
        }

    }, 1);
}

step();
