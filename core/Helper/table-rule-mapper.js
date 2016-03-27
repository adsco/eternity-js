Eternity.Helper.TableRuleMapper = function() {
    var _me = this;
    
    var _map = {};
    
    this.map = function(initiators, target, rule) {
        var i;
        
        for (i = 0; i < initiators.length; i++) {
            _addMap(initiators[i], target, rule);
        }
    };
    
    this.getRule = function(identifier) {
        if (!_me.isMapped(identifier)) {
            throw new Error('Field "' + identifier + '" is not found');
        }
        
        return _map[identifier];
    };
    
    this.isMapped = function(field) {
        return _map[field] ? true : false;
    };
    
    var _addMap = function(field, target, handler) {
        if (!_me.isMapped(field)) {
            _createMap(field);
        }
        
        _map[field] = {
            field: field,
            target: target,
            handler: handler
        };
    };
    
    var _createMap = function(field) {
        if (_map.hasOwnProperty(field)) {
            throw new Error('Field "' + field + '" already exists');
        }
        
        _map[field] = [];
        
        return _map[field];
    };
};