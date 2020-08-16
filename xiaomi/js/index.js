
$(function () {
    /*banner轮播*/
    (function () {
        var banner_box = $('#home-content .home-top');
        var imgs = $('#home-content .home-top-wrapper .wrapper-slider');
        var prev = $('#home-content .home-top-prev');
        var next = $('#home-content .home-top-next');
        var point_box = $('#home-content .home-top-point');


        /*根据图片数量 动态生成小点*/
        for(var i = 0 ; i < imgs.length ; i++) {
            var li = document.createElement('li');
            $('#home-content .home-top-point > ul').append(li);
        }
        /*给第一个li加样式*/
        $('#home-content .home-top-point > ul > li:first').toggleClass('active');

        /*获取小圆点li*/
        var lis = $('#home-content .home-top-point > ul > li');

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


        /*点击左右按钮*/
        prev.on('click' , function() {
            autoPlay();
        });
        next.on('click' , function() {
            if(index > 0) {
                /*当前图片出去*/
                $(imgs[index]).animate({'left':1226 + 'px'});
                /*下一张图片进来*/
                index--;
                imgs[index].style["left"] = -1226 + "px";
                $(imgs[index]).animate({'left':0});
            }else {
                index = imgs.length-1;
                /*第一张出去，最后一张图片进来*/
                $(imgs[0]).animate({'left':1226 + 'px'});
                imgs[index].style["left"] = -1226 + "px";
                $(imgs[index]).animate({'left':0});
            }
            pointPlay();
        });

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

    /*小米闪购*/
    (function () {
        /*倒计时*/
        var spans = $('#main-content .countdown > span');
        var h = spans[0];
        var m = spans[2];
        var s = spans[4];

        var days,hours,mintues,seconds;

        var timer = null;
        timer = setInterval(function () {
            countDown('2020-8-20 20:00:00')
            $(h).html(hours);
            $(m).html(mintues);
            $(s).html(seconds);
        });

        /*倒计时函数*/
        function countDown(time){
            var nowTime = +new Date();
            var inputTime = +new Date(time);
            if(inputTime < nowTime){//倒计时结束
                return false;
            }
            var times = (inputTime - nowTime)/1000;//因为是毫秒
            days = parseInt(times / 60 / 60 / 24);
            hours = parseInt(times / 60 / 60 % 24);
            mintues = parseInt(times / 60 % 60);
            seconds = parseInt(times % 60);
            days = days < 10 ? '0' + days : days;
            hours = hours < 10 ? '0' + hours : hours;
            mintues = mintues < 10 ? '0' + mintues : mintues;
            seconds = seconds < 10 ? '0' + seconds : seconds;
            //return days + '天' + hours + '时' + mintues + '分' + seconds + '秒';
        }

        /*轮播图*/
        var ul_box = $('#main-content .box-bd-pro > ul')[0];
        var lis = $(ul_box).children('li');
        var liWidth = lis[0].offsetWidth + 14;//每个li有14px,margin-left
        var ul_width = liWidth * lis.length + "px";
        $(ul_box).width(ul_width);
        var prev = document.querySelector('.sekil-box-prev');
        var next = document.querySelector('.sekil-box-next');

        /*ul盒子轮播*/
        var timer = null;
        var index = 0;
        timer = setInterval(autoPlay , 2000);
        function autoPlay() {
            index++;
            if(index >= lis.length-4) {
                index = 1;
                ul_box.style.left = '0';
            }
            $(ul_box).animate({'left':-liWidth * index + "px"},"slow");
        }

        /*鼠标经过事件 清除和添加计时器*/
        $(ul_box).parent().hover(function () {
            clearInterval(timer);
        }, function() {
            clearInterval(timer);
            timer = setInterval(autoPlay , 2000);
        });

        /*点击左右按钮*/
        $(prev).click(function() {
            if(index <= 0) {
                $(prev).attr('disabled','disabled')
            }
            index--;
            $(ul_box).animate({'left':-liWidth * index + "px"});
        });
        $(next).click(function() {
            if(index >= lis.length-4) {
                $(next).attr('disabled','disabled')
            }
            index++;
            $(ul_box).animate({'left':-liWidth * index + "px"});
        });
    })();

});
