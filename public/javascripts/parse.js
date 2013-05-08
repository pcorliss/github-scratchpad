$(function() {
  htmlTarget = $('#htmlTarget');

  markdownChanged = function() {
    markdownToConvert = $('#markdownSource').val();
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
        console.log("Error:", data, textStatus);
      },
    });
  };

  $('#markdownSource').bind('keypress', markdownChanged)
  markdownChanged();
});
