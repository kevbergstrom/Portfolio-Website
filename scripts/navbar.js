let navbar = document.querySelector("#navbar")
let navOptions = document.querySelector("#navOptions")
let navOpen = false;

let toggleNavbar = function() {
    if(navOpen){
        navOptions.classList.add("d-none");
    }else{
        navOptions.classList.remove("d-none");
    }
    navOpen = !navOpen
}

let landingObserver = new IntersectionObserver(entries => {
    let bottom = entries[0].boundingClientRect.y + entries[0].boundingClientRect.height
    navbar.classList.remove("darkBg");
    navbar.classList.remove("shadow");
    if(bottom < 0){
        navbar.classList.add("darkBg");
        navbar.classList.add("shadow");
    }
});

landingObserver.observe(document.querySelector("#landing"));