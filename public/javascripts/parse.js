var renderers = {
  'github': 'https://api.github.com/markdown',
  'local': '/parse'
};

var currentRenderer = 'local';

$(function() {
  var htmlTarget = $('#htmlTarget');

  var markdownChanged = function() {
    var markdownToConvert = $('#markdownSource').val();
    $.ajax({
      type: "POST",
      url: renderers[currentRenderer],
      data: JSON.stringify({
        text: markdownToConvert,
        mode: "gfm"
      }),
      success: function(data){
        htmlTarget.html(data);
      },
      error: function(data, textStatus){
        console.error(data, textStatus);
      },
    });
  };

  var debouncedMarkdownChanged = _.debounce(markdownChanged, 300);
  $('#markdownSource').bind('keyup change', debouncedMarkdownChanged);
  markdownChanged();

  var setRenderer = function(name) {
    currentRenderer = name;
    $('.rendererText').text('Rendering using ' + name + ' renderer');
  };

  var toggleRenderer = function() {
    var names = Object.keys(renderers);
    var renderIndex = (names.indexOf(currentRenderer) + 1) % 2;
    setRenderer(names[renderIndex]);
  };

  $('.toggleRenderer').click(toggleRenderer);

  setRenderer(currentRenderer);
});
