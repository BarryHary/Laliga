---
---

var aboutCarousel = {
  currSlideNo: 0,
  slideImages: [],
  autoplayObj: 0,
  autoplaySpeed: 5000,

  uploadImages: function(){
    const obj = this;

    {% for item in site.data.about-carousel %}
    this.slideImages.push('{{ item.url }}');
    {% endfor %}

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

    $('#about .slide').click(function(){

      var path = 'assets/img/about-carousel/' + obj.slideImages[obj.currSlideNo];
      $('#about .about-carousel-viewbox .carousel-image').css('background-image', 'url(' + path + ')');

      var scrollTop = $('html').scrollTop();
      $('html').addClass('scroll-disabled').css('top', -scrollTop);

      $('#about .about-carousel-viewbox').css('display', 'block').animate({opacity: '1'}, 300);
    });

    $('#about .about-carousel-viewbox').click(function(){

      var scrollTop = parseInt($('html').css('top'));
      $('html').removeClass("scroll-disabled").scrollTop(-scrollTop);

      $('#about .about-carousel-viewbox').animate({opacity: '0'}, 150, function(){
        $(this).css('display', 'none');
      });
    })
  },

  setExitWithEscape: function(){
    $(document).keydown(function(event){

      if (event.key === 'Escape' && $('#about .about-carousel-viewbox').css('display') == 'block')
      {
        var scrollTop = parseInt($('html').css('top'));
        $('html').removeClass('scroll-disabled').scrollTop(-scrollTop);

        $('#about .about-carousel-viewbox').animate({opacity: '0'}, 150, function(){
          $(this).css('display', 'none');
        });
      }
    });
  },

  setAutoplay: function(){
    const obj = this;
    this.restartAutoplay();

    $('#about .controlls .move-left, #about .controlls .move-right').click(function(){
      obj.stopAutoplay();
      obj.restartAutoplay();
    });

    $('#about .slide').click(function(){
      obj.stopAutoplay();
    });

    $('#about .about-carousel-viewbox').on('click', function(){
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
}
