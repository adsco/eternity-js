/**
 * RuleMapper helper, used for direct retrieving of execution queues,
 * for example, when change of value in 1 element causes changes in another
 * and so on
 * 
 * @param {Eternity.Helper.RuleMapper} ruleMapper
 */
Eternity.Helper.RuleMapperHelper = function(ruleMapper) {
    /**
     * Eternity.Helper.RuleMapper
     */
    var _ruleMapper = null;
    
    /**
     * Constructor
     * 
     * @param {Eternity.Helper.RuleMapper} ruleMapper
     */
    var _construct = function(ruleMapper) {
        if ('Eternity.Helper.RuleMapper' !== typeof ruleMapper) {
            throw new Error('Eternity.Helper.RuleMapper required, ' + typeof(ruleMapper) + ' passed');
        }
        
        _ruleMapper = ruleMapper;
    };
    
    /**
     * Get execution queue for all mapped rules
     * 
     * @return {mixed[]}
     */
    this.getQueueAll = function() {
        
    };

    /**
     * Get execution queue for single rule
     * 
     * @param {String} identifier - field identifier
     * @return {mixed[]}
     */
    this.getQueueSingle = function(identifier) {
        
    };
    
    _construct.call(this, ruleMapper);
};