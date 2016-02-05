/**
 * RuleMapper helper, used for direct retrieving of execution queues,
 * for example, when change of value in 1 element causes changes in another
 * and so on
 * 
 * @param {Eternity.Helper.RuleMapper} ruleMapper
 */
Eternity.Helper.RuleMapperHelper = function(ruleMapper) {
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
        while (_queue.length) {
            _bfs();
        }
    };

    /**
     * Get execution queue for single rule
     * 
     * @todo clear _nodes before returning result
     * 
     * @param {String} identifier - field identifier
     * @return {mixed[]}
     */
    this.getQueueSingle = function(identifier) {
        //reset all runtime variables
        _resetNodes();
        //build execution queue
        _buildExecutionQueue(identifier);
        
        return _nodes;
    };
    
    /**
     * Reset nodes
     */
    var _resetNodes = function() {
        _nodes = [];
    };
    
    /**
     * Nodes whos value must be recalculated
     * 
     * @param {String} identifier - field identifier that triggered event
     */
    var _buildExecutionQueue = function(identifier) {
        _getNodes(identifier);
    };
    
    /**
     * Go 1 level down of element tree
     * 
     * @param {String} identifier - field identifier that triggered error
     */
    var _getNodes = function(identifier) {
        var targets = _ruleMapper.getMapByInitiator(identifier),
            i;
    
        if (!targets.length) {
            return false;
        }
        
        for(i = 0; i < targets.length; i++){
            _nodes.push(targets[i].target);
            _getNodes(targets[i].target);
        }
    };
    
    /**
     * Breadth first search
     * 
     * @param {String} identifier - node identifier
     */
    var _bfs = function(identifier) {
        //push node initiators to global queue
        _queue.push( _ruleMapper.getTargetInitiators(identifier) );
        
        //push node to global stack
        _stack.push(identifier);
    };
    
    _construct.call(this, ruleMapper);
};