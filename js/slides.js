function nextSlide(btn, delta){
    /* get the current slide */
    let slideNum = $(btn).parent().find(".slideNum")
    let n = parseInt(slideNum.html())

    /* get the slide container */
    let slides = $(btn).parent().find(".slides")

    /* get total number of slides */
    let childs = slides.children().length;

    /* increment the slides*/
    n += delta;
    if(n>=childs){ n = 0; }
    if(n<0){ n = childs-1; }
    slideNum.html(n);

    /* hide all of the slides */
    slides.children().css("display","none");

    /* show the nth slide */
    slides.children()[n].style.display = "block"
}