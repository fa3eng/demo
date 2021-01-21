var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
    process.exit(1)
}

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) {
        queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
    }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    /******** 从这里开始看，上面不要看 ************/

    console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)
    // 获取文件路径
    let filePath = (path === '/' ? 'index.html' : path);
    // 获取文件的类型
    const fileType = filePath.substring(filePath.indexOf('.'));

    const fileTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.json': 'text/json',
        '.xml': 'text/xml',
        '.jpg': 'image/jpeg',
        '.png': 'image/png'
    }

    if(filePath === '/sign_in' && method === 'POST'){// 登录
        response.setHeader('Contet-Type', 'text/html;charset=utf-8');
        const arr = new Array();
        // 监听请求, 并且将数据存入数组中
        request.on('data', (chunk) => {
            arr.push(chunk);
        });

        // 读取db中的数据
        const userString = fs.readFileSync('./db/users.json').toString();
        const userArr = JSON.parse(userString);

        request.on('end', () => {
            // 读取表单传上来的数据
            const string = Buffer.concat(arr).toString();
            const obj = JSON.parse(string);

            // 对比数据
            const user = userArr.find((user) => {
                return user.name === obj.name && user.password === obj.password;
            });

            if(user === undefined){
                response.statusCode = 400;
                response.end('{"errorCode": 4001}');
            } else{
                response.statusCode = 200;
                // 设置cookie
                response.setHeader('Set-Cookie', 'logined=1');
                response.end();
            }

        });
    } else if (filePath === '/register' && method === 'POST') {
        response.setHeader('Contet-Type', 'text/html;charset=utf-8');
        const arr = new Array();
        // 监听请求
        request.on('data', (chunk) => {
            arr.push(chunk);
        });

        // 读取数据
        const userString = fs.readFileSync('./db/users.json').toString();
        const userArr = JSON.parse(userString);
        const nowId = userArr[userArr.length - 1].id;
        
        request.on('end', () => {
            const string = Buffer.concat(arr).toString();
            const obj = JSON.parse(string);

            // 写数据
            const newUser = {"id": Number(nowId) + 1, "name": obj.name, "password": obj.password};

            // const user3 = {"id": 3, "name": "mmm", "password": "dfdsfd"};
            userArr.push(newUser);
            const jsonData =  JSON.stringify(userArr);
            fs.writeFileSync('./db/users.json', jsonData);

            response.end();
        });

    } else {

        response.setHeader('Content-Type', `${fileTypes[fileType] || 'text/html'};charset=utf-8`);

        let content;
        try {
            response.statusCode = 200;
            content = fs.readFileSync(`./public/${filePath}`);
        } catch (error) {
            response.statusCode = 404;
            content = '文件不存在';
        }
        response.write(content);
        response.end();
    }



    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)