Eternity = {};
Eternity.Core = {};
Eternity.Core.Handlers = {};
Eternity.Core.Misc = {};
Eternity.Components = {};
Eternity.Components.Converter = {};
Eternity.Components.DOM = {};
Eternity.Components.DOM.Element = {};
Eternity.Components.EventManager = {};
Eternity.Components.Input = {};
Eternity.Components.Input.Resolver = {};
Eternity.Components.Input.Handler = {};
Eternity.Components.Output = {};
Eternity.Components.Output.Resolver = {};
Eternity.Components.Output.Handler = {};
Eternity.Components.Provider = {};
Eternity.Components.Router = {};
Eternity.Components.Worker = {};
Eternity.Components.Worker.Reader = {};
Eternity.Components.Worker.Writer = {};
Eternity.Container = {};
Eternity.Factory = {};
Eternity.Helper = {};

Eternity.config = {
    core: {
        EventManager: {
            name: 'event-manager',
            cls: 'Eternity.Components.EventManager.EventManager',
            args: []
        },
        DOMRepository: {
            name: 'dom.repository',
            cls: 'Eternity.Components.DOM.Repository',
            args: ['observer.event-captured']
        },
        ElementCrawler: {
            name: 'element.crawler',
            cls: 'Eternity.Components.DOM.Element.Crawler',
            args: []
        },
        ElementBinder: {
            name: 'element.binder',
            cls: 'Eternity.Components.DOM.Element.Binder',
            args: []
        },
        InputResolver: {
            name: 'input.resolver',
            cls: 'Eternity.Components.Input.Resolver.Resolver',
            args: []
        },
        OutputResolver: {
            name: 'output.resolver',
            cls: 'Eternity.Components.Output.Resolver.Resolver',
            args: []
        },
        DOMObserver: {
            name: 'dom.observer',
            cls: 'Eternity.Components.DOM.Observer',
            args: ['@element.binder', '@router.router', '@event-manager']
        },
        DataProvider: {
            name: 'provider.data',
            cls: 'Eternity.Components.Provider.Data',
            args: ['@dom.repository', '@element.crawler']
        },
        Router: {
            name: 'router.router',
            cls: 'Eternity.Components.Router.Router',
            args: ['@input.resolver', '@output.resolver']
        }
    },
    inputHandlers: [
        {
            name: 'input.handler.calculus',
            cls: 'Eternity.Components.Input.Handler.Calculus',
            args: ['@provider.data', '@element.crawler', '@mapper', '@mapper-queue'],
            tags: {priority: 0}
        },
        {
            name: 'input.handler.validator',
            cls: 'Eternity.Components.Input.Handler.Validator',
            args: ['@provider.data', '@element.crawler', '@helper.validation', '@dom.repository'],
            tags: {priority: 100}
        }
    ],
    outputHandlers: [
        {
            name: 'output.handler.value-updater',
            cls: 'Eternity.Components.Output.Handler.ValueUpdater',
            args: ['@dom.repository']
        },
        {
            name: 'output.handler.validator',
            cls: 'Eternity.Components.Output.Handler.Validator',
            args: ['@dom.repository', '@converter.float']
        }
    ],
    misc: [
        {
            name: 'mapper',
            cls: 'Eternity.Helper.RuleMapper',
            args: []
        },
        {
            name: 'mapper-queue',
            cls: 'Eternity.Helper.RuleMapperQueue',
            args: ['@mapper']
        },
        {
            name: 'query-builder',
            cls: 'Eternity.Helper.QueryBuilder',
            args: []
        },
        {
            name: 'dom.crawler',
            cls: 'Eternity.Components.DOM.Crawler',
            args: ['@query-builder']
        },
        {
            name: 'helper.validation',
            cls: 'Eternity.Helper.ValidationMapper',
            args: []
        },
        {
            name: 'converter.float',
            cls: 'Eternity.Components.Converter.Float',
            args: []
        },
        {
            name: 'worker.writer',
            cls: 'Eternity.Components.Worker.Writer.Writer',
            args: ['@dom.repository']
        },
        {
            name: 'worker.reader',
            cls: 'Eternity.Components.Worker.Reader.Reader',
            args: ['@dom.repository']
        }
    ]
};

