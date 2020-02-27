var slides = {
    "energyPredict":{images:[
        "pages/energyPredict/assets/screen1.png"]},
    "landmark":{images:[
        "pages/landmark/assets/lm1.png",
        "pages/landmark/assets/lm2.png",
        "pages/landmark/assets/lm3.png",
        "pages/landmark/assets/lm4.png",
        "pages/landmark/assets/lm5.png",
        "pages/landmark/assets/lm6.png",
        "pages/landmark/assets/lm7.png",
        "pages/landmark/assets/lm8.png"]},
    "stealTheRuby":{images:[
        "pages/stealTheRuby/assets/screen1.png",
        "pages/stealTheRuby/assets/screen2.png",
        "pages/stealTheRuby/assets/screen3.png",
        "pages/stealTheRuby/assets/screen4.png",
        "pages/stealTheRuby/assets/screen5.png",
        "pages/stealTheRuby/assets/screen6.png",
        "pages/stealTheRuby/assets/screen7.png",
        "pages/stealTheRuby/assets/results.png"]},
    "breakoutEX":{images:[
        "pages/breakoutEX/assets/screen1.png",
        "pages/breakoutEX/assets/screen2.png",
        "pages/breakoutEX/assets/screen3.png",
        "pages/breakoutEX/assets/screen4.png",
        "pages/breakoutEX/assets/screen5.png",
        "pages/breakoutEX/assets/results.png"]},
}//I could probably store this in a json file
var currentProject;
var currentSlide = 0;
var slideCount = 0;

function exitModal(id){
    $("#"+id).hide();
}

function nextSlide(direction){
    currentSlide += direction;

    //checl if within bounds
    if(currentSlide >= slideCount){
        currentSlide = 0;
    }else if(currentSlide < 0){
        currentSlide = slideCount-1;
    }

    updateSlideImage(currentProject, currentSlide);
}

function updateSlideImage(slides, n){
    let images = slides["images"]
    $('#slide').attr('src',images[n]);
}

function openSlides(project){

    if(!slides[project]){
        //cannot find project slides
        return;
    }
    
    //load in the project slides
    currentProject = slides[project];
    currentSlide = 0;
    slideCount = currentProject["images"].length;
    updateSlideImage(currentProject, 0);

    $("#projectModal").show();
}