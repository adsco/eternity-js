function Mapper(){
    var _fields = [];
    
    this.add = function(field, handler){
        if(this.isMapped(field)){
            throw new Error('Field "' + field + '" already mapped');
        }
        
        _fields.push({
            field: field,
            handler: handler
        });
        
        return this;
    };
    
    this.get = function(field){
        var i;
        
        for(i = 0; i < _fields.length; i++){
            if(_fields[i].field === field){
                return _fields[i];
            }
        }
        
        return null;
    };
    
    this.isMapped = function(field){
        var fieldMap = this.get(field);
        
        if(fieldMap){
            return true;
        } else {
            return false;
        }
    };
    
    this.getHandler = function(field){
        var fieldMap = this.get(field);
        
        if(!fieldMap){
            throw new Error('Handler for field "' + field + '" is not found, field is not mapped');
        }
        
        return fieldMap.handler;
    };
}