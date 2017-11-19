$(function () {
  //点击小圆点，切换图片
  var imgHeight = $('.content').height();
  var nowClass = '';
  var lastClass = '';
  var index = 0
  $('#container').on('mousewheel',function (event) {
    // 与 IE 做兼容处理   ie低版本中 event是作为window属性存在的
    var e = event || window.event;
    console.log(e.originalEvent)
    var delta = (e.originalEvent.wheelDelta > 0 ? 1 : -1) || (e.originalEvent.detail > 0 ? -1 : 1);
    if (delta > 0) {  // 滚轮向上
      console.log('上')
      // 滚轮向上的逻辑
      index--;
      if(index<0){
        index =0
      }
      pageMove(index);

    }else if (delta < 0) {
      // 滚轮向下的逻辑
      index++;
      if(index>4){
        index = 4;
        return
      }
      pageMove(index);
    }

    //  取消滚轮的默认行为
    //  firefox: window.event.returnValue = false     ie chormme: e.preventDefault()
    window.event? window.event.returnValue = false : e.preventDefault()

  })
  //给导航绑定点击事件
  $('.nav').on('click',function () {
    index = $(this).index();
    pageMove(index);
  })
  //给小圆点绑定点击事件
  $('.c').on('click',function () {
    index = $(this).index();
    pageMove(index);
  })
  //实现页面滑动
  function pageMove(index) {
    $('.c').removeClass('active')
    $('.c:eq('+index+')').addClass('active')
    $('.nav').removeClass('active');
    $('.nav:eq('+index+')').addClass('active')
    //点击小圆点，滚动到指定的页面
    $('#contentList').css({
      transform:'translateY(-'+imgHeight*index+'px)',
      transition:'0.6s'
    })
    //保存之前页面的class
    lastClass = nowClass;
    $(lastClass).find('.right').removeAttr('style')
    $(lastClass).find('.left').find('.leftItem').removeAttr('style')
    //页面滚动到指定位置后，执行该页面的动画
    setTimeout(function () {
      itemMove(index);
    },600)
  }
  //根据index,给相应页面实现单个动画
  function itemMove(index) {
    nowClass = '.s'+(index+1)

    var x_css = {
      transform:'translateX(0)',
      transition:'0.6s'
    };
    var xy_css = {
      transform:'translate(0,0)',
      transition:'0.6s'
    }
    var y_css = {
      transform:'translateY(0)',
      transition:'0.6s'
    }
    var opacity_css = {
      opacity:1,
      transition:'0.6s'
    }
    switch (index) {
      case 1:
        $(nowClass).find('.right').css(y_css)
        $(nowClass).find('.left').find('.l_1').css(y_css);
        setTimeout(function () {
          $(nowClass).find('.left').find('.l_2').css(y_css);
        },200);
        setTimeout(function () {
          $(nowClass).find('.left').find('.l_3').css(y_css);
        },400)
        break;
      case 2:
        $(nowClass).find('.right').css(x_css)
        $(nowClass).find('.left').find('.leftItem').css(x_css)
        break;
      case 3:
        $(nowClass).find('.right').css(opacity_css)
        $(nowClass).find('.left').find('.leftItem').css(x_css)
        break;
      case 4:
        $(nowClass).find('.right').css(opacity_css)
        $(nowClass).find('.left').find('.leftItem').css(xy_css)
        break;
    }
  }


})
