/**
 * Created by abc on 2020/6/22.
 */

/**/
$(function () {
    //入口 当文档加载完成后执行


   function resize()
   {

   //1. 根据屏幕大小设置显示大/小的轮播图片 -轮播图板块
       /*获取屏幕宽度  选择显示那个尺寸的轮播图片*/
       var windowWidth = $(window).width();
       //判断屏幕属于大还是小
       var isSmallScr = windowWidth < 768;
       //获取每个轮播图片的元素 是多个 DOM数组  遍历
       $('#main-ad > .carousel-inner > .item').each(function (i,v) {
           var $item = $(v);//DOM对象转换成jquery对象
           //根据屏幕大小 为界面上每张轮播图设置背景图 通过data-xx属性获取
           var imgScr = $item.data(isSmallScr ? 'image-xs' : 'image-lg');
           //console.log(imgScr)

           //设置背景图 但小图时若要等比例变化 则需要img标签 大图可用背景图方式
           $item.css('backgroundImage','url('+imgScr+')');
           //小图添加img标签 会层叠掉此时背景图
           if(isSmallScr){
               $item.html('<img src="'+ imgScr +'" alt=""/>');
           }
           else {
               /*大图时清除img标签 也可以$item.empty();*/
               $item.html('');
           }
       });




   //3.控制标签页的标签容器的宽度 -特色推荐板块
       var $ulCont = $('.ul-wapper > .nav-tabs');
       //初始化ul的宽度 因为原本ul有paddingleft值20px  多留一点
       var width = 30;
       //获取ul下每个li 得到数组 遍历
       $ulCont.children().each(function (i,v) {
           //得到每个元素的宽度
           width += v.clientWidth;
       });

       //判断当前ul宽度是否超出了横向屏幕 超出则显示横向滚动条
       if(windowWidth < width){
           //console.log($(window).width())
           //此时width等于所有li的宽度总和
           $ulCont.css('width',width)
               .parent().css('overflow-x','scroll');
       }else {
           $ulCont.css('width','auto')
               .parent().css('overflow-x','null');
       }
   }
    //屏幕尺寸改变事件
    /*$(window).on('resize', function () {
        resize();
    });*/
    //绑定屏幕尺寸改变事件          触发此事件(让页面打开的时候就触发一次)
    $(window).on('resize',resize).trigger('resize');


//2、手指滑动轮播图 -轮播图板块
    //原理：获取手指在轮播图元素上的滑动方向  向左则播放下一张  向右播放上一张
    //可用bootstrap原生的js方法：carousel()实现'prev'或者'next'
    //获取要滑动的轮播图容器
    var $carousels = $('.carousel');
    var startX, endX;
    var offset = 50;//判断有无方向变化的界限值
    //注册滑动事件
    $carousels.on('touchstart' , function (e) {
        startX = e.originalEvent.touches[0].clientX;
        //console.log(startX)
    });
    $carousels.on('touchmove' , function (e) {
        //手指触摸移动事件 得到移动的坐标 最后一个即离开瞬间的坐标
        //变量重复赋值 得到最后一个值
        endX = e.originalEvent.touches[0].clientX;
        //console.log(endX)
    });
    //手指离开事件  判断方向
    $carousels.on('touchend' , function (e) {
        //当移动差值大于一个值是 认为有方向变化
        var distance = Math.abs(endX - startX);
        if(distance > offset) {
            //判断左右方向
            $(this).carousel(endX > startX ? 'prev' : 'next');
        }
    });


//4、初始化tooltip插件 鼠标移上元素有提示文字框-产品模块
    $('[data-toggle="tooltip"]').tooltip();

//3.控制标签页的标签容器的宽度
// 也可不写在resize函数里 因为主要是给手机的 写在里面是动态获取窗口宽
 /* var $ulCont = $('.ul-wapper > .nav-tabs');
    //初始化ul的宽度 因为原本ul有paddingleft值20px  多留一点
    var width = 30;
    //获取ul下每个li 得到数组 遍历
    $ulCont.children().each(function (i,v) {
        //得到每个元素的宽度
        width += v.clientWidth;
    });
    //判断当前ul宽度是否超出了横向屏幕 超出则显示横向滚动条
    if($(window).width() < width){
        //console.log($(window).width())
        //此时width等于所有li的宽度总和
        $ulCont.css('width',width)
            .parent().css('overflow-x','scroll');
    }*/


//4 、tab栏切换  -- 新闻列表板块
    var newsTit = $('#newsList .news-title');
    //a点击注册事件
    $('#newsList .nav-pills a ').on('click' , function () {
        //获取当前点击元素
        var $this = $(this);
        //获取对应的title值即 data-title的值
        var title = $this.data('title');
        //将他给新闻标题
        newsTit.text(title);

    });



});
