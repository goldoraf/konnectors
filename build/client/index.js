var jade = require('jade/runtime');module.exports=
function template(locals) {
var jade_debug = [{ lineno: 1, filename: "./client/index.jade" }];
try {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (imports) {
jade_debug.unshift({ lineno: 0, filename: "./client/index.jade" });
jade_debug.unshift({ lineno: 1, filename: "./client/index.jade" });
buf.push("<!DOCTYPE html>");
jade_debug.shift();
jade_debug.unshift({ lineno: 2, filename: "./client/index.jade" });
buf.push("<html>");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 3, filename: "./client/index.jade" });
buf.push("<head>");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 4, filename: "./client/index.jade" });
buf.push("<title>");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 4, filename: jade_debug[0].filename });
buf.push("Konnectors");
jade_debug.shift();
jade_debug.shift();
buf.push("</title>");
jade_debug.shift();
jade_debug.unshift({ lineno: 5, filename: "./client/index.jade" });
buf.push("<meta charset=\"utf-8\">");
jade_debug.shift();
jade_debug.unshift({ lineno: 6, filename: "./client/index.jade" });
buf.push("<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge,chrome=1\">");
jade_debug.shift();
jade_debug.unshift({ lineno: 7, filename: "./client/index.jade" });
buf.push("<meta name=\"viewport\" content=\"width=device-width,initial-scale=1.0\">");
jade_debug.shift();
jade_debug.unshift({ lineno: 8, filename: "./client/index.jade" });
buf.push("<link rel=\"stylesheet\" href=\"stylesheets/app.css\">");
jade_debug.shift();
jade_debug.unshift({ lineno: 9, filename: "./client/index.jade" });
buf.push("<script src=\"socket.io/socket.io.js\">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.shift();
buf.push("</script>");
jade_debug.shift();
jade_debug.shift();
buf.push("</head>");
jade_debug.shift();
jade_debug.unshift({ lineno: 11, filename: "./client/index.jade" });
buf.push("<body>");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.unshift({ lineno: 12, filename: "./client/index.jade" });
buf.push("<div class=\"main-container\">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.shift();
buf.push("</div>");
jade_debug.shift();
jade_debug.unshift({ lineno: 13, filename: "./client/index.jade" });
buf.push("<script>" + (null == (jade_interp = imports) ? "" : jade_interp));
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.shift();
buf.push("</script>");
jade_debug.shift();
jade_debug.unshift({ lineno: 14, filename: "./client/index.jade" });
buf.push("<script src=\"javascripts/vendor.js\">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.shift();
buf.push("</script>");
jade_debug.shift();
jade_debug.unshift({ lineno: 15, filename: "./client/index.jade" });
buf.push("<script src=\"javascripts/app.js\" onload=\"require('initialize');\">");
jade_debug.unshift({ lineno: undefined, filename: jade_debug[0].filename });
jade_debug.shift();
buf.push("</script>");
jade_debug.shift();
jade_debug.shift();
buf.push("</body>");
jade_debug.shift();
jade_debug.shift();
buf.push("</html>");
jade_debug.shift();
jade_debug.shift();}.call(this,"imports" in locals_for_with?locals_for_with.imports:typeof imports!=="undefined"?imports:undefined));;return buf.join("");
} catch (err) {
  jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "doctype\nhtml\n  head\n    title Konnectors\n    meta(charset=\"utf-8\")\n    meta(http-equiv=\"X-UA-Compatible\", content=\"IE=edge,chrome=1\")\n    meta(name=\"viewport\", content=\"width=device-width,initial-scale=1.0\")\n    link(rel=\"stylesheet\", href=\"stylesheets/app.css\")\n    script(src=\"socket.io/socket.io.js\")\n\n  body\n    .main-container\n    script!= imports\n    script(src=\"javascripts/vendor.js\")\n    script(src=\"javascripts/app.js\", onload=\"require('initialize');\")\n");
}
}