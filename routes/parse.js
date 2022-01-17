exports.parse = function(marked) {
  return function(req, res){
    var markdown = req.body.text;
    var html = marked.parse(markdown);
    res.send(html);
  };
};
