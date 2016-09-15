$(function() {
	//城市切换
	(function() {
		var oHeader = $('#header');
		var oCity = $('.city');
		var cityItems = $('.city a');
		var oLastCity = $(cityItems[0]);
		cityItems.each(function(index) {
			$(this).click(function() {
				$(this).addClass('active');
				oLastCity.removeClass('active');
				oLastCity = $(this);
			});
		});
	})();

	// 切换搜索框
	(function() {
		var menuItems = $('#menu li');
		var oText = $('#search').find('.text');
		var arrText = [
			'例如：荷棠鱼坊烧鱼 或 樱花日本料理',
			'例如：昌平区育新站龙旗广场2号楼609室',
			'例如：万达影院双人情侣券',
			'例如：东莞出事了，大老虎是谁？',
			'例如：北京初春降雪，天气变幻莫测'
		];
		var oLastMenu = $(menuItems[0]);

		var iNow = 0;

		oText.val(arrText[iNow]);

		menuItems.each(function(index) {
			$(this).click(function() {
				$(this).addClass('active');
				oLastMenu.removeClass('active').addClass('gradient');
				oLastMenu = $(this);
				iNow = index;
				oText.val(arrText[iNow]);
			});
		});

		oText.focus(function() {
			if ($(this).val() == arrText[iNow]) {
				$(this).val('');
			}
		});
		oText.blur(function() {
			if ($(this).val() == '') {
				oText.val(arrText[iNow]);
			}
		});
	})();


	// 最新文章弹性滑动
	(function() {
		var oUpdate = $('.update');
		var oUpdateList = oUpdate.find('ul');
		var iH = 0;
		var arrData = [{
			'name': '萱萱',
			'time': 4,
			'title': '那些灿烂华美的瞬间'
		}, {
			'name': '畅畅',
			'time': 5,
			'title': '广东3天抓获涉黄疑犯'
		}, {
			'name': 'CC',
			'time': 6,
			'title': '国台办回应王郁琦'
		}, {
			'name': '兰兰',
			'time': 7,
			'title': '那些灿烂华美的瞬间'
		}, {
			'name': '倩倩',
			'time': 8,
			'title': '国内哪些地方最值得去旅游'
		}, {
			'name': '洋洋',
			'time': 9,
			'title': '广东3天抓获涉黄疑犯'
		}, {
			'name': '萱萱',
			'time': 10,
			'title': '国台办回应王郁琦'
		}, {
			'name': '畅畅',
			'time': 11,
			'title': '那些灿烂华美的瞬间'
		}];
		var str = '';
		var oBtnUp = $('#up-btn');
		var oBtnDown = $('#down-btn');
		var iNow = 0;
		var timer = null;

		for (var i = 0; i < arrData.length; i++) {
			str += '<li><a href="#"><strong>' + arrData[i].name + '</strong> <span>' + arrData[i].time + '分钟前</span> 写了一篇新文章：' + arrData[i].title + '…</a></li>';
		}
		oUpdateList.html(str);

		iH = oUpdateList.find('li').height();

		oBtnUp.click(function() {
			doMove(-1);
		});
		oBtnDown.click(function() {
			doMove(1);
		});

		oUpdate.hover(function() {
			clearInterval(timer);
		}, autoPlay);

		function autoPlay() {
			timer = setInterval(function() {
				doMove(-1);
			}, 3500);
		}
		autoPlay();

		function doMove(num) {
			iNow += num;
			if (Math.abs(iNow) > arrData.length - 1) {
				iNow = 0;
			}
			if (iNow > 0) {
				iNow = -(arrData.length - 1);
			}
			oUpdateList.stop().animate({
				'top': iH * iNow
			}, 2200, 'elasticOut');
		}
	})();

	//options 选项卡切换
	(function() {
		fnTab($('.tab-nav1').eq(0), $('.shop .list'), 'click');
		fnTab($('.tab-nav1').eq(1), $('.map img'), 'click');
		fnTab($('.tab-nav2').eq(0), $('.answer .content-list'), 'mouseover');
		fnTab($('.tab-nav2').eq(1), $('.coupons .content-list'), 'mouseover');

		function fnTab(oNav, aCon, sEvent) {
			var elems = oNav.children();
			aCon.hide().eq(0).show();

			elems.each(function(index) {

				$(this).on(sEvent, function() {
					elems.removeClass('active').addClass('gradient');
					$(this).removeClass('gradient').addClass('active');
					elems.find('a').attr('class', 'triangle-down-gray');
					$(this).find('a').attr('class', 'triangle-down-red');
					aCon.hide().eq(index).show();
				});

			});
		}
	})();
	
	//日历变更和弹出层
	(function() {
		var oNow = new Date();
		var iYear = oNow.getFullYear();
		var iMonth = oNow.getMonth() + 1;
		var iDate = oNow.getDate();
		var aDay = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
		$('#date').text(iYear + '.' + iMonth);
		$('.info em').eq(0).text(iMonth);
		$('.info em').eq(1).text(iDate);

		//获取上个月的月份
		var iLastMonth = iMonth - 2;
		//此处构造的日期为下个月的第0天，天数索引从1开始，第0天即代表上个月的最后一天,即可获得一个月有多少天
		var iLastMonthDays = new Date(iYear, iLastMonth + 1, 0).getDate();
		//用来保存为上个月中星期天的日期
		var aSun = [];
		//获取上个月中星期天的日期并保存至aSun
		for (var i = 1; i <= iLastMonthDays; i++) {
			var oDate = new Date(iYear, iLastMonth, i);
			if (oDate.getDay() == 0) {
				aSun.push(oDate.getDate());
			}
		}
		//获取上个月中最后一个星期日的日期并创建上个月中要显示的部分日历
		var n = aSun[aSun.length - 1];
		for (var i = iLastMonthDays - n; i >= 0; i--) {
			var oLi = $('<li></li>').text(n + i).addClass('last-month');
			$('.calendar-day').prepend(oLi);
		}
		//根据月份确定这个月应该创建多少天
		if (iMonth == 1 || iMonth == 3 || iMonth == 5 || iMonth == 7 || iMonth == 8 || iMonth == 10 || iMonth == 12) {
			for (var i = 29; i <= 31; i++) {
				var oLi = $('<li></li>').text(i);
				$('.calendar-day').append(oLi);
			}
		} else if (iMonth == 2 && ((iYear % 4 == 0 && iYear % 100 != 0) || iYear % 400 == 0)) {
			var oLi = $('<li></li>').text(29);
			$('.calendar-day').append(oLi);
		} else {
			for (var i = 29; i <= 30; i++) {
				var oLi = $('<li></li>').text(i);
				$('.calendar-day').append(oLi);
			}
		}
		//创建下个月中要显示的部分日历
		var iMonthDays = new Date(iYear, iMonth, 0).getDate();
		for (var i = 1; i < 42 - iMonthDays - (iLastMonthDays - n); i++) {
			var oLi = $('<li></li>').text(i).addClass('next-month');
			$('.calendar-day').append(oLi);
		}
		//日历活动提示层
		var oIntroImg = $('.info img');
		var oTheme = $('#theme');
		var oDescrip = $('.info p');
		var dayImgs = $('.calendar-day img');
		var lastMonths = $('.last-month');
		var oDetail = $('.calendar .detail');
		var sDetail = '';
		var oToday = $('.calendar-day li').eq(iDate + lastMonths.length - 1);

		//确定活动的信息
		oToday.addClass('active');
		if (parseInt(oToday.text()) == iDate && (oToday.find('img').attr('title') != undefined)) {
			var oTodayAct = oToday.find('img');
			oTheme.text('本日主题：' + oTodayAct.attr('title'));
			oDescrip.text(oTodayAct.attr('data-info'));
			oIntroImg.attr('src', oTodayAct.attr('src'));
		} else {
			oTheme.text('本日主题：无');
			oDescrip.text('今天没有主题哟~查看下面的日历~一起来期待下一个主题吧！鼠标放上去可以查看详情的哟~');
			oIntroImg.attr('src', 'img/content/none.jpg');
		}

		dayImgs.each(function(i) {
			$(this).hover(function() {
				var iDay = (lastMonths.length + parseInt($(this).parent().text()) - 1) % 7; //计算得出那一天是星期几
				sDetail = '<img src=' + $(this).attr('src') + ' alt="introduce">' + '<h4><strong>' + aDay[iDay] + '</strong> 本日主题</h4><p>' + $(this).attr('data-info') + '</p><span id="arrow"></span>';
				oDetail.show().html(sDetail);
				oDetail.css({
					top: $(this).parent().position().top - oDetail.outerHeight() / 3,
					left: $(this).parent().position().left + $(this).parent().outerWidth() + 11
				});
			}, function() {
				oDetail.hide();
			});
		});
	})();

	// 自动播放的焦点图
	(function() {
		var oFade = $('#fade');
		var aUlItems = oFade.find('ul li');
		var aOlItems = oFade.find('ol li');
		var oP = oFade.find('p');
		var arr = ['跑男来了~一起来奔跑吧', '人像摄影中的光影感', '娇柔妩媚、美艳大方'];
		var iNow = 0;
		var timer = null;

		fnFade();

		aOlItems.click(function() {
			iNow = $(this).index();
			fnFade();
		});

		oFade.hover(function() {
			clearInterval(timer);
		}, autoPlay);

		function autoPlay() {
			timer = setInterval(function() {
				iNow++;
				iNow %= arr.length;
				fnFade();
			}, 2000);
		}
		autoPlay();

		function fnFade() {
			aUlItems.each(function(i) {
				if (i != iNow) {
					aUlItems.eq(i).fadeOut().css('zIndex', 1);
					aOlItems.eq(i).removeClass('active');

				} else {
					aUlItems.eq(i).fadeIn().css('zIndex', 2);
					aOlItems.eq(i).addClass('active');
				}
			});
			oP.text(arr[iNow]);
		}
	})();

	// BBS高亮显示
	(function() {
		$('.bbs li').mouseover(function() {
			$('.bbs li').removeClass('active').eq($(this).index()).addClass('active');
		});
	})();

	// HOT鼠标提示效果
	(function() {
		var arr = [
			'',
			'用户名：小艾草',
			'用户名：BiBi',
			'用户名：笑笑',
			'用户名：蓝蝶',
			'用户名：小薰',
			'用户名：志颖',
			'用户名：娜娜',
			'用户名：小宝',
			'用户名：丫头',
			'用户名：小南瓜',
			'用户名：摇滚boy'
		];
		$('.hot-person li').mouseover(function() {

			if ($(this).index() == 0) return;

			$('.hot-person li p').remove();

			$(this).append('<p class="show">' + arr[$(this).index()] + '</p>');
		});
	})();

});