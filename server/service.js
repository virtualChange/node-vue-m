// //service.js
// const path = require('path');
// const nodeWindow = require('node-windows');
// const Service = nodeWindow.Service;

// let svc = new Service({
//     name: "node_database", //名称
//     description: "接口", //描述
//     script: path.resolve("./index.js"), //node执行入口文件
//     nodeOptions: ["--harmony", "--max_old_space_size=4096"],
// });

// svc.on("install", function () {
//     svc.start();
//     if (svc.exists) {
//         console.log('服务安装成功')
//     }
// });

// svc.install();


var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
    name: 'Hello World',
    description: 'The nodejs.org example web server.',
    script: 'E:\\porject\\node-vue-m\\server\\index.js',
    nodeOptions: [
        '--harmony',
        '--max_old_space_size=4096'
    ]
    //, workingDirectory: '...'
    //, allowServiceLogon: true
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install', function () {
    svc.start();
    if (svc.exists) {
        console.log('服务安装成功')
    }
});

svc.install();