var moduleUI = (function(moduleUI, $, undefined){

	// GNB 영역 열기
	moduleUI.gnbShow = function(){
		this.init = function(){
			this.gnb = ".gnb",
			this.container = ".container",
			this.openBtn = ".open",
			this.closeBtn = ".close",
			this.speed =  200,
			this.scHeight = $(window).height();
		};
		this.initEvent = function(){
			var objThis = this;
			$(this.openBtn).on("touchend", function(e){
				e.preventDefault();
				objThis.open();
			});
			$(this.closeBtn).on("touchend", function(e){
				e.preventDefault();
				objThis.close();
			});
			$("body").on("touchend", ".bg", function(){
				objThis.close();
			});
		};
		this.open = function(){
			$(this.gnb).css({display:"block", minHeight:this.scHeight, right:0})
			$(this.container).css({position:"fixed",left:0,top:0});
			$(".wrapper").append("<div class='bg'></div>");
		};
		this.close = function(){
			$(this.gnb).css({display:"none"});
			$(this.container).css({position:"relative",left:0,top:0});
			$(".bg").remove();
		};
		this.init();
		this.initEvent();
	};

	// GNB 아코디언 메뉴 
	moduleUI.gnbMenu = function(){
		this.init = function(){
			this.menu = ".nav > ul > li"
		};
		this.initEvent = function(){
			var objThis = this;
			$(this.menu).on("click", function(){
				var tg = $(this);
				if(!tg.hasClass("on")){
					$(objThis.menu).removeClass("on");
					tg.addClass("on");
				}else{
					tg.removeClass("on");
				}
			});
			$(this.menu).find("> ul > li").on("click", function(e){ e.stopPropagation() });
		};
		this.init();
		this.initEvent();
	};

	// 위로 가기 
	moduleUI.topScroll = function(){
		this.init = function(){
			this.scrollBtn = ".topScroll",
			this.speed = 400
		};
		this.initEvent = function(){
			var objThis = this;
			$(this.scrollBtn).on("click", function(){
				$("body").stop().animate({
					scrollTop : 0
				},objThis.speed);
			});
			$(window).scroll(function(){
				var sc = $(window).scrollTop();
				if(sc >= 100){
					$(objThis.scrollBtn).stop().fadeIn();
				}else{
					$(objThis.scrollBtn).stop().fadeOut();
				}
			});
		};
		this.init();
		this.initEvent();
	};

	// 클릭시 컨텐츠 보이기 (열기버튼, 보일컨텐츠, 닫기버튼)
	moduleUI.contentShow = function(showbtn, contnets, hidebtn){
		this.init(showbtn, contnets, hidebtn);
		this.initEvent();
	};
	moduleUI.contentShow.prototype.init = function(showbtn, contnets, hidebtn){
		this.showbtn = showbtn,
		this.contnets = contnets,
		this.hidebtn = hidebtn
	};
	moduleUI.contentShow.prototype.initEvent = function(){
		var objThis = this;
		$(this.showbtn).on("click", function(e){
			e.preventDefault();
			if( !$(objThis.contnets).hasClass("on") ){
				$(objThis.contnets).addClass("on");
			}else{
				$(objThis.contnets).removeClass("on");
			}
		});
		if(this.hidebtn){
			$(this.hidebtn).on("click",function(){
				if( $(objThis.contnets).hasClass("on") ){
					$(objThis.contnets).removeClass("on");
				}
			});
		};
	};

	// 인풋파일 (인풋파일, 파일명 출력)
	moduleUI.fakeInputFile = function(fileUpload, fileName){
		this.init(fileUpload, fileName);
		this.initEvent();
	};
	moduleUI.fakeInputFile.prototype.init = function(fileUpload, fileName){
		this.myfile = fileUpload,
		this.myfileName = fileName
	};
	moduleUI.fakeInputFile.prototype.initEvent = function(){
		var objThis = this;
		$(this.myfile).on("change", function(){
			var value = $(this).val();
			$(objThis.myfileName).val(value);
		});
	};

	// 아이프레임 높이 조절
	moduleUI.doResize = function( obj ){
		this.the_height = document.getElementById(obj).contentWindow.document.body.scrollHeight;
		document.getElementById(obj).height = (this.the_height * 2) + 34;
	};

	return moduleUI;

})(window.moduleUI || {}, jQuery);

$(window).on("load", function(){
	moduleUI.gnbShow();
	moduleUI.gnbMenu();
	moduleUI.topScroll();
	var showContents01 = new moduleUI.contentShow("#btntype02", "#b_input", "#btntype03");
});

// 구글 지도 API
function initialize() {
	/*
		http://openapi.map.naver.com/api/geocode.php?key=f32441ebcd3cc9de474f8081df1e54e3&encoding=euc-kr&coord=LatLng&query=서울특별시 강남구 강남대로 456
            위의 링크에서 뒤에 주소를 적으면 x,y 값을 구할수 있습니다.
	*/
	var Y_point = 127.3849508; // Y 좌표
	var X_point = 36.3504396; // X 좌표
	var zoomLevel = 16; // 지도의 확대 레벨 : 숫자가 클수록 확대정도가 큼
	var markerTitle = "홈코트 위치";	// 현재 위치 마커에 마우스를 오버을때 나타나는 정보
	var markerMaxWidth = 300;	// 마커를 클릭했을때 나타나는 말풍선의 최대 크기
	var myLatlng = new google.maps.LatLng(Y_point, X_point);
	var mapOptions = {
		zoom: zoomLevel,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var map = new google.maps.Map(document.getElementById('map_view'), mapOptions);
	var marker = new google.maps.Marker({
		position: myLatlng,
		map: map,
		title: markerTitle
	});
	var infowindow = new google.maps.InfoWindow(
		{
			content: contentString,
			maxWidth: markerMaxWidth
		}
	);
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map, marker);
	});
}

