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
