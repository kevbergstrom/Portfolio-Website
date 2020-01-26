var containers = []
var selected = "";
var padding = 0;

$(document).ready(function(){
	//precompute values
	getContainers();
	padding = $(".navContainer").height();
	//add the scroll event
	$(window).on('scroll', function(){
		scrolled();
	});
});

function getContainers(){
	containers = document.getElementsByClassName("container");
}

function scrolled(){
	let windowPosY = $(window).scrollTop();
	//iterate through all of the containers
	for(i = 0;i<containers.length;i++){
		if(containers[i].offsetTop>windowPosY+padding){
			//no nav to select
			if(i-1<0){
				selectNone();
				return;
			}
			//select the previous nav
			selectNav(containers[i-1]);
			return;
		}
	}
	//select the last nav
	selectNav(containers[i-1]);
}

function selectNone(){
	if(selected != ""){
		let oldNavLink = $("a[href$='#"+ selected +"']");
		oldNavLink.toggleClass('select');
		selected = "";
	}
}

function selectNav(container){
	let id = container.id 
	if(selected == id){
		return
	}
	//unselect the old link
	if(selected != ""){
		let oldNavLink = $("a[href$='#"+ selected +"']");
		oldNavLink.toggleClass('select');
	}
	//select the new link
	let navLink = $("a[href$='#"+ id +"']");
	navLink.toggleClass('select');
	selected = id;
}