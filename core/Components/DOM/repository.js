/**
 * Storage for references to DOM elements
 */
Eternity.Components.DOM.Repository = function(event) {
  /**
   * @type Eternity.Components.DOM.Repository
   */
  var _me = this;

  /**
   * @type Element[]
   */
  var _elements = [];

  /**
   * @type mixed[]
   */
  var _ids = [];

  /**
   * @type Object[]
   */
  var _fields = [];

  /**
   * @type String
   */
  var _event = '';

  /**
   * Constructor
   * 
   * @param {Eternity.Components.EventManager.EventManager} eventManager
   */
  var _construct = function(event) {
    _event = event;
  };

  /**
   * Add element to repository
   * 
   * @param {Element|Element[]} element
   * @returns {DOMRepository}
   */
  this.add = function(element) {
    if (element instanceof Array || element instanceof NodeList) {
      _addElements(element);
    } else {
      _addElement(element);
    }
  };

  /**
   * Get elements from repository
   * 
   * @param {String[]} ids
   * @returns {Element[]|[]}
   */
  this.get = function(ids) {
    var elements = [],
        element,
        i;

    for (i = 0; i < ids.length; i++) {
      if (element = this.getSingle(ids[i])) {
        elements.push(element);
      }
    }

    return elements;
  };

  /**
   * Get single element, first encountered and correct by filter
   * 
   * @param {String} id
   * @returns {Element|null}
   */
  this.getSingle = function(id){
    var i;

    for (i = 0; i < _elements.length; i++) {
      if (_elements[i].id === id) {
        return _elements[i];
      }
    }

    return null;
  };

  /**
   * DOM element value updater
   * 
   * @param {String} id - element identifier
   * @param {mixed} value - value to set
   */
  this.setValue = function(id, value) {
    var el = _me.getSingle(id);

    if (el) {
      _trace(id, value);
      el.value = value;
    }
  };

  /**
   * Get all logged changes
   * 
   * @returns {Object[]}
   */
  this.getTrace = function() {
    return _fields;
  };

  /**
   * Get event subscribers
   * 
   * @returns {Object[]}
   */
  this.getSubscribers = function() {
    return [{
      event: _event,
      handler: function() {
        _clearTrace.call(_me);
      }
    }];
  };

  /**
   * Clear log info
   */
  var _clearTrace = function() {
    _fields = [];
  };

  /**
   * Each change of element's value through repository.setValue method,
   * should be logged
   * 
   * @param {String} field - field
   * @param {mixed} value - value to set
   */
  var _trace = function(field, value) {
    _fields.push({
      field: field,
      value: value
    });
  };

  /**
   * Add array of elements
   * 
   * @param {Element[]} elements
   */
  var _addElements = function(elements) {
    var i;

    for (i = 0; i < elements.length; i++) {
      _addElement(elements[i]);
    }
  };

  /**
   * Add single element
   * 
   * @param {Element} element
   * @returns {DOMRepository}
   * @throws {Error} if element doesn't have id property or
   * element id already used by another element
   */
  var _addElement = function(element) {
    if ('undefined' === typeof element.id) {
      throw new Error('Missing id property for element');
    }

    if (-1 !== _ids.indexOf(element.id)) {
      throw new Error('Element with id "' + element.id + '" already registered');
    }

    _ids.push(element.id);
    _elements.push(element);
  };

  _construct.call(this, event);
};