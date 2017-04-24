var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/javascript");
editor.setOptions({fontSize: "11pt"});
var enemycode = ace.edit("editor2");
enemycode.setReadOnly(true);
enemycode.setTheme("ace/theme/monokai");
enemycode.getSession().setMode("ace/mode/javascript");
enemycode.setOptions({fontSize: "11pt"});
