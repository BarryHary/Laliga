---
---

$(document).ready(function(){

  newScript('assets/js/widgets/about-carousel.js', aboutCarouselOnload);

  setSmoothScroll(800, -80); // speed, offset
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

function setSmoothScroll(speed, offset)
{
  $('a').click(function(){

    if (this.hash != '')
    {
      event.preventDefault();
      var hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top + offset
      }, speed, function(){

        window.location.hash = hash;
      });
    }
  });
}

function setCopyright()
{
  const date = new Date();
  $('.copyright').text('Copyright ' + date.getFullYear() + ' | {{ site.data.basic.developer }}');
}
