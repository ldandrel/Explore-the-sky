​$(document).ready(function(){


    $('body').mousewheel(function(event) {

        var translate = event.deltaY;
        $('.slider').css({
            "-webkit-transform":"translate("+ translate +"px,0px)",
            "-ms-transform":"translate("+ translate +"px,0px)",
            "transform":"translate("+ translate +"px,0px)"
        });​

    });

});