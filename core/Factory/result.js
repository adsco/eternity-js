/**
 * Standard result factory
 */
Eternity.Factory.Result = function() {
  /**
   * Create result template
   * 
   * @returns {Object}
   */
  this.create = function() {
    return {
      type: null,
      data: null
    };
  };
};