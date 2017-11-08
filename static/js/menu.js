$(document).ready(function() {
    $(".menu-trigger").click(function(event) {
        let maxW = 1000;
        event.preventDefault();
        $("header nav ul").slideToggle(300);
        var timerID = setInterval(function(){
            if(($("header nav ul").css('display') == 'block') && ($(window).width() < maxW)) {
                $("header nav").css("box-shadow", "0px 0px 10px");
            }
            else if ($("header nav ul").css('display') == 'none') {
                $("header nav").removeAttr('style');
            }	

            $(window).resize(function() {
                if($(window).width() > maxW){
                    clearInterval(timerID);
                    $("header nav ul").removeAttr('style');
                    $("header nav").removeAttr('style');
                }
            });

        },10);		
    });          
});