Eternity.App = function() {
    var _me = this;

    /**
     * @type Eternity.Container.Container
     */
    var _container = new Eternity.Container.Container();

    /**
     * @type JSON
     */
    var _core = {};

    /**
     * Constructor
     */
    var _construct = function() {
        //register all dependencies,
        //core, handlers, misc
        _registerDependencies();
        //create system components
        //core, handlers, but no misc
        _createComponents();
    };

    /**
     * Proxy method for DOMObserver.observe
     * 
     * @param {Element[]} elements - elements to observe
     * @param {String[]} events - events to observe
     * @returns {Eternity.App}
     */
    this.observe = function(elements, events) {
        _core.DOMRepository.add(elements);
        _core.DOMObserver.observe(elements, events);

        return this;
    };

    /**
     * Get service by name
     * 
     * @param {String} name - service name
     * @returns {mixed}
     */
    this.getService = function(name) {
        return _container.create(name);
    };

    /**
     * Register dependencies in container
     * @returns {Eternity.App}
     */
    var _registerDependencies = function() {
        var config = _getConfig();

        _registerCoreDependencies(config.core);
        _register(config.inputHandlers);
        _register(config.outputHandlers);
        _register(config.misc);

        return this;
    };

    /**
     * Register core dependencies
     * 
     * @param {JSON} config - config @see Eternity.config.core
     */
    var _registerCoreDependencies = function(config) {
        var key;

        for (key in config) {
            _container.register(config[key].name, config[key].cls, config[key].args);
        }
    };

    /**
     * Register array of services
     * 
     * @param {JSON} items - services to register
     */
    var _register = function(items) {
        var i;

        for (i = 0; i < items.length; i++) {
            _container.register(items[i].name, items[i].cls, items[i].args);
        }
    };

    /**
     * Create all required components
     */
    var _createComponents = function() {
        var config = _getConfig();

        _createCoreComponents(config.core);
        _createInputHandlers(config.inputHandlers);
        _createOutputHandlers(config.outputHandlers);
    };

    /**
     * Create core application components
     * 
     * @param {JSON} config
     */
    var _createCoreComponents = function(config) {
        var eventManager = _container.create('event-manager'),
            key;

        for (key in config) {
            _core[key] = _container.create(config[key].name);

            _registerEvents(eventManager, _core[key]);
        }

        _setSubscribers(eventManager);
    };

    /**
     * Register component events
     * 
     * @param {Eternity.Components.EventManager.EventManager} eventManager - eventManager
     * @param {Object} component - core component
     */
    var _registerEvents = function(eventManager, component) {
        if (component.hasOwnProperty('getEvents') && 'function' === typeof component.getEvents) {
            eventManager.registerEvents(component.getEvents());
        }
    };

    /**
     * Set component subscribers
     * 
     * @param {Eternity.Components.EventManager.EventManager} eventManager - eventManager
     */
    var _setSubscribers = function(eventManager) {
        var key;

        for (key in _core) {
            if (_core[key].hasOwnProperty('getSubscribers') && 'function' === typeof _core[key].getSubscribers) {
                _subscribe(eventManager, _core[key].getSubscribers());
            }
        }
    };

    /**
     * Add subscribers
     * 
     * @param {Eternity.Components.EventManager.EventManager} eventManager - eventManager
     * @param {Object[]} subscribers - list of subscribers to subscribe
     */
    var _subscribe = function(eventManager, subscribers) {
        var i;

        for (i = 0; i < subscribers.length; i++) {
            eventManager.subscribe(subscribers[i].event, subscribers[i].handler);
        }
    };

    /**
     * Create input handlers
     * 
     * @param {JSON[]} items - input handlers config
     */
    var _createInputHandlers = function(items) {
        var tags,
            priority,
            i;

        for (i = 0; i < items.length; i++) {
            tags = items[i].tags;

            if (tags.hasOwnProperty('priority')) {
                priority = tags.priority;
            } else {
                priority = 0;
            }

            _core.InputResolver.registerHandler(_container.create(items[i].name), priority);
        }
    };

    /**
     * Create output handlers
     * 
     * @param {JSON[]} items - handlers config
     */
    var _createOutputHandlers = function(items) {
        var i;

        for (i = 0; i < items.length; i++) {
            _core.OutputResolver.registerHandler(_container.create(items[i].name));
        }
    };

    /**
     * Get config
     * 
     * @returns {Eternity.config}
     */
    var _getConfig = function() {
        return Eternity.config;
    };

    _construct.call(this);
};