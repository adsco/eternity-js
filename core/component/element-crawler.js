/**
 * Element's attributes retriever
 */
function ElementCrawler(){
    this.getAttributes = function(element, attributes){
        var result = {},
            i;
        
        for(i = 0; i < attributes.length; i++){
            result[attributes[i]] = _getAttribute(element, attributes[i]);
        }
        
        return result;
    };
    
    var _getAttribute = function(element, attribute){
        if('undefined' !== typeof element[attribute]){
            return element[attribute];
        } else {
            return element.getAttribute(attribute);
        }
    };
}
