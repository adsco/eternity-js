/**
 * document.querySelector query builder
 */
Eternity.Helper.QueryBuilder = function() {
  /**
   * Cached named queries
   * @type Array
   */
  var _queries = [];

  /**
   * Current active query
   * 
   * @type Array
   */
  var _query = null;

  /**
   * Builder starter
   * 
   * @param {string|undefined} name - query could be named is string passed
   * @returns {QueryBuilder}
   */
  this.createQuery = function(name) {
    if ('undefined' !== typeof name) {
      _query.name = name;
    }

    _refreshQuery();

    return this;
  };

  /**
   * Create query
   * 
   * @returns {string} query ready for use
   * @throws {Error} if case of empty query error will be thrown
   */
  this.getQuery = function() {
    var query = _getTag() + _getId() + _getClasses() + _getAttributes();

    if ('' === query) {
      throw new Error('Cannot create query, tag, id, classes or attributes must be set');
    }

    //save query for future use
    if ('undefined' !== _query.name) {
      _queries.push({name: _query.name, query: query});
    }

    return query;
  };

  /**
   * Append tag parameter to query
   * 
   * @param {string} tag
   * @returns {QueryBuilder}
   */
  this.setTag = function(tag) {
    _query.tag = tag;

    return this;
  };

  /**
   * Set query id
   * 
   * @param {mixed} id
   * @returns {QueryBuilder}
   */
  this.setId = function(id) {
    _query.id = id;

    return this;
  };

  /**
   * Add class to query
   * 
   * @param {string} cls
   * @returns {QueryBuilder}
   */
  this.addClass = function(cls) {
    _query.classes.push(cls);

    return this;
  };

  /**
   * Add search attribute
   * 
   * @param {Object} attribute - JSON object
   * @returns {QueryBuilder}
   */
  this.addAttribute = function(attribute) {
    if ('undefined' === typeof attribute.name) {
      throw new Error('attribute name must be set');
    }

    if ('undefined' === typeof attribute.value) {
      throw new Error('attribute value must be set');
    }

    _query.attributes.push(attribute);

    return this;
  };

  /**
   * Get tag representation
   * 
   * @returns {String}
   */
  var _getTag = function() {
    return null === _query.tag ? '' : _query.tag;
  };

  /**
   * Get id representation
   * 
   * @returns {String}
   */
  var _getId = function() {
    return null === _query.id ? '' : '#' + _query.id;
  };

  /**
   * Get classes representation
   * 
   * @returns {String}
   */
  var _getClasses = function() {
    var classes = _query.classes.join('.');

    if (_query.classes.length) {
      classes = '.' + classes;
    }

    return classes;
  };

  /**
   * Get attributes representation
   * 
   * @returns {String}
   */
  var _getAttributes = function() {
    var attributes = '',
        attribute,
        i;

    for (i = 0; i < _query.attributes.length; i++) {
      attribute = _query.attributes[i];
      attributes += '[' + attribute.name + '="' + attribute.value + '"]';
    }

    return attributes;
  };

  /**
   * Reset current query
   */
  var _refreshQuery = function() {
    _query = {
      tag: null,
      id: null,
      classes: [],
      attributes: []
    };
  };
};