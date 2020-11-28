$(function () {
  // var layer = layui.layer;
  var form  = layui.form;
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称的长度在1-6之间!'
      }
    }
  });

  initUserInfo();
  function initUserInfo() {
    $.ajax({
      method: 'GET',
      url: 'my/userinfo',
      success: function (res) {
        if (res.status != 0) { 
          return layer.msg('获取用户信息失败!')
        }
        console.log(res);

        // 调用form.val() 快速为表单赋值
        form.val('formUserInfo', res.data);


        // jQuery写法
        // $('#username').val(res.data.username);
        // $('#nickname').val(res.data.nickname);
        // $('#email').val(res.data.email);
      }
    })
  }

  // 重置表单的数据
  $('#btnReset').on('click', function (e) {
    e.preventDefault();
    initUserInfo();
  })

  // 监听表单的提交事件
  $('.layui-form').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: 'my//userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status != 0) {
          return layer.msg('更新用户信息失败！')
        }
        layer.msg('修改用户信息成功');

        // 从页面中，采取调用父页面的方法，重新渲染用户的头像和用户的信息   
        window.parent.getUserInfo();   // window 这个窗口指的是表单所在区域的窗口，
      }
    })
  })












})