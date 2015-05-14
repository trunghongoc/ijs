$(document).ready(function() {
  var codeArea = $('#code');
  var editor = CodeMirror.fromTextArea(codeArea[0], {
    indentUnit: 4,
    lineWrapping: true,
    mode: "javascript",
    theme: "eclipse"
  });
  
  var Context = (function() {
    var canvas = $("#render")[0];
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    function clearWindow() {
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    return {
      canvas: canvas,
      clear: clearWindow
    };
  })();
  
  editor.on("change", function(cm, change) {                   
    try {        
      var f = new Function(cm.getValue());
      f.call(Context);
    } catch(err) {
      console.log(err);
    }
  });
});