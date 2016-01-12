/**
 * Handler interface
 */
function HandlerBase(){
    /**
     * Method should define, is this handler should be executed for triggered field
     * 
     * @param {Element} element - element that triggered
     * @param {Event} e - triggered event
     * @returns {Boolean}
     */
    this.supports = function(element, e){
        
    };
    
    /**
     * Method should handle triggered field
     * 
     * @param {Element} element - element that triggered
     * @param {Event} e - triggered event
     * @returns {Result} @see factory/result-factory.js
     */
    this.handle = function(element, e){
        
    };
}