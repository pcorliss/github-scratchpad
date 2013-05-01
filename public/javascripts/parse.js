console.log("Loaded parse.js");

$(function() {
  console.log("Dom Ready");

  htmlTarget = $('#htmlTarget');

  markdownChanged = function() {
    markdownToConvert = $('#markdownSource').val();
    console.log("Change Event", markdownToConvert);
    $.ajax({
      type: "POST",
      url: "/parse",
      data: {
        markdown: markdownToConvert
      },
      success: function(data){
        console.log("Success:", data);
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
