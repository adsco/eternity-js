/**
 * Floating window
 */
function Floater(){
  /**
   * @type Element
   */
  var _container = null;

  /**
   * Constructor
   */
  var _construct = function(){
    _container = document.getElementById('error-container');
  };

  /**
   * Show message
   * 
   * @param {Integer} x - x coordinate of floating window
   * @param {Integer} y - y coordinate of floating window
   * @param {String} message - message to display
   */
  this.show = function(x, y, message){
    _container.style.top = y + 'px';
    _container.style.left = x + 'px';
    _container.innerHTML = message;
  };

  _construct.call(this);
}