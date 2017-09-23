/**
 * Created by Porter on 9/21/2017.
 */
var fly = document.getElementById('fly');

var inView = "";

var phrases = ["Thanks for Looking!", "Eat Your Veggies!", "Be Your Best You!", "Food is Medicine!"];
var lastPhrase = "";

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    //var elemBottom = elemTop + $(elem).height();

    return ((elemTop < docViewBottom && elemTop > docViewTop));
    //return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function moveFly(elem) {

    if (inView != elem) {


        inView = elem;

        var top = jQuery("#" + elem).offset().top;


        fly.style.left = randomIntFromInterval(25, 75) + "%";
        fly.style.top = top - 20 + "px";
    }
    else {
        //the fly is already there
    }
}

function getRandomPhrase() {
    jQuery.each(phrases, function (i, v) {
        var selection = phrases[Math.floor(Math.random() * phrases.length)];


        if (selection != lastPhrase) {
            lastPhrase = selection;
            return false
        }
        else {
            // get a new phrase, because this is what we showed last time
        }


    });


    return lastPhrase
}

function speech() {

    //console.log("SPEECH")
    jQuery(".bubble").html(getRandomPhrase());

    jQuery(".bubble, .bubblePoint").fadeIn();
    window.setTimeout(function () {
        jQuery(".bubble, .bubblePoint").fadeOut();
    }, 3000)
}

function checkPosition() {
    var foundSomething = false;

    $('section').each(function () {
        if (isScrolledIntoView(this)) {
            moveFly(this.id);
            //console.log(this.id + " is in view");
            foundSomething = true;
            return false
        }
    });

    if (!foundSomething) {
        moveFly("titleText");
    }
}

window.onload = function () {

    $("#fly").on("click", function () {
        speech()
    });

    //moveFly("titleText");
    checkPosition();

    jQuery("#music")[0].play();
    jQuery("#music")[0].volume = 0;
    jQuery("#music")[0].loop = true;

    window.setTimeout(function () {
        jQuery("#music").animate({"volume": 0.5}, 3000);
    }, 1000)


};


$(window).on("scroll", function () {

    checkPosition();

});

$(window).on("resize", function () {
    inView = "";
    //console.log("RESIZE");
    checkPosition();

});

jQuery("#mute").on("click", function () {
    jQuery("#mute i").toggleClass("fa-volume-up").toggleClass("fa-volume-off");
    if (jQuery("#music")[0].volume) {
        jQuery("#music").animate({"volume": 0.0}, 3000);
    }
    else {
        jQuery("#music").animate({"volume": 0.5}, 3000);
    }

});
