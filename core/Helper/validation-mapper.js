/**
 * Fields validation mapper
 */
Eternity.Helper.ValidationMapper = function(){
  /**
   * @type Eternity.Helper.ValidationMapper
   */
  var _me = this;

  /**
   * @type mixed[]
   */
  var _constraints = [];
  
  /**
   * Constructor
   */
  var _construct = function() {
    
  };

  /**
   * Add field constraint
   * 
   * @param {String} field - field name
   * @param {Function} constraint - constraint
   * @param {String} message - error message
   * @returns {Eternity.Helper.ValidationMapper}
   */
  this.add = function(field, constraint, message){
    if(_me.hasConstraint(field)){
      throw new Error('Constraint for the field "' + field + '" already exists');
    }

    _constraints.push({
      field: field,
      constraint: constraint,
      message: message
    });

    return this;
  };

  /**
   * Check for field constraint existance
   * 
   * @param {String} field - field to test
   * @returns {Boolean}
   */
  this.hasConstraint = function(field){
    return !!_me.getConstraint(field);
  };

  /**
   * Get field constraint
   * 
   * @param {String} field - field name
   * @returns {mixed[]|null} constraint or null if field doesn't have constraint
   */
  this.getConstraint = function(field){
    var i;

    for(i = 0; i < _constraints.length; i++){
      if(_constraints[i].field == field){
        return _constraints[i];
      }
    }

    return null;
  };

  /**
   * Get all registered constraints
   * 
   * @returns {mixed[]}
   */
  this.getConstraints = function() {
    return _constraints;
  };
  
  _construct.call(this);
};