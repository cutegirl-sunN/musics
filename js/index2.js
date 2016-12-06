$(function(){
	var $audio=$("#audio");
	var audio=$audio.get(0);
	var a=$("a .play");
	var time=$(".time");
	var endtime=$(".endtime");
	var duration=$(".duration");
	var circle=$(".circle");
	var prev=$(".prev");
	var next=$(".next");
	var play=$(".play");
	var lists=$(".lists");
	var add=$(".add");
	var close=$(".close");
	var box=$(".list-box");
	var more=$(".more");
	var morebox=$(".morebox")
	var qx=$(".qx");
	var novolice=$(".novolice");
	var volice=$(".volice");
	var cir=$(".cir");
	var vi=$(".volice-duretion")
	var musics=[
	{
		name:"一笑倾城",
		author:"汪苏泷",
		src:"mp3/汪苏泷 - 一笑倾城.mp3",
		duration:"3:51",
		img: 'img/2.jpg'
	},
	{
		name:"宠爱",
		author:"Tfboys",
		src:"mp3/Tfboys - 宠爱.mp3",
		duration:"4:25",
		img: 'img/5.jpg'
	},
	{
		name:"当蝴离开了蝶",
		author:"庄心妍",
		src:"mp3/庄心妍 - 当蝴离开了蝶.mp3",
		duration:"4:19",
		img: 'img/2.jpg'
	},
	{
		name:"爱情不是偶像剧",
		author:"格子兮",
		src:"mp3/格子兮 - 爱情不是偶像剧.mp3",
		duration:"3:12",
		img: 'img/2.jpg'
	},
	{
		name:"爱让我勇敢",
		author:"汪苏泷",
		src:"mp3/汪苏泷 - 爱让我勇敢.mp3",
		duration:"3:34",
		img: 'img/4.jpg'
	}
	]
	audio.oncanplay = function(){
		time.html(format(audio.duration))
	}
	//播放暂停事件
	play.on("touchend",function(){
		if(audio.paused){
			audio.play();
			$(".play a").css({"width":"50px","height":"50px","background":"url(img/zan.png","background-size":"cover","margin-top":"0.15rem"});
		}else{
			audio.pause();
			$(".play a").css({"width":"60px","height":"60px","background":"url(img/bofang.png","background-size":"cover"});
		}
	})
	//时间取整
	function format(v){
		v=Math.floor(v);
		var s=v%60;
		s=(s<10)?("0"+s):s
		var m=Math.floor(v/60);
		return m+":"+s;
	}
	//时间进程
	$audio.on("timeupdate",function(){
		time.html(format(audio.currentTime));
		endtime.html(format(audio.duration));
		var left=duration.width()*audio.currentTime/audio.duration;
		circle.css("left",left);
	})
	
	
	
	
	var currentIndex=1;
	
	
	
	function render(){
		lists.empty();
		$.each(musics,function(i,o){
			var c=(i===currentIndex) ? "active":'';
			$("<li class='"+o+"'><span>"+o.name+"</span><span class='zuozhe'>"+ "-"+o.author+"</span><span class='delete'>×</span><p><a></a></p></li>").appendTo(".lists")
		})
	}
	$(".lists").on("touchend","li",function(){
		lists.find("li").removeClass("active");
		$(this).addClass("active");
		currentIndex=$(this).index();
		audio.src=musics[currentIndex].src;
		$(".musicname .name").html(musics[currentIndex].name)
		$(".musicname .author").find("a").html(musics[currentIndex].author)
		audio.play();
		play.html("&#xe61f;").css("font-size","48px")
	})
	
	render();
	
	//列表新增
	lists.on("click","add",function(){
		var d=$(this).attr("data-v");
		musics.push(JSON.parse(d))
	})
	//列表删除
	lists.on("touchend",".delete",function(){
		var li=$(this).closest("li");
		var index = li.index();
		musics.splice(index,1);
		if(index===currentIndex){
			if(musics[currentIndex]){
				audio.src=musics[currentIndex].src;
			}else{
				$audio.removeAttr('src')
			}
		}else if (index>currentIndex){
			
		}else if (index<currentIndex){
			currentIndex-=1;
		}
		render();
	})
	
	//音量
	
	$audio.on("volumechange",function(){
		cir.css("left",vi.width()*audio.volum-cir.width()/2)
	})
	cir.on("touchend",false);
	vi.on("touchend",function(e){
		audio.volume=(e.originalEvent.changedTouches[0].clientX-vi.offset().left)/vi.width()
		stopvo.removeAttr('data-v')
	})
	cir.on("touchend",false);
	cir.on("touchend",function(e){
		var r=cir.width()/2;
		var start=r-e.originalEvent.changedTouches[0].clientX+cir.offset().left
		$(document).on("touchend",function(e){
			var left=e.originalEvent.changedTouches[0].clientX-vi.offset().left+start
			var c=left/vi.width()
			if(c>1||c<0){
				return;
			}
			audio.volume=c
		})
		return false
	})
	$(document).on("touchend",function(){
		$(document).off("touchmove")
	})
	
	////////////////////////静音事件
	novolice.on("touchend",function(){
		if($(this).attr("data-v")){
			audio.volume=this.getAttribute('data-v')
			$(this).removeAttr('data-v')
		}else{
			$(this).attr('data-v', audio.volume)
			audio.volume = 0
		}
		return false
	})
	
	
	
	//点击
	circle.on("touchend",false)
	duration.on('touchend',function(e){
		var r=circle.width()/2;
		var start=r-e.originalEvent.changedTouches[0].clientX+circle.offset().left;
		$(document).on('touchmove',function(e){
			var left=e.originalEvent.changedTouches[0].clientX - duration.offset().left + start;
			var c=left / duration.width() * audio.duration;
			if(c>audio.duration||c<=0){
				return;
			}
			audio.currentTime=c;
		})
		return false;
	})
	$(document).on('touchend',function(){
		$(document).off('touchmove');
	},false)


	//列表隐藏与出现
	close.on("touchend",function(){
//		console.log(1)
		box.animate({height:0},1000).css({display:"none"})
	})
	$(".entry").on("touchend",function(){
		box.css({display:"block"}).animate({height:"700%"},1000)
	})
	//下一首
	next.on("touchend",function(){
		currentIndex+=1;
		if(currentIndex===musics.length){
			currentIndex=0;
		}
		audio.src=musics[currentIndex].src
		$(".musicname .name").html(musics[currentIndex].name)
		$(".musicname .author").find("a").html(musics[currentIndex].author)
		$(".pic").css("background","url(musics[currentIndex].img)")
		audio.play();
		$(".play a").css({"width":"50px","height":"50px","background":"url(img/zan.png","background-size":"cover","margin-top":"0.15rem"});
		
	})
	//上一首
	prev.on("touchend",function(){
		currentIndex-=1;
		if(currentIndex===-1){
			currentIndex=musics.length-1;
		}
		audio.src=musics[currentIndex].src;
		$(".musicname .name").html(musics[currentIndex].name)
		$(".musicname .author").find("a").html(musics[currentIndex].author)
		audio.play();
		$(".play a").css({"width":"50px","height":"50px","background":"url(img/zan.png","background-size":"cover","margin-top":"0.15rem"});
	})
	
	//更多
	more.on("touchend",function(){
		morebox.css({display:"block"}).animate({height:'9rem'},500)
	})
	qx.on("touchend",function(){
		morebox.animate({height:'0'},500).css({display:"none"})
	})
	$audio.on("ended",function(){
		audio.play();
	})
})
