/**
 * Result handler interface
 */
function ResultHandlerBase(){
    /**
     * Method should define is this handler can|would handle given result object
     * 
     * @param {Result} result
     * @returns {Boolean} true if can handle, otherwise false
     */
    this.supports = function(result){
        
    };
    
    /**
     * Handle result entry point
     * 
     * @param {Result} result
     */
    this.handle = function(result){
        
    };
}