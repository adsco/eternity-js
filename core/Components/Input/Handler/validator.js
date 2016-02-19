/**
 * Validation result: {success: '', message: ''}
 */
Eternity.Components.Input.Handler.Validator = function(dataProvider, elementCrawler, validation, domRepository) {
  /**
   * @type String
   */
  var EVENT_TYPE = 'validation-check';

  /**
   * @type String
   */
  var EVENT_VALIDATE_ALL = 'validate-all';

  /**
   * @type Eternity.Helper.ValidationMapper
   */
  var _validation = null;

  /**
   * @type Eternity.Components.Provider.Data
   */
  var _dataProvider = null;

  /**
   * @type Eternity.Components.DOM.Element.Crawler
   */
  var _elementCrawler = null;

  /**
   * @type Eternity.Components.DOM.Repository
   */
  var _domRepository = null;

  /**
   * @type Object[]
   */
  var _result = [];

  /**
   * Constructor
   * 
   * @param {Eternity.Components.Provider.Data} dataProvider
   * @param {Eternity.Components.DOM.Element.Crawler} elementCrawler
   * @param {Eternity.Helper.ValidationMapper} validation
   * @param {Eternity.Components.DOM.Repoitory} domRepository
   */
  var _construct = function(dataProvider, elementCrawler, validation, domRepository) {
    _dataProvider = dataProvider;
    _elementCrawler = elementCrawler;
    _validation = validation;
    _domRepository = domRepository;
  };

  /**
   * Is field should be handled by this handler
   * 
   * @param {Element} element
   * @param {Event} e
   * @returns {Boolean}
   */
  this.supports = function(element, e) {
    var identifier = elementCrawler.getAttribute(element, 'id');

    if (e.type == EVENT_VALIDATE_ALL) {
      return true;
    }

    return validation.hasConstraint(identifier);
  };

  /**
   * Implementation of HandlerBase.handle, @see handler/handler-base.js
   * Logic: stack list of all nodes whos values need to be recalculated
   * then perform up down calculations, caching intermadiate calculation
   * result.
   * 
   * @param {Element} element
   * @param {Event} e
   * @returns {Eternity.Factory.Result}
   */
  this.handle = function(element, e) {
    _reset();

    if (e.type == EVENT_VALIDATE_ALL) {
      return _runAllValidations();
    } else {
      return _runSingleValidation(element, e);
    }
  };

  /**
   * Run all validations at once
   * 
   * @returns {mixed[]}
   */
  var _runAllValidations = function() {
    var validations = validation.getConstraints(),
        i;

    for (i = 0; i < validations.length; i++) {
      _runValidation(validations[i].field, validations[i]);
    }

    return _getResult();
  };

  /**
   * Run single field onchange validation
   * 
   * @param {Element} element
   * @param {Event} e
   * @returns {mixed[]}
   */
  var _runSingleValidation = function(element, e) {
    var identifier = elementCrawler.getAttribute(element, 'id'),
          fields = _domRepository.getTrace();

    //initiator field should be validated too
    fields.push({
      field: identifier,
      value: dataProvider.getValue(identifier)
    });

    _validate(fields);

    return _getResult();
  };

  /**
   * Validate field values using validation mapper
   * 
   * @param {Object[]} fields
   */
  var _validate = function(fields) {
    var constraint,
        i;

    for (i = 0; i < fields.length; i++) {
      if (constraint = _validation.getConstraint(fields[i].field)) {
        _runValidation(fields[i].field, constraint);
      }
    }
  };

  /**
   * Constraint execution
   * 
   * @param {String} field - field name
   * @param {mixed} constraint - constraint
   */
  var _runValidation = function(field, constraint) {
    var result;

    result = constraint.constraint(_dataProvider);
    if ('boolean' !== typeof result) {
      throw new Error('Contraint result must be boolean value');
    }

    //set message only if validation fails
    _appendResult(field, result, false === result ? constraint.message : '');
  };

  /**
   * Append field result to result summary
   * 
   * @param {String} field
   * @param {Boolean} result
   * @param {String} message
   */
  var _appendResult = function(field, result, message) {
    _result.push({
      field: field,
      success: result,
      message: message
    });
  };

  /**
   * Clear recent results from result summary
   */
  var _reset = function() {
    _result = [];
  };

  /**
   * Get result summary
   * 
   * @returns {Object}
   */
  var _getResult = function() {
    return {
      type: EVENT_TYPE,
      data: _result
    };
  };

  _construct.call(this, dataProvider, elementCrawler, validation, domRepository);
};