Eternity.Helper.ValidationMapper = function(){
    var _me = this;
    
    var _constraints = [];
    
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
    
    this.hasConstraint = function(field){
        return !!_me.getConstraint(field);
    };
    
    this.getConstraint = function(field){
        var i;
        
        for(i = 0; i < _constraints.length; i++){
            if(_constraints[i].field == field){
                return _constraints[i];
            }
        }
        
        return null;
    };
};