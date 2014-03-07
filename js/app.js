var

    // Minimum percentage to open video
    MIN_PERCENTAGE_LOADED = 0.5,

    // Minimum bytes loaded to open video
    MIN_SIZE_LOADED = 10 * 1024 * 1024,

    // Configuration variable
    applicationRoot = './',

    // Load native UI library
    gui = require('nw.gui'),

    // Debug flag
    isDebug = gui.App.argv.indexOf('--debug') > -1,

    // browser window object
    win = gui.Window.get(),

    // os object
    os = require('os'),

    // path object
    path = require('path'),

    // fs object
    fs = require('fs'),

    // TMP Folder
    tmpFolder = path.join(os.tmpDir(), 'Popcorn-Time'),

    // i18n module (translations)
    i18n = require("i18n");

// The option on settings panel to maintain window on top.
// it doesn't work very well. need improvement.
if (Settings.get('app_alwaysOnFocus') == '1') {
    $('#alwaysOnFocus').attr('checked','checked');
    $(window).on('blur', function() {
        win.focus();
    });
};

// The option on settings panel to start app on full screen
if (Settings.get('app_fullscreenOnStart') == '1') {
    $('#fullscreenOnStart').attr('checked','checked');
    win.toggleFullscreen();
    $('.btn-os.fullscreen').toggleClass('active');
};

if (Settings.get('app_closingPrompt') == '1') {
     $('#closingPrompt').attr('checked','checked');
};


i18n.configure({
    defaultLocale: 'en',
    directory: './language'
});

// Create the Temp Folder
if( ! fs.existsSync(tmpFolder) ) { fs.mkdirSync(tmpFolder); }

// Detect the language and update the global Language file
var detectLanguage = function(preferredLanguage) {

    // Check if has a config for app language and if it's valid
    if(i18n.isValidLocale(Settings.get('app_language'))) {
        i18n.setLocale(Settings.get('app_language'));
    } else {
        var fs = require('fs');
        // The full OS language (with localization, like "en-uk")
        var pureLanguage = navigator.language.toLowerCase();
        // The global language name (without localization, like "en")
        var baseLanguage = navigator.language.toLowerCase().slice(0,2);

        if( fs.existsSync('./language/' + pureLanguage + '.json') ) {
            i18n.setLocale(pureLanguage);
        }
        else if( fs.existsSync('./language/' + baseLanguage + '.json') ) {
            i18n.setLocale(baseLanguage);
        } else {
            i18n.setLocale(preferredLanguage);
        }

        Settings.set('app_language', I18n.getLocale());
    }

    // This is a hack to translate non-templated UI elements. Fuck it.
    $('[data-translate]').each(function(){
       var $el = $(this);
       var key = $el.data('translate');
        if( $el.is('input') ) {
            $el.attr('placeholder', i18n.__(key));
        } else {
            $el.text(i18n.__(key));
        }
    });
    populateCategories();
};


// Populate the Category list (This should be a template, though)
var populateCategories = function() {
    var category_html = '';
    var defaultCategory = 'all';

    for( key in i18n.__("genres") ) {
        category_html += '<li'+ (defaultCategory == key ? ' class="active" ' : '') +'>'+
                         '<a href="#" data-genre="'+key+'">'+ i18n.__("genres")[key] +'</a>'+
                         '</li>';
    }

    jQuery('#catalog-select .categories').html(category_html);
};

detectLanguage('en');

// add available language options to Settings Panel
var populateLangsList = function(currentLanguage) {
    i18n.getLocales().forEach(function(lang)
      {
          $("#lang-select").append('<option value="'+lang.toString()+ '"'
          + (currentLanguage == lang.toString() ? 'selected="selected"' : '')
          + '>' + lang.toString().toUpperCase()
          + '</option>');
      });
};

populateLangsList(Settings.get('app_language'));

