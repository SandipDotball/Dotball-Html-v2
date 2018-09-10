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
$('.upcomingWrapper').slick({
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    variableWidth: true,
    prevArrow: "<div class='align-prev'><i class='mdi mdi-chevron-left'></i>Prev</div>",
    nextArrow: "<div class='align-next'>Next<i class='mdi mdi-chevron-right'></i></div>",
    responsive: [
      {
        breakpoint: 1204,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
    ]
  });
  $('.liveWrapper').slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: "<div class='align-prev'><i class='mdi mdi-chevron-left'></i>Prev</div>",
    nextArrow: "<div class='align-next'>Next<i class='mdi mdi-chevron-right'></i></div>",
  });

$(function() {
  $('.btn-mobileMenu').click(function(event) {
    event.preventDefault();
    $(this).next('.nav-links').slideToggle(500);
  });
});