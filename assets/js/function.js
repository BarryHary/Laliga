---
---

$(document).ready(function(){

  newScript('assets/js/widgets/about-carousel.js', aboutCarouselOnload);
  newScript('assets/js/widgets/teams-carousel.js', teamsCarouselOnload);

  setSmoothScroll(800, -50); // speed, offset
  setCopyright();
});

function newScript(url, callback)
{
  var script = document.createElement('script');
  script.src = url;
  document.body.appendChild(script);
  script.onload = callback;
}

function aboutCarouselOnload()
{
  aboutCarousel.uploadImages();
  aboutCarousel.setControllers();
  aboutCarousel.setViewbox();
  aboutCarousel.setExitWithEscape();
  aboutCarousel.setAutoplay();
}

function teamsCarouselOnload()
{
  teamsCarousel.uploadImages();
}

function setSmoothScroll(speed, offset)
{
  $('a').click(function(){

    if (this.hash != '')
    {
      var hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top + offset
      }, speed);
    }
  });
}

function setCopyright()
{
  const date = new Date();
  $('.copyright').text('Copyright ' + date.getFullYear() + ' | {{ site.data.basic.developer }}');
}
