$(function () {
    //入口 当文档加载完成后执行

    function resize() {
//1. 根据屏幕大小设置显示大/小的轮播图片 -轮播图板块
        /*获取屏幕宽度  选择显示那个尺寸的轮播图片*/
        var windowWidth = $(window).width();
        //判断屏幕属于大还是小
        var ismdScr = windowWidth < 992;
        //获取每个轮播图片的元素 是多个 DOM数组  遍历
        $('#main-ad > .carousel-inner > .item').each(function (i, v) {
            var $item = $(v);//DOM对象转换成jquery对象
            //根据屏幕大小 为界面上每张轮播图设置背景图 通过data-xx属性获取
            var imgScr = $item.data(ismdScr ? 'image-xs' : 'image-lg');
            //console.log(imgScr)

            //设置背景图 但小图时若要等比例变化 则需要img标签 大图可用背景图方式
            $item.css('backgroundImage', 'url(' + imgScr + ')');
            //小图添加img标签 会层叠掉此时背景图
            if (ismdScr) {
                $item.html('<img src="' + imgScr + '" alt=""/>');
            }
            else {
                /*大图时清除img标签 也可以$item.empty();*/
                $item.html('');
            }
        });

// 推荐信息模块
        var prolis = document.querySelectorAll('#products .info-con li');
        if(!ismdScr){
            var max = 0 , arr = [];
            for(var i = 0 ; i < prolis.length-3; i++){
                if(prolis[i].offsetHeight>= max){
                    //console.log("1:"+prolis[i].offsetHeight);
                    max = prolis[i].offsetHeight;
                    //console.log("2:"+max)
                    arr.push(i)
                }
                prolis[i].style.height =max + "px";
            }
        }
        else {
            for(var i = 0 ; i < prolis.length-3; i++) {
                prolis[i].style.height = null;
            }
        }

// 新闻与活动模块
        var hei = $('#news .row > div > .thumbnail').height();
        if(!ismdScr){
            $('#news .row > .right-txtbox').css('height',hei + 'px');
            $('#news .row > .right-txtbox .cap-text > a').css('margin',"0");
        }else {
            $('#news .row > .right-txtbox').css('height',windowWidth/3 + "px");
            $('#news .row > .right-txtbox .cap-text > a').css('margin', parseInt(windowWidth/50)+ "px 0");
        }
    }

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
});