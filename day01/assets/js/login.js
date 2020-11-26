$(function(){
  $('#link-reg').on('click',function(){
    $('.login-box').hide();
    $('.reg-box').show();
  });


  $('#link-login').on('click',function(){
    $('.login-box').show();
    $('.reg-box').hide()
  });

  // 从layui 中获取form对象
  var form = layui.form;
  var layer = layui.layer;
  // 通过 form.verify() 函数自定义效验规则
  form.verify({
    // 自定义pwd的校验规则
    pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
    repwd:function(value){
      // 形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的值，将两个值进行比较
      // 两个值如果不一致，直接返回一个 结果
      var pwd = $('.reg-box [name=password]').val();
      if(pwd != value) {
        return '两次密码不一致';
      }
    }
  });

  $('#formReg').on('submit',function(e){
    e.preventDefault();
    $.ajax({
      type:'POST',
      url:'api/reguser',
      data:{
        username:$('#formReg [name=username]').val(),
        password:$('#formReg [name=password]').val(),
      },
      success:function(res){
        if(res.status !=0) {
          return layer.msg(res.message);
        }
        console.log(res);
        layer.msg('注册成功,请登录！');
        $('#link_login').click();
      },
    });
  });

  $('#form_login').submit(function(e){
    e.preventDefault();
    $.ajax({
      type:'POST',
      url:'api/login',
      data:$(this).serialize(),
      success:function(res){
        if(res.status!=0) {
          return layer.msg('登录失败！')
        }
        layer.msg('登录成功')
        // 将登录成功得到的 token 字符串，保存到locStorage中
        console.log(res.token);

        localStorage.setItem('token',res.token);
        location.href = './index.html'
      }
    });
  });


})


