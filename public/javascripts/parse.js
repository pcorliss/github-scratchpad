var renderers = {
  'github': 'https://api.github.com/markdown',
  'local': '/parse'
};

var currentRenderer = 'local';

$(function() {
  var htmlTarget = $('#htmlTarget');

  var markdownChanged = function(event) {
    // Need to exit early if the debounce came in ater the toggle
    if(event != undefined && currentRenderer == 'github') {
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
      success: function(data){
        htmlTarget.html(data);
      },
      error: function(data, textStatus){
        console.error(data, textStatus);
      },
    });
  };

  var debouncedMarkdownChanged = _.debounce(markdownChanged, 300);
  //$('#markdownSource').bind('keyup change', debouncedMarkdownChanged);
  markdownChanged();

  var setRenderer = function(name) {
    currentRenderer = name;
    $('.rendererText').text('Rendering using ' + name + ' renderer');
    if(name == 'local'){
      $('#markdownSource').bind('keyup change', debouncedMarkdownChanged);
    } else {
      $('#markdownSource').unbind();
    }
  };

  var toggleRenderer = function() {
    var names = Object.keys(renderers);
    var renderIndex = (names.indexOf(currentRenderer) + 1) % 2;
    setRenderer(names[renderIndex]);
  };

  $('.toggleRenderer').click(toggleRenderer);

  setRenderer(currentRenderer);
});
