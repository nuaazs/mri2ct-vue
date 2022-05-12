module.exports = {
  devServer: {
    host: "0.0.0.0",
    port: 8080,
    https:false,
    allowedHosts: "all",
    proxy: {
        	// 当你vue请求路径中包含/api，那么vue会自动帮你代理请求到你的后端地址
        	// 比如我vue请求的是 '/api/user/getUser'，那么会帮我代理请求到后端地址
            '/api': {
            	// 后端地址
                target: "http://localhost:8176",
                /**
                	官方文档的意思：将主机头的来源更改为目标 URL
                	简单理解就是需不需要代理
                **/
                changeOrigin: true,
                /**
                	重写目标地址，比如我vue请求的是/api/user/getUser
                	经历过重写之后，我们请求的地址是http://localhost:8081/user/getUser
                	这里用的是正则表达式，^符号是用来限制开头
                	意思就是匹配vue请求的开头是否为/api，是的话就进行重写替换
                **/
                pathRewrite: {
                    ["^/api"]: ""
                },
                onProxyReq: function (proxyReq, req, res, options) {
                  if (req.body) {
                    let bodyData = JSON.stringify(req.body);
                    // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
                    proxyReq.setHeader("Content-Type", "application/json");
                    proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
                    // stream the content
                    proxyReq.write(bodyData);
                  }
                }

                
            }
        }
  },
};

