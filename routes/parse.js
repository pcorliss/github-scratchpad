var marked = require('marked');
// Initialize marked
marked.setOptions({
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  langPrefix: 'language-',
  highlight: function(code, lang) {
    if (lang === 'js') {
      return highlighter.javascript(code);
    }
    return code;
  }
});

console.log(marked('i am using __markdown__.'));

/*
 * POST /parse
 */

exports.parse = function(req, res){
  console.log("Params:", req.body);
  markdown = req.body.markdown;
  html = marked(markdown);
  res.send({
    html: html
  });
};
