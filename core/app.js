Eternity = {};
Eternity.App = {};
Eternity.Components = {};
Eternity.Components.DOM = {};
Eternity.Components.DOM.Element = {};
Eternity.Components.Provider = {};
Eternity.Components.Input = {};
Eternity.Components.Input.Resolver = {};
Eternity.Components.Input.Handler = {};
Eternity.Components.Output = {};
Eternity.Components.Output.Resolver = {};
Eternity.Components.Output.Handler = {};
Eternity.Helper = {};

Eternity.config = {
    core: {
        domRepository: {
            name: '',
            cls: '',
            arguments: []
        },
        elementCrawler: {
            name: '',
            cls: '',
            arguments: []
        },
        resolver: {
            name: '',
            cls: '',
            arguments: []
        },
        resultResolver: {
            name: '',
            cls: '',
            arguments: []
        },
        domObserver: {
            name: '',
            cls: '',
            arguments: []
        },
        dataProvider: {
            name: '',
            cls: '',
            arguments: []
        }
    },
    handlers: [
        
    ],
    resultHandlers: [
        
    ]
};

var EternityApp = {
    _core: {
        
    },
    _domRepository: null,
    _elementCrawler: null,
    _resolver: null,
    _resultResolver: null,
    _domObserver: null,
    _dataProvider: null,
    initialize: function(){
        
    }
};