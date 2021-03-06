$(document).ready(function() {
  var codeArea = $('#code');
  var editor = CodeMirror.fromTextArea(codeArea[0], {
    indentUnit: 4,
    lineWrapping: true,
    mode: "javascript",
    theme: "eclipse"
  });
  
  var Context = Class.extend({
    init: function() {
      this.canvas = document.getElementById("render");
      this.canvas.width = this.canvas.offsetWidth;
      this.canvas.height = this.canvas.offsetHeight;
    },
    clearWindow: function() {
      var ctx = this.canvas.getContext("2d");
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  });
  
  var Executor = Context.extend({
    init: function(code) {
      this.code = code;
      this._super();
    },
    execute: function() {
      try {        
        var f = new Function(this.code);
        f.call(this);
      } catch(err) {
        console.log(err);
      }
    }
  });
  
  editor.on("change", function(cm, change) {
    var e = new Executor(cm.getValue());
    e.execute();
  });
});
