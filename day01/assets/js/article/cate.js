$(function () {
  initArtCateList();
  function initArtCateList() {
    $.ajax({
      method: 'GET',
      url: 'my/article/cates',
      success: function (res) {
        console.log(res);
        if (res.status != 0) {
          return layui.layer.msg('获取数据失败!')
        }
        // 渲染模板
        var str = template('tpl-table', res);
        // console.log(str);
        $('tbody').html(str);
      }
    })
  }


  // 【添加类别】
  // 为添加类别按钮绑定点击事件
  var indexAdd = null;
  $('#btnAdd').on('click', function () {

    // 在按钮的点击事件中，通过 layui.layer.open() 【展示】弹出层 
    indexAdd = layui.layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#dialog-add').html()
    })
    console.log(indexAdd);     // 为什么这里获取的索引号为 1 ？？？？？

  })

  // 利用事件委托（冒泡原理）给 body  提交事件
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: 'my/article/addcates',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status != 0) {
          return layui.layer.msg('新增分类提交失败!')
        }
        initArtCateList();
        layui.layer.msg('新增分类成功!');
        // 利用索引，通过 layui.layer.close() 【关闭】对应的弹出层
        layui.layer.close(indexAdd)
      }

    })
  })


  // 【编辑事件】
  // 通过事件委托（冒泡原理） 为 btn-edit 按钮绑定点击事件
  var indexEdit = null;
  $('tbody').on('click', '.btn-edit', function () {

    // 在按钮的点击事件中，通过 layui.layer.open() 【展示】弹出层 
    indexEdit = layui.layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#dialog-edit').html()
    })

    // 在展示弹出层之后，根据 id 的值发起请求获取文章分类的数据，并填充到表单中
    var id = $(this).attr('data-id')
    // 发起请求获取对应分类的数据
    $.ajax({
      method: 'GET',
      url: 'my/article/cates/' + id,
      success: function (res) {
        if(res.status!=0) {
          return layui.layer.msg('获取数据失败！')
        }
        console.log(res);
        layui.form.val('form-edit', res.data)  // 点击当前的编辑按钮时，获取当前的相关数据，分别填充到弹出的form表单中
      }
    })
  })

  // 通过代理的形式，为修改分类的表单绑定 submit 事件：
  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault();
    // 发送ajax请求，，将更改好的数据提交给服务器
    $.ajax({
      method: 'POST',
      url: 'my/article/updatecate',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status != 0) {
          return layui.layer.msg('更新分类数据失败!')
        }

        layui.layer.msg('更新分类成功!');
        // 利用索引，通过 layui.layer.close() 【关闭】对应的弹出层
        layui.layer.close(indexEdit)
        initArtCateList();
      }

    })
  })


  // 【删除事件】
  // 通过事件委托（冒泡原理） 为 btn-delete 按钮绑定点击事件
  var indexDelete = null;
  $('tbody').on('click', '.btn-delete', function () {
    
    // 在展示弹出层之后，根据 id 的值发起请求获取文章分类的数据，并填充到表单中
    var id = $(this).attr('data-id');
    console.log(id);

    // 提示用户是否要删除
    layer.confirm('确认删除?', { icon: 3, title: '提示' },
    // 发起请求获取对应分类的数据
    function(index){
      $.ajax({
        method: 'GET',
        url: 'my/article/deletecate/' + id,
        success: function (res) {
          if(res.status!=0) {
            return layui.layer.msg('删除数据失败！')
          }
          layui.layer.msg('删除数据成功!');
          initArtCateList();
        }
      })
    }
    )
  })

  // 通过代理的形式，为修改分类的表单绑定 submit 事件：
  $('body').on('submit', '#form-delete', function (e) {
    e.preventDefault();
    // 发送ajax请求，，将更改好的数据提交给服务器
    $.ajax({
      method: 'POST',
      url: 'my/article/updatecate',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status != 0) {
          return layui.layer.msg('更新分类数据失败!')
        }

        layui.layer.msg('更新分类成功!');
        // 利用索引，通过 layui.layer.close() 【关闭】对应的弹出层
        layui.layer.close(indexDelete)
        initArtCateList();
      }

    })
  })  




})