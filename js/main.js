$(document).ready(function () {
  $('select').niceSelect();

  $('select').on('change', function () {
    // let section = 'top stories'
    let option = $("select option:selected").val();
    $.ajax({

      method: 'GET',
      url: 'https://api.nytimes.com/svc/topstories/v2/' + option + '.json?api-key=JHx0u4DL5N4m90C00e17SV5pIfqeDD5t'

    })

      .done(function (data) {




        $('.newPage').html("");
        for (i = 0; i < 12; i++) {

          let abstract = (data.results[i].abstract);
          let imgURL = (data.results[i].multimedia[4].url)

          $('.newPage').append(`<article class = "box${i}"><p>${abstract}</p></article>`);
          $(`.box${i}`).css('background-image', `url("${imgURL}")`);
          $(`.box${i}`).css('background-position', 'center center');
          $(`.box${i}`).css('background-size', `cover`);
        };
        if ($(window).width() >= 1240) {
          $(".logo img").css("width", "16vh");
          $(".logo").css("margin-top", "19px");
          $("h1").css("margin-top", "-75px");
        }



      });
  })
})

