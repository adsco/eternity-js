/**
 * Trackable config factory
 * 
 * @returns {undefined}
 */
function TrackableFactory(){
    this.create = function(){
        return {
            //elements pattern
            pattern: null,
            //events to observe
            events: [],
            //attributes values to retrieve on event trigger
            attributes: []
        };
    };
}