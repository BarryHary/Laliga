---
---

$(document).ready(function(){

  showCopyright();
  setAboutCarouselBackground();
  aboutCarousel();

});

function showCopyright()
{
  var date = new Date();
  $(".copyright").text("Copyright " + date.getFullYear() + " | {{ site.data.basic.developer }}");
}

function setAboutCarouselBackground()
{
  {% for item in site.data.about-carousel %}

  $("#about .about-carousel .slide:nth-child({{ forloop.index }})").css("background-image", "url('assets/img/about-carousel/{{ item.url }}')");

  {% endfor %}
}

function aboutCarousel()
{
  var currSlideNo = 0;
  var slideSize = $("#about .carousel-images .slide").length;

  $("#about .controlls .move-left").click(function(){
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
  });

  $("#about .controlls .move-right").click(function(){
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
  });
}

function showSlide(showIndex, hideIndex)
{
  $("#about .carousel-images .slide").eq(showIndex).css("opacity", "1");
  $("#about .carousel-images .slide").eq(hideIndex).css("opacity", "0");
}
