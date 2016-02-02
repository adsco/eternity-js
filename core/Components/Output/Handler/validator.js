Eternity.Components.Output.Handler.Validator = function(domRepository, floater){
    var RESULT_TYPE = 'validation-check';
    
    var _domRepository = null;
    
    var _floater = null;
    
    var _construct = function(domRepository, floater){
        _domRepository = domRepository;
        _floater = floater;
    };
    
    this.supports = function(result){
        return result.type === RESULT_TYPE;
    };
    
    this.handle = function(result){
        var field,
            position,
            i;

        for(i = 0; i < result.data.length; i++){
            if(false === result.data[i].success){
                field = _domRepository.getSingle(result.data[i].field);
                position = _getAbsolutePosition(field);
                floater.show(position.x, position.y, result.data[i].message);
                console.log('Validation failed for field "' + result.data[i].field + '", error message: "' + result.data[i].message + '"');
            }
        }
    };
    
    var _getAbsolutePosition = function(element){
        var x = 0,
            y = 0,
            parent = element;
        
        while(parent){
            x += parseFloat(parent.offsetLeft);
            y += parseFloat(parent.offsetTop);
            
            parent = parent.offsetParent;
        }
        
        return {
            x: x,
            y: y
        };
    };
    
    _construct.call(this, domRepository, floater);
};