$(function() {
  var htmlTarget = $('#htmlTarget');

  var markdownChanged = function() {
    var markdownToConvert = $('#markdownSource').val();
    $.ajax({
      type: "POST",
      url: "/parse",
      data: {
        markdown: markdownToConvert
      },
      success: function(data){
        htmlTarget.html(data.html)
      },
      error: function(data, textStatus){
        console.error(data, textStatus);
      },
    });
  };

  var debouncedMarkdownChanged = _.debounce(markdownChanged, 300);
  $('#markdownSource').bind('keyup change', debouncedMarkdownChanged)
  markdownChanged();
});
