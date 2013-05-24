var renderers = {
  'github': 'https://api.github.com/markdown',
  'local': '/parse'
};

var currentRenderer = 'local';
var remainingGithub = '?';

$(function() {
  var htmlTarget = $('#htmlTarget');

  var markdownChanged = function(event) {
    // Need to exit early if the debounce came in ater the toggle
    if(event != undefined && currentRenderer == 'github') {
      console.log("Exit Early");
      return true;
    }
    var markdownToConvert = $('#markdownSource').val();
    var data = {
      text: markdownToConvert,
      mode: "gfm"
    };

    if (currentRenderer == 'github') {
      data = JSON.stringify(data);
    }

    $.ajax({
      type: "POST",
      url: renderers[currentRenderer],
      data: data,
      success: function(data, textStatus, request){
        htmlTarget.html(data);
        rateLimit = request.getResponseHeader('X-RateLimit-Remaining');
        if(rateLimit) {
          remainingGithub = rateLimit;
        }
        renderGithubRateLimit();
      },
      error: function(data, textStatus){
        console.error(data, textStatus);
      },
    });
  };

  var debouncedMarkdownChanged = _.debounce(markdownChanged, 300);
  markdownChanged();

  var renderGithubRateLimit = function() {
    console.log("");
    $('.githubRateLimit').text(remainingGithub + " Github API calls remaining in this hour.");
  }

  var setRenderer = function(name) {
    currentRenderer = name;
    $('.rendererText').text('Rendering using ' + name + ' renderer');
    if(name == 'local'){
      $('.rendererText').append(', no rate limit');
      $('#markdownSource').bind('keyup change', debouncedMarkdownChanged);
    } else {
      $('#markdownSource').unbind();
      renderGithubRateLimit();
    }
  };

  var toggleRenderer = function() {
    var names = Object.keys(renderers);
    var renderIndex = (names.indexOf(currentRenderer) + 1) % 2;
    setRenderer(names[renderIndex]);
  };

  $('.toggleRenderer').click(toggleRenderer);
  $('.githubRender').click(function() {
    markdownChanged();
  });

  setRenderer(currentRenderer);
});
