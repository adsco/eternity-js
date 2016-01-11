function DataProvider(dom, mapper){
    var _dom = null;
    var _mapper = null;
    
    var _result = [];
    
    var _construct = function(dom, mapper){
        _dom = dom;
        _mapper = mapper;
    };
    
    this.calculate = function(field){
        var map = getMap(field);
        
        if(map){
            map.handler(this);
            _result.push(field);
        }
    };
    
    this.getResult = function(){
        return _result;
    };
    
    var _getValue = function(field){
        var map = _mapper.get(field);
        
        if(map){
            this.calculate(map.field);
        } else {
            _dom.getValue(field);
        }
    };
    
    _construct.call(this, dom, mapper);
}