var Main = (function() {

  var _init = function() {
    console.log("herro from main");
    Objects.init();
  }

  return {
    init: _init
  }
})();

$(document).ready(function() {
  Main.init();
});

