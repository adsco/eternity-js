function Floater(){
    var _container = null;
    
    var _construct = function(){
        _container = document.getElementById('error-container');
    };
    
    this.show = function(x, y, message){
        _container.style.top = y + 'px';
        _container.style.left = x + 'px';
        _container.innerHTML = message;
    };
    
    _construct.call(this);
}