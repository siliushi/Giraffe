# Giraffe    
Giraffe是对socket.io进行了封装，方便用户的使用。支持AMD和CMD模式，同样适用在node.js。在ie7及以下要引入json2.js。    
    
# Install    
+ in node.js environment    
```    
npm install socket-giraffe    
```    
+ in your html, you just do like this        
```    
<script src="giraffe.min.js"></script>         
```    
+ or you use requireJs          
```    
define(["giraffe"], function () {       
	// your code       
});       
```      
+ or maybe you use seaJs      
```        
seaJs.use('giraffe');       
``` 

# Example   
```
// 初始化socket参数     
var Giraffe = new Giraffe({server: 'http://127.0.0.1:8080',autoReconnect: true});     
Giraffe.init(function (re) {     
    if (re) {     
        console.log('你已成功连接到消息服务器');     
    } else {     
     
    }     
});     
     
// 发布消息     
Giraffe.publish({data: 'test'}, function(re) {     
	if(re) {     
		console.log('发布消息成功！');     
	} else {     
		console.log('发布消息失败！');     
	}     
});     
        
// 接收消息        
Giraffe.receive(function(res) {        
	console.log('publish 返回消息：' + res);        
});         
     
// 直接回调   
Giraffe.publication({data: 'test'}, function(res) {   
	console.log('publication 回调：' + res);   
});   
```    

# Build  
folder of build    
```
npm intall    
gulp    
```    


# Attention   
If you want add your message type, you can add method in the folder of src/giraffe.js. Then, build the file.    


# Release     
version: 1   
 + init giraffe and common resolve.    
 + add methods of publish & receive & publication.   
