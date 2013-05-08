exports.index = function(req, res){
  var fs = require('fs');
  var filepath = 'sample_text.md';

  fs.readFile(filepath, 'utf8', function(err, data) {
    if(err) {
      console.error("Could not open file: %s", err);
    }
    res.render('index', {
      title: 'Github Markdown Scratchpad',
      sample_text: data
    });
  });
};
