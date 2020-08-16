
$(function () {
    /*banner轮播*/
    (function () {
        var banner_box = $('#contents .banner');
        var imgs = $('#contents .banner > ul > li');
        var point_box = $('#contents .banner .points');

        /*根据图片数量 动态生成小点*/
        for(var i = 0 ; i < imgs.length ; i++) {
            var li = document.createElement('li');
            $(point_box).append(li);
        }

        /*获取小圆点li*/
        var lis = $(point_box).children();
        /*给第一个圆点加样式*/
        $(lis[0]).addClass('active')

        /*图片轮播*/
        var timer = null;
        var index = 0;
        timer = setInterval(autoPlay , 2000);
        function autoPlay() {
            if(index < imgs.length-1) {
                /*当前图片出去*/
                $(imgs[index]).animate({'left':-1226 + 'px'});
                /*下一张图片进来*/
                index++;
                imgs[index].style["left"] = 1226 + "px";
                $(imgs[index]).animate({'left':0});
            }else {
                index = 0;
                /*最后一张图片出去，第一张进来*/
                $(imgs[imgs.length-1]).animate({'left':-1226 + 'px'});
                imgs[index].style["left"] = 1226 + "px";
                $(imgs[index]).animate({'left':0});
            }
            /*console.log(index)*/
            pointPlay();
        }

        /*鼠标经过事件 清除和添加计时器*/
        banner_box.hover(function () {
            clearInterval(timer);
        }, function() {
            clearInterval(timer);
            timer = setInterval(autoPlay , 2000);
        });

        /*小圆点样式轮播*/
        function pointPlay() {
            for(var i = 0 ; i < lis.length ; i++) {
                $(lis[i]).removeClass('active');
                $(lis[index]).addClass('active');
            }
        }

        /*点击小圆点,委托li的父级元素绑定事件*/
        var num;
        point_box.on('click' , 'li' ,function() {
            num = $(this).index()
            if(num > index) {
                /*当前图片出去*/
                $(imgs[index]).animate({'left':-1226 + 'px'});
                /*点击的图片进来*/
                imgs[num].style["left"] = 1226 + "px";
                $(imgs[num]).animate({'left':0});
                index = num;
                pointPlay();

            }else if(num < index) {
                /*当前图片出去*/
                $(imgs[index]).animate({'left':1226 + 'px'});
                /*点击的图片进来*/
                imgs[num].style["left"] = -1226 + "px";
                $(imgs[num]).animate({'left':0});
                index = num;

                pointPlay();
            }
        });
    })();

    /*常见问题tab栏切换*/
    (function() {

        /* 隐藏所有 , 默认展示第一个*/
        $("#contents .tab-content .per > ul").hide();
        $("#contents .tab-content .per > ul").eq(0).show();

        $("#contents .tab-list > li").on("click mouseover" , function() {
            /*获取索引*/
            var index = $(this).index();

            $(this).addClass('active').siblings().removeClass('active');

            $("#contents .tab-content .per > ul").hide().eq(index).show();

        });



    })();
});
