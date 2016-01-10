function getTrackableObject(){
    return new TrackableFactory();
}

QUnit.test('Trackable object test', function(assert){
    var object = getTrackableObject();
    
    assert.deepEqual(object.create(), {pattern: null, events: [], attributes: []}, 'Creating trackable object');
});
