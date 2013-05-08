exports.parse = function(marked) {
  return function(req, res){
    var markdown = req.body.markdown;
    var html = marked(markdown);
    res.send({
      html: html
    });
  };
};
