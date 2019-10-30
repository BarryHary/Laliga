---
---

var teamsCarousel = {
  slideImages: [],

  uploadImages: function(){
    const obj = this;

    // Upload images from yml to javascript array
    {% for item in site.data.teams-carousel %}
    this.slideImages.push('{{ item }}');
    {% endfor %}

    // Setting background of HTML elements
    $('#teams .teams-carousel .slide').each(function(index){
      var path = 'assets/img/teams-carousel/' + obj.slideImages[index] + '/badge.png';
      $(this).css('background-image', 'url(' + path + ')');
    });
  }
};
