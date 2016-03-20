/**
 * Base input resolver
 */
Eternity.Components.Input.Resolver.Resolver = function() {
    /**
     * @type Eternity.Components.Input.Resolver.Resolver
     */
    var _me = this;

    /**
     * @type Handler[]
     */
    var _handlers = [];

    /**
     * Sort function
     * 
     * @param {mixed} a - left side element
     * @param {mixed} b - right side element
     * @returns {Number}
     */
    var _sortFn = function(a, b) {
        if (a.priority === b.priority) {
            return 0;
        } else {
            return a.priority > b.priority ? 1 : -1;
        }
    };

    /**
     * Constructor
     */
    var _construct = function(){

    };

    /**
     * Add new handler
     * @param {Eternity.Components.Input.Handler.Handler} handler
     * @param {mixed} priority - priority of handler, lower - lower index
     */
    this.registerHandler = function(handler, priority) {
        _handlers.push({
            handler: handler,
            priority: _getPriority(priority)
        });

        _sortHandlers();

        return this;
    };

    /**
     * Handlers resolver
     * 
     * @param {Element} element - element
     * @param {Event} e - event triggered
     * @return {Eternity.Components.Input.Handler.Handler}
     */
    this.resolve = function(element, e) {
        return _getHandlers(element, e);
    };

    /**
     * Get list of handlers that can handle event triggered
     * 
     * @param {Element} element - element
     * @param {Event} e - event triggered
     * @param {String} type - handler type requested
     * @returns {Eternity.Components.Input.Handler.Handler[]}
     */
    var _getHandlers = function(element, e) {
        var handlers = [],
            i;

        for (i = 0; i < _handlers.length; i++) {
            if (_handlers[i].handler.supports(element, e)) {
                handlers.push(_handlers[i].handler);
            }
        }

        return handlers;
    };

    /**
     * Get safe priority value
     * 
     * @param {mixed} priority - priority to make safe
     * @returns {Number}
     */
    var _getPriority = function(priority) {
        var intPriority = parseInt(priority);

        if (isNaN(intPriority)) {
            return 0;
        }

        return intPriority;
    };

    /**
     * Sort handlers by priority level
     */
    var _sortHandlers = function() {
        _handlers.sort(_sortFn);
    };

    _construct.call(this);
};