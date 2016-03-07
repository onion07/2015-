
// ****** 后台获取数据 *******

   var App = {

      isBegin : false,
      title2 : ["特等奖","一等奖","二等奖","三等奖"],
      title : ["special","first","second","third"],
      w_total : {
              "special" : 1,//按下空格次数
              "first" : 2,
              "second" : 2,
              "third" : 3,
      },
      w_time : {
              "special" : 0,
              "first" : 0,
              "second" : 0,
              "third" : 0,
      },
      ind : 3,// 对应third 奖项
      _wIndex : 4,//一个空格后，数字 出现 多少组（默认：三等奖，每次4组）
      Data : [001,002,003,004],//默认值
      org_Data : [],
      ss : [],
      init : function () {
          var _ts = this;
          _ts.getData(); 
      }, 
      getData : function () {
          var _ts = this;
          var _isrg = false;
          //获取总人数
          _ts.dataArr();

          // 0，1,2,3 按键事件
          $(document).keyup(function(eve){
              var kcode = eve.keyCode || eve.which;

              if(typeof eve !== 'undefined' && _ts.isBegin === false){

                    if(kcode === 96 || kcode === 48){
                      _ts.Data = [001];
                      $('.wopen').removeClass('cur').eq(3).addClass('cur');
                      $('.prize-box p').removeClass('cur').eq(3).addClass('cur');
                      $('.res').attr('data-umn',1);//改变DOM元素
                      _isrg = true;
                      _ts._wIndex = 1;
                      _ts.ind = 0;//特等奖
                      $('.prize-box img').attr('src','images/prize_1.png');
                    }
                    if(kcode === 97 || kcode === 49){
                      _ts.Data = [001];
                      $('.wopen').removeClass('cur').eq(2).addClass('cur');
                      $('.prize-box p').removeClass('cur').eq(2).addClass('cur');
                      $('.res').attr('data-umn',1);//改变DOM元素
                      _isrg = true;
                      _ts._wIndex = 1;
                      _ts.ind = 1;//一等奖
                      $('.prize-box img').attr('src','images/prize_2.png');
                    }
                    if(kcode === 98 || kcode === 50){
                      _ts.Data = [001,002,003];
                      $('.wopen').removeClass('cur').eq(1).addClass('cur');
                      $('.prize-box p').removeClass('cur').eq(1).addClass('cur');
                      $('.res').attr('data-umn',3);//改变DOM元素
                      _isrg = true;
                      _ts._wIndex = 3;
                      _ts.ind = 2;//二等奖
                      $('.prize-box img').attr('src','images/prize_3.png');

                    }
                    if(kcode === 99 || kcode === 51){
                      _ts.Data = [001,002,003,004];;
                      $('.wopen').removeClass('cur').eq(0).addClass('cur');
                      $('.prize-box p').removeClass('cur').eq(0).addClass('cur');
                      $('.res').attr('data-umn',4);//改变DOM元素
                      _isrg = true;
                      _ts._wIndex = 4;
                      _ts.ind = 3;//三等奖
                      $('.prize-box img').attr('src','images/prize_4.png');
                    }
              }
              if(_isrg === true){
                    _ts.run(_ts._wIndex);
                    _isrg = false;
              }
              return false;
          });
          //传参 ：每次显示多少组数
          _ts.run(_ts._wIndex);

      },
      dataArr : function (){
          var _ts = this;

          // 总共人数
          for(var j = 1; j <= 350 ; j++){ 
            var noF = j.toString().match(/\d?4/g);
             if(!noF){
               _ts.org_Data.push(j);
             }
          }
          //数组下标
          for(var vj = 0; vj < _ts.org_Data.length; vj++){ 
            _ts.ss.push(vj);
            // 随机排序 数组下标
            _ts.ss.sort(function(){return 0.5 - Math.random()});
            // _ts.ss.length = 30;
          }
      },
      run : function (_umn){
          var _ts = this;
          _ts.start(_umn);
          
      },
      getRandom : function (_umn){
          var _ts = this;
          var _umn = _umn;
          var org_ss = null;
          _ts.Data = [];
          
          // 中奖的数字，前面附加 “0” 或者 “00”
          for(var i = 0; i < _umn; i++){
              if(_ts.org_Data[_ts.ss[i]] < 100 && _ts.org_Data[_ts.ss[i]] >= 10){
                _ts.org_Data[_ts.ss[i]] = '0'+_ts.org_Data[_ts.ss[i]];
              }
              else if( _ts.org_Data[_ts.ss[i]] < 10 ){
                _ts.org_Data[_ts.ss[i]] = '00'+_ts.org_Data[_ts.ss[i]];
              }
              //最终的中奖的数字
              _ts.Data.push(_ts.org_Data[_ts.ss[i]]);
          }
              // 删除中过奖的数字【删除已经中奖数字 对应的数组下标来实现】
                _ts.ss.splice(0,_umn);

      },
      start : function (_umn) {
          var _ts = this;

          $(document).keyup(function(eve){

              var kcode = eve.keyCode || eve.which;
              var sTime0 = null;
              // 是空格键，动画没有锁定
              if(typeof eve !== 'undefined' && !_ts.isBegin && kcode === 32){

                    var index_arr = _ts.Data ;
                    var i = 0;
                    var _tt = _ts.title[_ts.ind];
                    var _tt2 = _ts.title2[_ts.ind];
                    var gcookie = _ts.getCookie(_tt);
                    //已经抽过的次数 是否 超过每个奖项目预先设定的次数
                    var ee = _ts.w_total[_tt] > _ts.w_time[_tt] ? true : false;
                    // 某奖项 是否已经抽完
                    var ff = gcookie < _ts.w_total[_tt] ? true : false;
                    //清空
                    $('.res').html('');
                    // 次数增加
                    _ts.w_time[_tt]++;

                    if( ee === true && ff === true){
                          //改变DOM元素
                          $('.res').attr('data-umn',_ts._wIndex);
                          // 获取随机数
                          _ts.getRandom(_ts._wIndex);

                          $(".num").each(function(ia){
                              var _num = $(this);
                              _ts.getResult(index_arr);
                          });
                            // 设置cookie
                          _ts.setCookie(_tt,_ts.w_time[_tt],365);
                    }
                    else if(ff===false){
                          alert("<"+_tt2+">    已经抽完了！");
                          // return false;
                    }
              }
          });
      },
      getResult : function (index_arr) {
          var _ts = this;
          if(_ts.isBegin) return false;
          _ts.isBegin = true;
          $(".num").css('backgroundPositionY',0);

            var sTime2 = null;
            var sTime1 = null; 

            clearTimeout(sTime2);
            $.each(index_arr,function(_i){

                  var _num = $(this);
                  //每隔 8.5秒 执行一次动画
                  sTime2 = setTimeout(function(){
                          //重置动画
                          $(".num").css('backgroundPositionY',0);
                          _ts.render(_i);
                  }, _i * 8500);
            });
      },
      //执行动画
      render : function (i) {

          var sTime1 = null; 
          var u = 265;
          var _ts = this;
          var result = _ts.Data[i];
          var num_arr = (result+'').split('');
          clearTimeout(sTime1);

          $(".num").each(function(index){
              var _num = $(this);
              sTime1 = setTimeout(function(){
                    _num.animate({ 
                          backgroundPositionY: (u*60) - (u*num_arr[index])
                          },{
                            duration: 2000+index*2000,
                            easing: "easeInOutCirc",
                            complete: function(){
                                var count = 2000+index*2000;
                                if(index==3) _ts.isBegin = false;
                                if(count === 6000){
                                    $('.res').append('<span>'+result+'</span>');
                                    var leng = $('.res').find('span').length;
                                    //每次出现多少(4,3,2)组
                                    var umn = $('.res').attr('data-umn');
                                    //如果达到设定的次数，解除动画锁定
                                    var is_end = ( leng % umn === 0 ) ? true : false;
                                    if(is_end){
                                        // 动画动画锁定
                                        _ts.isBegin = false;
                                    }
                                }
                            }
                    });

                }, index * 200);
            });
      },
      //获取cookie
      getCookie : function(c_name){
          var _ts = this;
          if (document.cookie.length>0){
            c_start=document.cookie.indexOf(c_name + "=");
            if (c_start!=-1){ 
              c_start=c_start + c_name.length+1 ;
              c_end=document.cookie.indexOf(";",c_start);
              if (c_end==-1) c_end=document.cookie.length;
              return unescape(document.cookie.substring(c_start,c_end));
              } 
            }
          return ""
      },
      //设定cookie
      setCookie : function(c_name,value,expiredays){
          var _ts = this;
          var exdate=new Date();
          exdate.setDate(exdate.getDate()+expiredays);
          document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
      }
   };
   

   //入口
  $(function(){

      App.init();

  }); 