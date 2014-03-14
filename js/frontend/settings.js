(function() {

var localStorageKey = "user_settings";

// Default settings
var defaultSettings = {
    cacheLocation: path.join(os.tmpDir(), 'Popcorn-Time'),
    autoClearCache: true
};

if( !localStorage[localStorageKey] ) {
    localStorage[localStorageKey] = "{}";
}

var Settings = function(){
    this.load();
};

Settings.prototype.load = function() {
    _.extend(this, JSON.parse(localStorage[localStorageKey]));
    _.defaults(this, defaultSettings);
};

Settings.prototype.save = function() {
    var self = this;
    var data = {};
    _.each(this, function(v, k) {
        if(self.hasOwnProperty(k)) {
            data[k] = v;
        }
    });

    localStorage[localStorageKey] = JSON.stringify(data);
};

App.settings = new Settings();

})();