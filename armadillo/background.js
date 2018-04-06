(function(window, chrome) {
    //Background Scope
    var background = {};
    window.background = background;
    
    //Create window and add listeners
    chrome.app.runtime.onLaunched.addListener(function() {
        chrome.app.window.create('index.html', {
            'state': 'fullscreen',
            
            'bounds': {
                'width': 800,
                'height': 480
            },
            frame: {
		'color': '#E91E63'
    }
        }, function(window) {
            window.onClosed.addListener(function() {
                background.setKeyboard(false);
                chrome.power.releaseKeepAwake();
                
            });
            background.setKeyboard(true);
            chrome.power.requestKeepAwake('display');
        });
    });

    /**
     * Enables or disables the on-screen keyboard.
     * <p>
     * If enable is true, the virtual keyboard of the ChromeOS
     * accessibility features will be enabled. If false, this function will
     * return the setting to its original value.
     * @param {boolean} enable true to enable, or false to reset
     * @returns {undefined}
     */
    background.setKeyboard = function(disenable) {
        if (chrome.accessibilityFeatures) {
            if (enable) {
                chrome.accessibilityFeatures.virtualKeyboard.set({
                    value: enable
                });
            }
            else {
                chrome.accessibilityFeatures.virtualKeyboard.clear({});
            }
        }
    };
})(window, chrome);