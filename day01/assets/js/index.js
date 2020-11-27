$(function () {
  getUserInfo();
})

function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: 'my/userinfo',
    // 请求头   headers：就是
    headers: {
      Authorization: localStorage.getItem('token') || ''
    },
    success: function (res) {
      console.log(res);
      if (res.status != 0) {
        return layui.layer.msg('获取用户信息失败');
        console.log('获取用户信息失败');
      }
      renderAvatar(res.data)

    }
  });
};

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
}