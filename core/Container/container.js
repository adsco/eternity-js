/**
 * IoC
 */
Eternity.Container.Container = function(){
    /**
     * @type Container
     */
    var _me = this;

    /**
     * @type JSON
     */
    var _config = {};
    
    /**
     * @type JSON
     */
    var _services = {};
    
    /**
     * Register new class for IoC
     * 
     * @param {String} name - system name
     * @param {String} className - class name
     * @param {String[]|undefined} args - arguments to be passed into constructor
     * @returns {Container}
     */
    this.register = function(name, className, args){
        if(!name || name.trim().length < 1){
            throw new Error('Name required, given arguments are: ' + name + ', ' + className + ', ' + args.join(', '));
        }
        
        if(_getConfig(name)){
            throw new Error('Name "' + name + '" already reserved');
        }
        
        _doRegister(name, className, args);
        
        return this;
    };
    
    /**
     * Create class instance by system name
     * 
     * @param {String} name - system name of class
     * @returns {mixed}
     */
    this.create = function(name){
        return _create(name);
    };
    
    /**
     * Retrieve class config by system name
     * 
     * @param {String} name
     * @returns {JSON}
     */
    var _getConfig = function(name){
        return _config[name];
    };
    
    /**
     * Save registered class configuration
     * 
     * @param {String} name - system name
     * @param {String} className - class name
     * @param {String[]|undefined} args - arguments to be passed into constructor
     * @returns {Container}
     */
    var _doRegister = function(name, className, args){
        _config[name] = {
            name: className,
            args: args || []
        };
        
        return this;
    };
    
    /**
     * Get arguments values
     * 
     * @param {String[]} argsArray
     * @returns {Object|String}
     */
    var _getArguments = function(argsArray){
        var args = [],
            i;
        
        for(i = 0; i < argsArray.length; i++){
            args.push(
                _getArgument(argsArray[i])
            );
        }

        return args;
    };
    
    /**
     * Get single argument value
     *  
     * @param {String} argument - argument
     * @returns {Object|String}
     */
    var _getArgument = function(argument){
        var service;
        
        if(0 === argument.indexOf('@')){
            service = argument.substring(1);
            
            if(_serviceExists(service)){
                return _getService(service);
            } else {
                return _create(service);
            }
        }
        
        return argument;
    };
    
    /**
     * Check whether class exists or not
     * 
     * @param {String} name - class name to check
     * @returns {Boolean}
     */
    var _classExists = function(name){
        return window[name] ? true : false;
    };
    
    /**
     * Get class
     * 
     * @param {String} name - class name
     * @returns {Object|null}
     */
    var _getClass = function(name){
        var classPath = name.split('.'),
            cls = window[classPath[0]],
            i;
    
        for(i = 1; i < classPath.length; i++){
            cls = cls[classPath[i]];
        }
    
        return cls || null;
    };
    
    /**
     * Recursive class instance creation
     * 
     * @param {String} name - system name of class to create
     * @returns {Object}
     */
    var _create = function(name){
        var config = _getConfig(name),
            service;
        
        if(!config){
            throw new Error('Class "' + name + '" is not registered');
        }
        
        service = _getService(name);
        if(!service){
            service = _createInstance(config);
            _registerService(name, service);
        }
        
        return service;
    };
    
    var _createInstance = function(config){
        //bind function 1-st argument ignored cause new operator used
        //for creating objects
        var args = [null],
            cls = _getClass(config.name);
    
        if(!cls){
            throw new Error('Class "' + config.name + '" is not found');
        }
        
        args = args.concat(_getArguments(config.args));
        
        return new (Function.prototype.bind.apply(cls, args));
    };
    
    /**
     * Register service
     * 
     * @param {String} name - service system name
     * @param {Object} service - service itself
     * @returns {Container}
     */
    var _registerService = function(name, service){
        _services[name] = service;
        
        return this;
    };
    
    /**
     * Check is service exists
     * 
     * @param {String} name
     * @returns {Boolean}
     */
    var _serviceExists = function(name){
        return _services.hasOwnProperty(name);
    };
    
    /**
     * Get service by system name
     * 
     * @param {String} name - service system name
     * @returns {Object|null}
     */
    var _getService = function(name){
        return _services[name] || null;
    };
};