var reloadApp = function () {
     // the win.reloadIgnoringCache() only works on 'main' page
     window.location = 'app://host/index.html';
};
// Not debugging, hide all messages!
if (!isDebug) {
    console.log = function () {};
} else {
    // Add "[DEBUG]" on app title
    $('#app-title').append(" <span class='dbg'>[DEBUG]</span>");
    // Developer Menu building
    var menubar = new gui.Menu({ type: 'menubar' }),
        developerSubmenu = new gui.Menu(),
        developerItem = new gui.MenuItem({
           label: 'Developer',
           submenu: developerSubmenu
        }),
        debugItem = new gui.MenuItem({
            label: 'Show developer tools',
            click: function () {
                win.showDevTools();
            }
        });
    menubar.append(developerItem);
    developerSubmenu.append(debugItem);
    win.menu = menubar;
    // Developer Shortcuts
    document.addEventListener('keyup', function(event){ // for reload keyup is safer than keydown
        // F12 Opens DevTools
        if( event.keyCode == 123 ) { win.showDevTools(); }
        // F11 Reloads
        if( event.keyCode == 122 ) { reloadApp(); }
    });
}


// Set the app title (for Windows mostly)
win.title = 'Popcorn Time';


// Focus the window when the app opens
win.focus();


document.addEventListener('keydown', function(event){
    var $el = $('.popcorn-quit');
    if(!$el.hasClass('hidden')) {
        // Esc
        if( event.keyCode == 27 ) { $el.addClass('hidden'); }
    }
    if (event.keyCode === 27 && $('body').is('.loading')) {
        // Escape pressed from sidebar
        App.loader(false);
        $(document).trigger('videoExit');
    }
    if (event.keyCode == 32 && $("#video_player").is(".vjs-playing")) {
        $("#video_player")[0].player.pause();
    }
    if (event.keyCode == 32 && $("#video_player").is(".vjs-paused")) {
        $("#video_player")[0].player.play();
    }
});

// Cancel all new windows (Middle clicks / New Tab)
win.on('new-win-policy', function (frame, url, policy) {
    policy.ignore();
});


// Prevent dropping files into the window
window.addEventListener("dragover",function(e){
    e = e || event;
    e.preventDefault();
},false);
window.addEventListener("drop",function(e){
    e = e || event;
    e.preventDefault();
},false);
// Prevent dragging files outside the window
window.addEventListener("dragstart",function(e){
    e = e || event;
    e.preventDefault();
},false);

// Check if the user has a working internet connection (uses Google as reference)
var checkInternetConnection = function(callback) {
    var http = require('http');
    var hasInternetConnection = false;

    http.get(Settings.get('connectionCheckUrl'), function(res){
        if( res.statusCode == 200 || res.statusCode == 302 || res.statusCode == 301 ) {
            hasInternetConnection = true;
        }
        typeof callback == 'function' ? callback(hasInternetConnection) : null;
    });
};


// Detect the operating system of the user
var getOperatingSystem = function() {
    var os = require('os');
    var platform = os.platform();

    if( platform == 'win32' || platform == 'win64' ) {
        return 'windows';
    }
    if( platform == 'darwin' ) {
        return 'mac';
    }
    if( platform == 'linux' ) {
        return 'linux';
    }
    return null;
};


// Check if there's a newer version and shows a prompt if that's the case
var checkForUpdates = function() {
    var http = require('http');

    var currentOs = getOperatingSystem();
    // We may want to change this in case the detection fails
    if( ! currentOs ){ return; }

    http.get(Settings.get('updateNotificationUrl'), function(res){
        var data = '';
        res.on('data', function(chunk){ data += chunk; });

        res.on('end', function(){
            try {
                var updateInfo = JSON.parse(data);
            } catch(e){ return; }

            if( ! updateInfo ){ return; }

            if( updateInfo[currentOs].version > Settings.get('version') ) {
                // Check if there's a newer version and show the update notification
                $('#notification').html(
                    i18n.__('UpgradeVersionDescription', updateInfo[currentOs].versionName) +
                    '<a class="btn" href="#" onclick="gui.Shell.openExternal(\'' + updateInfo[currentOs].downloadUrl + '\');"> '+ i18n.__('UpgradeVersion') + '</a>'
                );
                $('body').addClass('has-notification');
            }
        });

    });
};

