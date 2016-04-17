Eternity.Adapter.DOM.Element.Input = function(element) {
    Eternity.Adapter.DOM.Element.Base.call(this);
    
    /**
     * @type Eternity.Adapter.DOM.Element.Input
     */
    var _me = this;
    
    /**
     * @type Element
     */
    var _element = null;
    
    /**
     * @type Object
     */
    var _config = {
        type: 'text',
        //convention - config parameters should be set like _config.<input type>.<config key>
        text: {
            //just an example
        },
        integer: {
            
        },
        float: {
            digits: 2
        }
    };
    
    /**
     * @type {Object}
     */
    var _services = {};
    
    /**
     * @type Object
     */
    var _attributes = {};
    
    /**
     * Constructor
     * 
     * @param {Element} element
     */
    var _construct = function(element) {
        _element = element;
        
        _initialize();
    };
    
    /**
     * {@inheritDoc}
     */
    this.getValue = function() {
        var converter = _getConverter();
        
        return converter.toInternalValue(_config.type, _element.value, _getConfig(_config.type));
    };
    
    /**
     * {@inheritDoc}
     */
    this.setValue = function(value) {
        var converter = _getConverter();
        
        _element.value = converter.toDisplayValue(_config.type, value, _getConfig(_config.type));
        
        this.dispatchEvent({type: 'change', source: _me, value: value});
        
        return this;
    };
    
    /**
     * Set input attribute
     * 
     * @param {String} attributeName - attribute name
     * @param {mixed} value - attribute value
     * @returns {Eternity.Adapter.DOM.Element.Input}
     */
    this.setAttribute = function(attributeName, value)  {
        _attributes[attributeName] = value;
        
        return this;
    };
    
    /**
     * Get attribute value
     * 
     * @param {String} attributeName - name of attribute
     * @returns {mixed}
     */
    this.getAttribute = function(attributeName) {
        if (!_attributes.hasOwnProperty(attributeName)) {
            return null;
        }
        
        return _attributes[attributeName];
    };
    
    /**
     * Remove attribute from input
     * 
     * @param {String} attributeName - attribute name to remove
     * @returns {Eternity.Adapter.DOM.Element.Input}
     */
    this.removeAttribute = function(attributeName) {
        if (_attributes.hasOwnProperty(attributeName)) {
            delete _attributes[attributeName];
        }
        
        return this;
    };
    
    /**
     * {@inheritDoc}
     */
    this.setConfig = function(key, value) {
        _config[key] = value;
        
        return this;
    };
    
    /**
     * Get parameters specific for input type
     * 
     * @param {String} type - type of config to retrieve
     * @returns {Object}
     */
    var _getConfig = function(type) {
        if (!_config.hasOwnProperty(type)) {
            throw new Error('Config for field type "' + type + '" not found');
        }
        
        return _config.type;
    };
    
    /**
     * {@inheritDoc}
     */
    this.inject = function(name, service) {
        switch (name) {
            case 'converter': {
                _services[name] = service;
                break;
            }
            default: {
                throw new Error('Cannot inject "' + name + '" service');
            }
        }
    };
    
    /**
     * Set/Change input type
     * 
     * @param {String} type - type name
     * @returns {Eternity.Components.Converter.Input}
     */
    this.setType = function(type) {
        _config.type = type;
        
        return this;
    };
    
    /**
     * Get value converter by type
     * 
     * @returns {Eternity.Components.Converter.Base}
     */
    var _getConverter = function() {
        if (!_services.converter) {
            throw new Error('Converter service is not found');
        }
        
        return _services.converter;
    };
    
    /**
     * Initialize element:
     * Add event listeners
     */
    var _initialize = function() {
        _element.addEventListener('change', function() {
            _me.setValue(_element.value);
        });
    };
    
    _construct.call(this, element);
};

Eternity.Adapter.DOM.Element.Input.prototype = Object.create(Eternity.Adapter.DOM.Element.Base);
Eternity.Adapter.DOM.Element.Input.prototype.constructor = Eternity.Adapter.DOM.Element.Input;
