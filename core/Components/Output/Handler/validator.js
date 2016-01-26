Eternity.Components.Output.Handler.Validator = function(domRepository){
    var RESULT_TYPE = 'validation-check';
    
    var _domRepository = null;
    
    var _construct = function(domRepository){
        _domRepository = domRepository;
    };
    
    this.supports = function(result){
        return result.type === RESULT_TYPE;
    };
    
    this.handle = function(result){
        var field,
            i;

        for(i = 0; i < result.data.length; i++){
            if(false === result.data[i].success){
                //field = _domRepository.get(result.data[i].field);
                console.log('Validation failed for field "' + result.data[i].field + '", error message: "' + result.data[i].message + '"');
            }
        }
    };
    
    _construct.call(this, domRepository);
};