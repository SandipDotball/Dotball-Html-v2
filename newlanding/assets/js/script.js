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

  $('.faqtab__content__block').addClass('tab__collapse');
  $('.faqtab__content__block').first().removeClass('tab__collapse').addClass('show');

  $('.faqtab__li').first().addClass('active');

  $('.faqtab__link').click(function(event) {
    event.preventDefault();
    $('.faqtab__li').removeClass('active');
    $(this).parent().addClass('active');

    var target = $(this).attr('href');
    $('.faqtab__content__block').fadeOut(0, function() {

      $('.faqtab__content__block.show .faqaccordion .faqaccordion__block').first().children('.faqaccordion__header').removeClass('active-collapse');
      $('.faqtab__content__block.show .faqaccordion .faqaccordion__block').first().children('.faqaccordion__content').slideUp(500);

    }).removeClass('show').addClass('tab__collapse');
    $(target).fadeIn(600, function() {

      $(this).removeClass('tab__collapse').addClass('show');
      $('.faqtab__content__block.show .faqaccordion .faqaccordion__block').first().children('.faqaccordion__header').addClass('active-collapse');
      $('.faqtab__content__block.show .faqaccordion .faqaccordion__block').first().children('.faqaccordion__content').slideDown(500);
      $('.faqtab__content__block.show .faqaccordion .faqaccordion__block').first().children('.faqaccordion__header').children('i').removeClass('mdi-plus').addClass('mdi-minus');

    });
  });

  $('.faqtab__content__block .faqaccordion .faqaccordion__block').first().children('.faqaccordion__header').addClass('active-collapse');
  $('.faqtab__content__block .faqaccordion .faqaccordion__block').first().children('.faqaccordion__content').slideDown(500);
  $('.faqtab__content__block .faqaccordion .faqaccordion__block').first().children('.faqaccordion__header').children('i').removeClass('mdi-plus').addClass('mdi-minus');

  $('.faqaccordion__header').click(function(event) {
    if ($(this).hasClass('active-collapse')) {
      $(this).removeClass('active-collapse');
    } else {
      $('.faqaccordion__block .faqaccordion__header').removeClass('active-collapse');
      $(this).addClass('active-collapse');
    }

    $('.faqaccordion__content').stop().slideUp(500);
    $(this).next('.faqaccordion__content').stop().slideToggle(500);


    if ($('.faqaccordion__header').hasClass('active-collapse')) {
      $('.faqaccordion__header').children('i').removeClass('mdi-minus').addClass('mdi-plus');
      $(this).children('i').removeClass('mdi-plus').addClass('mdi-minus');
    } else {
      $(this).children('i').removeClass('mdi-minus').addClass('mdi-plus');
    }
  });

  if ($(window).width() < 767) {

      $('.faqtab__ul').owlCarousel({
        margin:10,
        loop:true,
        autoWidth:true,
        items:4,
        nav: false,
        dots: false
      });
    } else {
      $('.faqtab__ul').trigger('refresh.owl.carousel');
    }
});