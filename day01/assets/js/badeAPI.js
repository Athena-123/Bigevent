// 注意：每次调用 $.get() 或 $.post() 时，

// 每次发送 ajax之前，都会经过这个函数处理，，请求拦截
$.ajaxPrefilter(function(options){
  options.url = 'http://ajax.frontend.itheima.net/' + options.url;
  console.log(options);
  console.log(options.url);
}); 