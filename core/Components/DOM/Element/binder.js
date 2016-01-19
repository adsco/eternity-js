/**
 * Element binder, responsible for element listeners, decorating etc.
 * 
 * config 
 * {
 *     event: <event name>
 *     handler: <function>
 * }
 */
Eternity.Components.DOM.Element.Binder = function(){
    /**
     * Event listener binder
     * 
     * @param {Element} element - DOM element
     * @param {String[]} events - list of event to attach
     * @param {Function} handler - event handler
     * @return {ETernity.Components.DOM.Element.Binder}
     */
    this.attachListener = function(element, events, handler){
        var i;
        
        for(i = 0; i < events.length; i++){
            element.addEventListener(events[i], handler);
        }
        
        return this;
    };
};