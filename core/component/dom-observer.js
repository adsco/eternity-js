/**
 * Element pattern with corresponding event will be passed here.
 * This class will be responsible for value update and data providing.
 * Update handlers will be registered lately in smth like update method
 * where all registered update handlers will be registered
 * 
 * @see trackable-factory.js
 */
function DOMObserver(domCrawler, elementBinder){
    /**
     * @type DOMCrawler
     */
    var _domCrawler = null;
    
    /**
     * @type ElementBinder
     */
    var _elementBinder = null;
    
    /**
     * @type Element[]
     */
    var _elements = [];
    
    /**
     * Internal event handler
     * 
     * @param {Event} e
     */
    var _handler = function(e){
        var observableElement = _getElement(e.currentTarget),
            sign;
        
        if(null === observableElement){
            throw new Error('Element not found' + e.tagName);
        }
        
        sign = observableElement.signer.sign(observableElement.element);
    };
    
    var _construct = function(domCrawler, elementBinder){
        _domCrawler = domCrawler;
        _elementBinder = elementBinder;
        
//        {
//            pattern: '',
//            events: '',
//            signer: ''
//        }
    };
    
    this.addTrackable = function(trackable){
        var elements = _domCrawler.getElements({tag: 'body'}, trackable.pattern),
            i;
        
        for(i = 0; i < elements.length; i++){
            _elementBinder.attachListener(elements[i], trackable.events, _handler);
            _registerElement(elements[i], trackable.signer);
        }
    };
    
    var _registerElements = function(elements){
        var i;
        
        for(i = 0; i < elements.length; i++){
            _registerElement(elements[i]);
        }
    };
    
    var _registerElement = function(element, signer){
        _elements.push({
            element: element,
            signer: signer
        });
    };
    
    var _getElement = function(element){
        var i;
        
        for(i = 0; i < _elements.length; i++){
            if(_elements[i].element === element){
                return _elements[i];
            }
        }
        
        return null;
    };
    
    _construct.call(this, domCrawler, elementBinder);
}