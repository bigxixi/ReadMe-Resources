//图层标记控制数字增长脚本by西西，有问题欢迎联系xixi@bigxixi.com
//_______________________________________________________
var ly = app.project.activeItem.layers.addText("数字变化"); //在当前合成添加一个文字层
var t = app.project.activeItem.time;//获取当前时间轴位置
var tDuration = 1;//初始时间间隔，生成后可以通过移动图层标记来改变
//设置一个变量存储表达式
var exp =   '//获取两个标记的时间\n' + 
            'var t1 = marker.key(1).time;\n' + 
            'var t2 = marker.key(2).time;\n' + 
            '//设置条件，当时间小于等于标记1时文本显示“0 %”，大于等于标记2时显示“100 %”\n' + 
            '//当时间在俩标记中间时做一个数值映射，将这个时间区间映射到（0，100）内\n' + 
            'if(time > t1 && time< t2){\n' + 
            '    //时间映射函数，详见：\n' + 
            '    //https://helpx.adobe.com/cn/after-effects/using/expression-language-reference.html#interpolation_methods_expression_reference\n' + 
            '    var m = ease(time,t1,t2,0,100);\n' + 
            '    //对映射结果取整，Math.floor()是向下取整，Math.round()是四舍五入，Math.ceil()是向上取整\n' + 
            '    var v = Math.floor(m);\n' + 
            '    value = v + " %";\n' + 
            '}else if(time<=t1){\n' + 
            '    value = 0 + " %";\n' + 
            '}else value = 100 + " %";';
//创建2个标记
var p1= new MarkerValue("0%");
var p2= new MarkerValue("100%");
//将标记放到文本图层上
ly.marker.setValueAtTime(t,p1);
ly.marker.setValueAtTime(t+tDuration,p2);
//最后，把刚才的表达式塞给文本图层的“源文本”属性里，大功告成~
ly.property("ADBE Text Properties")("ADBE Text Document").expression = exp;
