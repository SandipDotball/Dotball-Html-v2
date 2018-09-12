var countDownDate = new Date("aug 27, 2018 15:37:25").getTime();
var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if(days > 0){
        var html = "ENDS in " + days + "d " + hours + "h "
        + minutes + "m "
        $('.text_wrapper p').html(html)
    }else{
        document.getElementById("demo").innerHTML ="ENDS in " + hours + "h "
        + minutes + "m " + seconds + "s"
    }

    if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
    }
}, 1000);