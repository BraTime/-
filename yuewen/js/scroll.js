/**
 * Created by abc on 2019/8/6.
 */
//封装的scroll函数
function scroll(){
    //判断3种浏览器的支持

    //ie9及更高和最新浏览器支持
    if(window.pageXOffset != null)//一打开浏览器，未卷动，值为0，所以不能写if(window.pageXOffset）等价于if(0)
    {
        return {//return后必须有东西，所以{不能换行写
            left:window.pageXOffset,//意义同var json1 = {left:window.pageXOffset,top:window.pageYOffset}
            top:window.pageYOffset//return可以直接返回，不用定义变量l
        }
    }
    //有声明DOCTYPE的普通浏览器
    else if(document.compatMode == "css1compat")//判断是否已经声明，true表示声明了
    {
        return {
            left: document.documentElement.scrollLeft,
            top: document.documentElement.scrollTop
        }
    }
    //没有声明的浏览器
    return{
        left:document.body.scrollLeft,
        top:document.body.scrollTop
    }
}
