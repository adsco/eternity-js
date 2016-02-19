/**
 * Router responsible for guiding input to proper handler and handling result
 * to result handler
 * 
 * @param {type} inputResolver
 * @param {type} outputResolver
 */
Eternity.Components.Router.Router = function(inputResolver, outputResolver) {
  /**
   * @type Eternity.Components.Input.Resolver.Resolver
   */
  var _inputResolver = null;

  /**
   * @type Eternity.Components.Output.Resolver.Resolver
   */
  var _outputResolver = null;

  /**
   * Constructor
   * 
   * @param {Eternity.Components.Input.Resolver.Resolver} inputResolver - input resolver
   * @param {Eternity.Components.Output.Resolver.Resolver} outputResolver - output resolver
   */
  var _construct = function(inputResolver, outputResolver) {
    _inputResolver = inputResolver;
    _outputResolver = outputResolver;
  };

  /**
   * Entry point for handling element/event
   * 
   * @param {Element} element - element
   * @param {Event} e - event
   */
  this.forward = function(element, e) {
    _handleInput(_getHandlers(element, e), element, e);
  };

  /**
   * Get handlers subscribed for given event
   * @todo reduce, filtering by subscription, overhead
   * 
   * @param {Element} element - element that triggered event
   * @param {Event} e - triggered event
   * @returns {Eternity.Components.Handler.Handler[]}
   */
  var _getHandlers = function(element, e) {
    return _inputResolver.resolve(element, e);
  };

  /**
   * Handle input
   * 
   * @param {Eternity.Components.Input.Handler.Handler[]} handlers - handler
   * @param {Element} element - element
   * @param {Event} e - event
   */
  var _handleInput = function(handlers, element, e) {
    var result,
        i;

    for (i = 0; i < handlers.length; i++) {
      result = handlers[i].handle(element, e);

      _handleResult(result);
    }
  };

  /**
   * Handle result
   * 
   * @param {Eternity.Factory.Result} result
   */
  var _handleResult = function(result) {
    var handlers = _outputResolver.resolve(result),
        i;

    for (i = 0; i < handlers.length; i++) {
      handlers[i].handle(result);
    }
  };

  _construct.call(this, inputResolver, outputResolver);
};