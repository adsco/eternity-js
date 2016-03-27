Eternity.Components.Input.Handler.TableCalculus = function(domRepository, mapper) {
    Eternity.Components.Input.Handler.Handler.call(this);
    var _me = this;
    
    /**
     * @type Object
     */
    var _domRepository = null;
    
    /**
     * @type Object
     */
    var _mapper = null;
    
    /**
     * @type String
     */
    var RESULT_TYPE = 'table-update-value';
    
    /**
     * Constructor
     * 
     * @param {Eternity.Components.Provider.Data} dataProvider - data provider
     * @param {Eternity.Helper.TableRuleMapper} mapper - mapper
     * @returns {undefined}
     */
    var _construct = function(domRepository, mapper) {
        _domRepository = domRepository;
        _mapper = mapper;
    };
    
    this.supports = function(element, e) {
        if (e.type !== 'table-change') {
            return false;
        }
        
        if (!element || !element instanceof Eternity.Adapter.DOM.Element.Table) {
            return false;
        }
        
        return true;
    };
    
    this.handle = function(element, e) {
        var params = e.params;
        var map = _mapper.getRule(params.cell);
        
        return {
            type: RESULT_TYPE,
            data: {
                row: params.row,
                cell: map.target,
                value: map.handler(_me, params.row)
            }
        };
    };
    
    this.getValue = function(row, cell) {
        var table = _domRepository.getSingle('table-1');
        
        return table.getValue(row, cell);
    };
    
    _construct.call(this, domRepository, mapper);
};

Eternity.Components.Input.Handler.TableCalculus.prototype = Object.create(Eternity.Components.Input.Handler.Handler);
Eternity.Components.Input.Handler.TableCalculus.prototype.constructor = Eternity.Components.Input.Handler.TableCalculus;