---
---

// About Carousel Constanst and Vars

const aboutCarouselAutoplaySpeed = 5000;
const slideSize = $("#about .carousel-images .slide").length;
var autoplay, currSlideNo = 0;
var slideImages = [];

// ---

$(document).ready(function(){

  smoothScroll(800, -80); // speed, offset

  showCopyright();

  createSlideImagesList();
  setAboutCarouselBackground();
  aboutCarousel(aboutCarouselAutoplaySpeed); // autoplaySpeed
  viewAboutCarouselImages(aboutCarouselAutoplaySpeed); // autoplaySpeed
  exitWithEscape(aboutCarouselAutoplaySpeed); // autoplaySpeed
});



function smoothScroll(speed, offset)
{
  $("a").click(function(){

    if (this.hash != "")
    {
      event.preventDefault();
      var hash = this.hash;

      $("html, body").animate({
        scrollTop: $(hash).offset().top + offset
      }, speed, function(){

        window.location.hash = hash;
      });
    }
  });
}



function showCopyright()
{
  var date = new Date();
  $(".copyright").text("Copyright " + date.getFullYear() + " | {{ site.data.basic.developer }}");
}



function createSlideImagesList()
{
  {% for item in site.data.about-carousel %}
  slideImages.push("{{ item.url }}");
  {% endfor %}
}



function setAboutCarouselBackground()
{
  $("#about .about-carousel .slide").each(function(index){

    var path = "assets/img/about-carousel/" + slideImages[index];
    $(this).css("background-image", "url(" + path + ")");
  });
}



function aboutCarousel(autoplaySpeed)
{
  // AUTOPLAY - speed
  autoplay = setInterval(function(){
    moveSlideRight()
  }, autoplaySpeed);

  $("#about .controlls .move-left").click(function(){
    moveSlideLeft();
    clearInterval(autoplay);
    autoplay = setInterval(function(){
      moveSlideRight();
    }, autoplaySpeed);
  });

  $("#about .controlls .move-right").click(function(){
    moveSlideRight();
    clearInterval(autoplay);
    autoplay = setInterval(function(){
      moveSlideRight();
    }, autoplaySpeed);
  });
}



function showSlide(showIndex, hideIndex)
{
  $("#about .carousel-images .slide").eq(showIndex).css("opacity", "1");
  $("#about .carousel-images .slide").eq(hideIndex).css("opacity", "0");
}



function moveSlideLeft()
{
  if (currSlideNo > 0)
  {
    showSlide(currSlideNo - 1, currSlideNo)
    currSlideNo--;
  }
  else
  {
    showSlide(slideSize - 1, currSlideNo)
    currSlideNo = slideSize - 1;
  }
}



function moveSlideRight()
{
  if (currSlideNo < slideSize - 1)
  {
    showSlide(currSlideNo + 1, currSlideNo);
    currSlideNo++;
  }
  else
  {
    showSlide(0, currSlideNo);
    currSlideNo = 0;
  }
}



function viewAboutCarouselImages(autoplaySpeed)
{
  $("#about .slide").click(function(){

    var path = "assets/img/about-carousel/" + slideImages[currSlideNo];
    $("#about .about-carousel-viewbox .carousel-image").css("background-image", "url(" + path + ")");


    var scrollTop = $("html").scrollTop();
    $("html").addClass("scroll-disabled").css("top", -scrollTop);


    $("#about .about-carousel-viewbox").css("display", "block").animate({opacity: "1"}, 300);
    clearInterval(autoplay);
  });

  $("#about .about-carousel-viewbox").click(function(){

    var scrollTop = parseInt($('html').css('top'));;
    $("html, body").removeClass("scroll-disabled").scrollTop(-scrollTop);


    $("#about .about-carousel-viewbox").animate({opacity: "0"}, 150, function(){
      $(this).css("display", "none");
    });


    autoplay = setInterval(function(){
      moveSlideRight();
    }, autoplaySpeed);
  })
}



function exitWithEscape(autoplaySpeed)
{
  $(document).keydown(function(event){
    if (event.key === "Escape" && $("#about .about-carousel-viewbox").css("display") === "block")
    {
      var scrollTop = parseInt($('html').css('top'));;
      $("html, body").removeClass("scroll-disabled").scrollTop(-scrollTop);


      $("#about .about-carousel-viewbox").animate({opacity: "0"}, 150, function(){
        $(this).css("display", "none");
      });


      autoplay = setInterval(function(){
        moveSlideRight();
      }, autoplaySpeed);
    }
  });
}
