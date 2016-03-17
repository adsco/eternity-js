/**
 * Value setter
 */
Eternity.Components.Worker.Writer.Writer = function(domRepository) {
    /**
     * @var Eternity.Components.DOM.Repository
     */
    var _domRepository = null;
    
    /**
     * Constructor
     * 
     * @param {Eternity.Components.DOM.Repository} domRepository - DOM repository
     */
    var _construct = function(domRepository) {
        _domRepository = domRepository;
    };
    
    /**
     * Values writer
     * 
     * @param {Object[]} data - data to write into elements
     */
    this.write = function(data) {
        var i;
        
        for (i = 0; i < data.length; i++) {
            if (data[i].hasOwnProperty('id')) {
                _domRepository.setValue(data[i].id, data[i].value);
            }
        }
    };
    
    _construct.call(this, domRepository);
};