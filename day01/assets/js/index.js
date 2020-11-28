$(function () {
  getUserInfo();
  var layer = layui.layer;

  // 点击按钮，实现退出功能
  $('#btnLogout').on('click', function () {
    layer.confirm('确认退出登录？', { icon: 3, title: '提示' }, function (index) {
      //do something

      // 1. 清空本地存储中的token
      // 2. 跳转到登录页面
      localStorage.removeItem('token')

      // location.assign('/login.html');
      location.href = './login.html';

      layer.close('ok');
    });

  });


});


// 获取用户的基本信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: 'my/userinfo',
    // 请求头   headers：就是请求配置对象

    success: function (res) {
      console.log(res);
      if (res.status != 0) {
        return layui.layer.msg('获取用户信息失败');
        console.log('获取用户信息失败');
      }
      renderAvatar(res.data)

    },

    // 不管请求成功还是失败，最终都会调用complete函数
    // 请求失败则执行该代码，如果成功则不执行
    complete: function (res) {
      if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
        // 强制将数据清空
        localStorage.removeItem('token');
        // 跳转到登录页面
        location.href = './login.html';
      }
    }
  })
};
// window.getUserInfo=getUserInfo;

// 渲染用户的头像
function renderAvatar(user) {

  var name = user.nickname || user.username;

  $('#welcome').html('欢迎&nbsp;&nbsp;' + name);

  if (user.user_pic != null) {
    // 渲染图片头像
    $('.layui-nav-img').attr('src', user.user_pic).show();
    $('.text-avatar').hide();
  } else {
    // 渲染文本头像
    $('.layui-nav-img').hide();

    var first = name[0].toUpperCase();  // 获取用户名的第一个字母并大写

    $('.text-avatar')
      .html(first)
      .show();
  }
};


