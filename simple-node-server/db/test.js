const { request } = require("http");

const fs = require('fs');

const userString = fs.readFileSync('./users.json').toString();
const userArray = JSON.parse(userString);
console.log(JSON.stringify(userArray));

// 写数据

// const user3 = {"id": "3", "name": "mmm", "password": "dfdsfd"};
// userArray.push(user3);
// fs.writeFileSync('./users.json', JSON.stringify(userArray));