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
    this.attachListener = function(element, events, handler){
        var i;
        
        for(i = 0; i < events.length; i++){
            element.addEventListener(events[i], handler);
        }
    };
};