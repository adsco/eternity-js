/**
 * Element pattern with corresponding event will be passed here.
 * This class will be responsible for value update and data providing.
 * Update handlers will be registered lately in smth like update method
 * where all registered update handlers will be registered
 * 
 * @see trackable-factory.js
 */
function DOMObserver(crawler, elementBinder){
    var _crawler = null;
    
    var _elementBinder = null;
    
    var _elements = [];
    
    var _handler = function(e){
        console.log(e);
    };
    
    var _construct = function(crawler, elementBinder){
        _crawler = crawler;
        _elementBinder = elementBinder;
        
//        {
//            pattern: '',
//            events: '',
//            attributes: ''
//        }
    };
    
    this.addTrackable = function(trackable){
        var elements = _crawler.getElements({tag: 'body'}, trackable.pattern),
            i;
        
        for(i = 0; i < elements.length; i++){
            _elementBinder.attachListener(elements[i], trackable.events, _handler);
            _registerElement(elements[i]);
        }
    };
    
    var _registerElements = function(elements){
        var i;
        
        for(i = 0; i < elements.length; i++){
            _registerElement(elements[i]);
        }
    };
    
    var _registerElement = function(element){
        _elements.push(element);
    };
    
    _construct.call(this, crawler, elementBinder);
}