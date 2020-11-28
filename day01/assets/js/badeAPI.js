// 注意：每次调用 $.get() 或 $.post() 时，

// 每次发送 ajax之前，都会经过这个函数处理，，请求拦截
$.ajaxPrefilter(function(options){
  options.url = 'http://ajax.frontend.itheima.net/' + options.url;

  // 统一为有权限的接口，设置header请求头
  if(options.url.indexOf('my/') != -1) {   // 表示包含了该地址时，执行下面代码
    options.headers =  {
      Authorization: localStorage.getItem('token') || ''
    }
  }


  // 全局统一挂载complete回调函数
  // options.complete = function(res){
  //   if(res.responseJSON.status == 1 && res.responseJSON.message == '身份验证失败！'){
  //     // 强制将数据清空
  //     localStorage.removeItem('token');
  //     // 跳转到当前页面，
  //     location.href = '/login.html';
  //   }
  // }
  
  console.log(options);
  console.log(options.url);
}); 