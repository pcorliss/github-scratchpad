exports.parse = function(marked) {
  return function(req, res){
    var markdown = req.body.text;
    var html = marked(markdown);
    res.send(html);
  };
};
