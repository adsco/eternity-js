/**
 * Validation result: {success: '', message: ''}
 */
Eternity.Components.Input.Handler.Validator = function(dataProvider, elementCrawler, validation, domRepository){
    var EVENT_TYPE = 'validation-check';
    
    var _validation = null;
    
    var _dataProvider = null;
    
    var _elementCrawler = null;
    
    var _domRepository = null;
    
    var _result = [];
    
    var _construct = function(dataProvider, elementCrawler, validation, domRepository){
        _dataProvider = dataProvider;
        _elementCrawler = elementCrawler;
        _validation = validation;
        _domRepository = domRepository;
    };
    
    this.supports = function(element, e){
        var identifier = elementCrawler.getAttribute(element, 'id');
        
        return validation.hasConstraint(identifier);
    };
    
    this.handle = function(element, e){
        var identifier = elementCrawler.getAttribute(element, 'id'),
            fields = _domRepository.getLog();
        
        _reset();
        
        //initiator field should be validated too
        fields.push({
            field: identifier,
            value: dataProvider.getValue(identifier)
        });
        
        _validate(fields);
        
        //@todo tmp dom repository log clearer
        //should be moved to event listener 
        //and should be executed before trigger action
        _domRepository.clearLog();
        
        return _getResult();
    };
    
    var _validate = function(fields){
        var constraint,
            result,
            i;
        
        for(i = 0; i < fields.length; i++){
            constraint = _validation.getConstraint(fields[i].field);
            if(constraint){
                result = constraint.constraint(dataProvider);
                if('boolean' !== typeof result){
                    throw new Error('Contraint result must be boolean value');
                }
                
                //set message only if validation fails
                _appendResult(fields[i].field, result, false === result ? constraint.message : '');
            }
        }
    };
    
    var _appendResult = function(field, result, message){
        _result.push({
            field: field,
            success: result,
            message: message
        });
    };
    
    var _reset = function(){
        _result = [];
    };
    
    var _getResult = function(){
        return {
            type: EVENT_TYPE,
            data: _result
        };
    };
    
    _construct.call(this, dataProvider, elementCrawler, validation, domRepository);
};