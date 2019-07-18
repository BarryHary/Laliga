---
---

$(document).ready(function(){

  smoothScroll(800, -80); // speed, offset

  showCopyright();
  setAboutCarouselBackground();
  aboutCarousel(5000); // autoplaySpeed

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

function setAboutCarouselBackground()
{
  {% for item in site.data.about-carousel %}

  $("#about .about-carousel .slide:nth-child({{ forloop.index }})").css("background-image", "url('assets/img/about-carousel/{{ item.url }}')");

  {% endfor %}
}

function aboutCarousel(autoplaySpeed)
{
  var currSlide = {currSlideNo: 0};

  // AUTOPLAY - speed
  var autoplay = setInterval(function(){
    moveSlideRight(currSlide)
  }, autoplaySpeed);

  $("#about .controlls .move-left").click(function(){
    moveSlideLeft(currSlide);
    clearInterval(autoplay);
    autoplay = setInterval(function(){
      moveSlideRight(currSlide)
    }, autoplaySpeed);
  });

  $("#about .controlls .move-right").click(function(){
    moveSlideRight(currSlide);
    clearInterval(autoplay);
    autoplay = setInterval(function(){
      moveSlideRight(currSlide)
    }, autoplaySpeed);
  });
}

function showSlide(showIndex, hideIndex)
{
  $("#about .carousel-images .slide").eq(showIndex).css("opacity", "1");
  $("#about .carousel-images .slide").eq(hideIndex).css("opacity", "0");
}

function moveSlideLeft(currSlide)
{
  const slideSize = $("#about .carousel-images .slide").length;

  if (currSlide.currSlideNo > 0)
  {
    showSlide(currSlide.currSlideNo - 1, currSlide.currSlideNo)
    currSlide.currSlideNo--;
  }
  else
  {
    showSlide(slideSize - 1, currSlide.currSlideNo)
    currSlide.currSlideNo = slideSize - 1;
  }
}

function moveSlideRight(currSlide)
{
  const slideSize = $("#about .carousel-images .slide").length;

  if (currSlide.currSlideNo < slideSize - 1)
  {
    showSlide(currSlide.currSlideNo + 1, currSlide.currSlideNo);
    currSlide.currSlideNo++;
  }
  else
  {
    showSlide(0, currSlide.currSlideNo);
    currSlide.currSlideNo = 0;
  }
}
