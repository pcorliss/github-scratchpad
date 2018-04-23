var renderers = {
  'github': 'https://api.github.com/markdown',
  'local': '/parse'
};

var currentRenderer = 'local';
var remainingGitHub = '?';

$(function() {
  var htmlTarget = $('#htmlTarget');

  var markdownChanged = function(event) {
    // Need to exit early if the debounce came in ater the toggle
    if(event !== undefined && currentRenderer === 'github') {
      console.log("Exit Early");
      return true;
    }
    var markdownToConvert = $('#markdownSource').val();
    var data = {
      text: markdownToConvert,
      mode: "gfm"
    };

    if (currentRenderer === 'github') {
      data = JSON.stringify(data);
    }

    $.ajax({
      type: "POST",
      url: renderers[currentRenderer],
      data: data,
      success: function(data, textStatus, request){
        htmlTarget.html(data);
        var rateLimit = request.getResponseHeader('X-RateLimit-Remaining');
        if(rateLimit) {
          remainingGitHub = rateLimit;
        }
        renderGitHubRateLimit();
      },
      error: function(data, textStatus){
        console.error(data, textStatus);
      },
    });
  };

  var debouncedMarkdownChanged = _.debounce(markdownChanged, 300);
  markdownChanged();

  var renderGitHubRateLimit = function() {
    console.log("");
    $('.githubRateLimit').text(remainingGitHub + " GitHub API calls remaining in this hour.");
  };

  var setRenderer = function(name) {
    currentRenderer = name;
    $('.rendererText').text('Rendering using ' + name + ' renderer');
    if(name === 'local'){
      $('.rendererText').append(', no rate limit');
      $('#markdownSource').bind('keyup change', debouncedMarkdownChanged);
    } else {
      $('#markdownSource').unbind();
      renderGitHubRateLimit();
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
