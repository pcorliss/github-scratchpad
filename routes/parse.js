//var marked = require('marked');

//console.log(marked('i am using __markdown__.'));

/*
 * POST /parse
 */



exports.parse = function(marked) {
  return function(req, res){
    console.log("Params:", req.body);
    var markdown = req.body.markdown;
    var html = marked(markdown);
    res.send({
      html: html
    });
  };

};