checkForUpdates();

// Show the disclaimer if the user hasn't accepted it yet.
if( ! Settings.get('disclaimerAccepted') ) {
    $('.popcorn-disclaimer').removeClass('hidden');

    $('.popcorn-disclaimer .btn.confirmation.continue').click(function(event){
        event.preventDefault();
        Settings.set('disclaimerAccepted', 1);
        $('.popcorn-disclaimer').addClass('hidden');
    });
    $('.popcorn-disclaimer .btn.confirmation.quit').click(function(event){
        event.preventDefault();
        gui.App.quit();
    });
}



// Taken from peerflix `app.js`
var videoPeerflix = null;
var playTorrent = window.playTorrent = function (torrent, subs, callback, progressCallback) {

    videoPeerflix ? $(document).trigger('videoExit') : null;

    // Create a unique file to cache the video (with a microtimestamp) to prevent read conflicts
    var tmpFilename = ( torrent.toLowerCase().split('/').pop().split('.torrent').shift() ).slice(0,100);
    tmpFilename = tmpFilename.replace(/([^a-zA-Z0-9-_])/g, '_')+'-'+ (new Date()*1) +'.mp4';
    var tmpFile = path.join(tmpFolder, tmpFilename);

    var numCores = (os.cpus().length > 0) ? os.cpus().length : 1;
    var numConnections = 100;

    // Start Peerflix
    var peerflix = require('peerflix');

    videoPeerflix = peerflix(torrent, {
        // Set the custom temp file
        path: tmpFile,
        //port: 554,
        buffer: (1.5 * 1024 * 1024).toString(),
        connections: numConnections
    }, function (err, flix) {
        if (err) throw err;

        var started = Date.now(),
            loadedTimeout;

        flix.server.on('listening', function () {
            var href = 'http://127.0.0.1:' + flix.server.address().port + '/';

            loadedTimeout ? clearTimeout(loadedTimeout) : null;

            var checkLoadingProgress = function () {

                var now = flix.downloaded,
                    total = flix.selected.length,
                    // There's a minimum size before we start playing the video.
                    // Some movies need quite a few frames to play properly, or else the user gets another (shittier) loading screen on the video player.
                    targetLoadedSize = MIN_SIZE_LOADED > total ? total : MIN_SIZE_LOADED,
                    targetLoadedPercent = MIN_PERCENTAGE_LOADED * total / 100.0,

                    targetLoaded = Math.max(targetLoadedPercent, targetLoadedSize),

                    percent = now / targetLoaded * 100.0;

                if (now > targetLoaded) {
                    if (typeof window.spawnCallback === 'function') {
                        window.spawnCallback(href, subs);
                    }
                    if (typeof callback === 'function') {
                        callback(href, subs);
                    }
                } else {
                    typeof progressCallback == 'function' ? progressCallback( percent, now, total) : null;
                    loadedTimeout = setTimeout(checkLoadingProgress, 500);
                }
            };
            checkLoadingProgress();


            $(document).on('videoExit', function() {
                if (loadedTimeout) { clearTimeout(loadedTimeout); }

                // Keep the sidebar open
                $("body").addClass("sidebar-open").removeClass("loading");

                // Stop processes
                flix.clearCache();
                flix.destroy();
                videoPeerflix = null;

                // Unbind the event handler
                $(document).off('videoExit');

                delete flix;
            });
        });
    });

};

// Enable tooltips
$('body').tooltip({
    selector: "*[data-toggle^='tooltip']"
});


/**
 * Show 404 page on uncaughtException
 */

process.on('uncaughtException', function(err) {
    console.log(err);
});