function Calculus(dataProvider, mapper){
    var _dataProvider = null;
    
    var _mapper = null;
    
    var _result = [];
    
    /**
     * Constructor
     */
    var _construct = function(dataProvider, mapper){
        _dataProvider = dataProvider;
        _mapper = mapper;
    };
    
    this.supports = function(sign){
        
    };

    this.handle = function(element, e, sign){
        _result = [];
        _calculate(sign);
        
        return _result;
    };
    
    this.getValue = function(field){
        var map = _mapper.get(field);
        
        if(map){
            this.handle(map.field);
        } else {
            _dataProvider.getValue(field);
        }
    };
    
    var _calculate = function(sign){
        var map = _mapper.get(sign);
        
        if(map){
            _result.push({
                field: map,
                value: map.handler(this)
            });
        }
    };
    
    _construct.call(this, dataProvider, mapper);
}