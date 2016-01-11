function Single(elementCrawler){
    var _elementCrawler = null;
    
    var _construct = function(elementCrawler){
        _elementCrawler = elementCrawler;
    };
    
    this.sign = function(element){
        var attributes = _elementCrawler.getAttributes(element, ['data-cell-id']);
        
        return attributes['data-cell-id'];
    };
    
    _construct.call(this, elementCrawler);
}