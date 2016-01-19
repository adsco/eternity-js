/**
 * IoC
 */
Eternity.Components.Container.Container = function(){
    /**
     * @type Container
     */
    var _me = this;

    /**
     * @type JSON
     */
    var _config = {};
    
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
            throw new Error('Name required');
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
        if(0 === argument.indexOf('@')){
            return _create(argument.substring(1));
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
        return window[name] || null;
    };
    
    /**
     * Recursive class instance creation
     * 
     * @param {String} name - system name of class to create
     * @returns {Object}
     */
    var _create = function(name){
        var config = _getConfig(name),
            cls,
            //bind function 1-st argument ignored cause new operator used
            //for creating objects
            args = [null];
        
        if(!config){
            throw new Error('Class "' + name + '" is not registered');
        }
        
        cls = _getClass(config.name);
        if(!cls){
            throw new Error('Class "' + config.name + '" is not found');
        }
        
        args = args.concat(_getArguments(config.args));
        return new (Function.prototype.bind.apply(cls, args));
    };
}