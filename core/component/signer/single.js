function Single(elementCrawler, attribute){
    var _elementCrawler = null;
    
    var _attribute = null;
    
    var _construct = function(elementCrawler, attribute){
        _elementCrawler = elementCrawler;
        _attribute = attribute;
    };
    
    this.sign = function(element){
        var attributes = _elementCrawler.getAttributes(element, _attribute);
        
        return attributes[_attribute];
    };
    
    _construct.call(this, elementCrawler, attribute);
}