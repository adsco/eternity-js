/**
 * RuleMapper helper, used for direct retrieving of execution queues,
 * for example, when change of value in 1 element causes changes in another
 * and so on
 * 
 * @param {Eternity.Helper.RuleMapper} ruleMapper
 */
Eternity.Helper.RuleMapperQueue = function(ruleMapper) {
    /**
     * @type Eternity.Helper.RuleMapper
     */
    var _ruleMapper = null;
    
    /**
     * @type String[]
     */
    var _queue = [];
    
    /**
     * @type String[]
     */
    var _stack = [];
    
    /**
     * Constructor
     * 
     * @param {Eternity.Helper.RuleMapper} ruleMapper
     */
    var _construct = function(ruleMapper) {
        if (!ruleMapper instanceof Eternity.Helper.RuleMapper) {
            throw new Error('Eternity.Helper.RuleMapper required, ' + typeof(ruleMapper) + ' passed');
        }
        
        _ruleMapper = ruleMapper;
    };
    
    /**
     * Get execution queue for all mapped rules
     * 
     * @return {mixed[]}
     */
    this.getCompleteRuleQueue = function() {
      //get all roots - gonna be starting point
      var map = _ruleMapper.getAll(),
          roots = _getAllRoots(map),
          stack;
      
      //go up to leaves, level by level and stack walk path
      stack = _removeDuplicates(_walkToLeaves(roots));
      
      return stack.reverse();
    };
    
    /**
     * Get roots of all mapped fields
     * 
     * @param {mixed[]} map - whole map
     * @returns {Array}
     */
    var _getAllRoots = function(map) {
      var roots = [],
          key;
      
      for (key in map) {
        if (!map.hasOwnProperty(key)) {
          continue;
        }
        
        roots = Array.prototype.concat(roots, _getRoots(map[key]));
      }
      
      return roots;
    };
    
    /**
     * Get single mapped field roots
     * 
     * @param {mixed[]} map - mapped element
     * @returns {Array}
     */
    var _getRoots = function(map) {
      var roots = [],
          rules,
          i;
  
      for (i = 0; i < map.length; i++) {
        rules = _getRules(map[i].target);
        if (0 === rules.length) {
          roots.push(map[i]);
        }
      }
      
      return roots;
    };
    
    var _getRules = function(target) {
      return _ruleMapper.getMapByInitiator(target);
    };
    
    var _walkToLeaves = function(roots, stack) {
      var queue = [],
          i;
  
      if ('undefined' === typeof stack) {
        stack = [];
      }
      
      for (i = 0; i < roots.length; i++) {
        queue = Array.prototype.concat(queue, _getInitiators(roots[i].field));
        
        //stack up walk path
        stack.push(roots[i]);
      }
      
      //continue until all nodes passed
      if (queue.length > 0) {
        return _walkToLeaves(queue, stack);
      } else {
        return stack;
      }
    };
    
    var _getInitiators = function(field) {
      return _ruleMapper.getTargetInitiators(field);
    };
    
    var _removeDuplicates = function(map) {
      var duplicateFreeMap = [],
          reservedMap = [],
          i;
      
      for (i = 0; i < map.length; i++) {
        if (-1 === reservedMap.indexOf(map[i].target)) {
          duplicateFreeMap.push(map[i]);
          reservedMap.push(map[i].target);
        }
      }
      
      return duplicateFreeMap;
    };

    _construct.call(this, ruleMapper);
};