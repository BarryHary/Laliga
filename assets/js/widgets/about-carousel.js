---
---

var aboutCarousel = {
  currSlideNo: 0,
  slideImages: [],
  autoplayObj: 0,
  autoplaySpeed: 5000,

  controllsPosition: function(){
    var centering = $('#about .controlls').parent().find('.carousel-images').height() / 2 + $('#about .controlls').height() / 2;
    $('#about .controlls').css('bottom', centering + 'px');
  },

  uploadImages: function(){
    const obj = this;

    // Upload images from yml to javascript array
    {% for item in site.data.about-carousel %}
    this.slideImages.push('{{ item.url }}');
    {% endfor %}

    // Setting background of HTML elements
    $('#about .about-carousel .slide').each(function(index){
      var path = 'assets/img/about-carousel/' + obj.slideImages[index];
      $(this).css('background-image', 'url(' + path + ')');
    });
  },

  showSlide: function(showIndex, hideIndex)
  {
    $('#about .carousel-images .slide').eq(showIndex).css('opacity', '1');
    $('#about .carousel-images .slide').eq(hideIndex).css('opacity', '0');
  },

  moveSlideLeft: function(){
    if (this.currSlideNo > 0)
    {
      this.showSlide(this.currSlideNo - 1, this.currSlideNo)
      this.currSlideNo--;
    }
    else
    {
      this.showSlide(this.slideImages.length - 1, this.currSlideNo)
      this.currSlideNo = this.slideImages.length - 1;
    }
  },

  moveSlideRight: function(){
    if (this.currSlideNo < this.slideImages.length - 1)
    {
      this.showSlide(this.currSlideNo + 1, this.currSlideNo);
      this.currSlideNo++;
    }
    else
    {
      this.showSlide(0, this.currSlideNo);
      this.currSlideNo = 0;
    }
  },

  setControllers: function(){
    const obj = this;

    $('#about .controlls .move-left').click(function(){
      obj.moveSlideLeft();
    });

    $('#about .controlls .move-right').click(function(){
      obj.moveSlideRight();
    });
  },

  setViewbox: function(){
    const obj = this;

    // Click on slide images
    $('#about .slide').click(function(){

      // Set viewbox image source to current image source
      var path = 'assets/img/about-carousel/' + obj.slideImages[obj.currSlideNo];
      $('#about .about-carousel-viewbox .carousel-image').css('background-image', 'url(' + path + ')');

      // Disable scrolling (but do not hide the browser scrollbar)
      var scrollTop = $('html').scrollTop();
      $('html').addClass('scroll-disabled').css('top', -scrollTop);

      // Fade in the viewbox
      $('#about .about-carousel-viewbox').css('display', 'block').animate({opacity: '1'}, 300);
    });

    // Click on viewbox (when display: block)
    $('#about .about-carousel-viewbox').click(function(){

      // Enable scrolling (prevent bugs with scrollbar)
      var scrollTop = parseInt($('html').css('top'));
      $('html').removeClass("scroll-disabled").scrollTop(-scrollTop);

      // Fade out the viewbox
      $('#about .about-carousel-viewbox').animate({opacity: '0'}, 150, function(){
        $(this).css('display', 'none');
      });
    })
  },

  setExitWithEscape: function(){
    $(document).keydown(function(event){

      if (event.key === 'Escape' && $('#about .about-carousel-viewbox').css('display') == 'block')
      {
        // Enable scrolling (prevent bugs with scrollbar)
        var scrollTop = parseInt($('html').css('top'));
        $('html').removeClass('scroll-disabled').scrollTop(-scrollTop);

        // Fade out the viewbox
        $('#about .about-carousel-viewbox').animate({opacity: '0'}, 150, function(){
          $(this).css('display', 'none');
        });
      }
    });
  },

  setAutoplay: function(){
    const obj = this;

    // Start autoplay
    this.restartAutoplay();

    // When the user press controlls, reset the timer
    $('#about .controlls .move-left, #about .controlls .move-right').click(function(){
      obj.stopAutoplay();
      obj.restartAutoplay();
    });

    // When viewbox is active, stop the timer
    $('#about .slide').click(function(){
      obj.stopAutoplay();
    });

    // When user quit from viewbox, restart autoplay
    $('#about .about-carousel-viewbox').click(function(){
      obj.restartAutoplay();
    });

    $(document).keydown(function(event){
      if (event.key == 'Escape' && $('#about .about-carousel-viewbox').css('display') == 'block')
      {
        obj.restartAutoplay();
      }
    });
  },

  restartAutoplay: function(){
    const obj = this;

    this.autoplayObj = setInterval(function(){
      obj.moveSlideRight();
    }, this.autoplaySpeed);
  },

  stopAutoplay: function(){
    clearInterval(this.autoplayObj);
  }
};
