/**
 * @depends jquery
 * @name jquery.events
 * @package jquery-sparkle {@link http://balupton.com/projects/jquery-sparkle}
 */

/**
 * jQuery Aliaser
 */
(function($){

  /**
   * Bind a event, with or without data
   * Benefit over $.bind, is that $.binder(event, callback, false|{}|''|false) works.
   * @version 1.0.0
   * @date June 30, 2010
     * @package jquery-sparkle {@link http://balupton.com/projects/jquery-sparkle}
   * @author Benjamin "balupton" Lupton {@link http://balupton.com}
   * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://balupton.com}
   * @license MIT License {@link http://creativecommons.org/licenses/MIT/}
   */
  $.fn.binder = $.fn.binder || function(event, data, callback){
    // Help us bind events properly
    var $this = $(this);
    // Handle
    if ( (callback||false) ) {
      $this.bind(event, data, callback);
    } else {
      callback = data;
      $this.bind(event, callback);
    }
    // Chain
    return $this;
  };

  /**
   * Bind a event only once
   * @version 1.0.0
   * @date June 30, 2010
     * @package jquery-sparkle {@link http://balupton.com/projects/jquery-sparkle}
   * @author Benjamin "balupton" Lupton {@link http://balupton.com}
   * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://balupton.com}
   * @license MIT License {@link http://creativecommons.org/licenses/MIT/}
   */
  $.fn.once = $.fn.once || function(event, data, callback){
    // Only apply a event handler once
    var $this = $(this);
    // Handle
    if ( (callback||false) ) {
      $this.unbind(event, callback);
      $this.bind(event, data, callback);
    } else {
      callback = data;
      $this.unbind(event, callback);
      $this.bind(event, callback);
    }
    // Chain
    return $this;
  };

  /**
   * Event for pressing the enter key
   * @version 1.0.0
   * @date June 30, 2010
     * @package jquery-sparkle {@link http://balupton.com/projects/jquery-sparkle}
   * @author Benjamin "balupton" Lupton {@link http://balupton.com}
   * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://balupton.com}
   * @license MIT License {@link http://creativecommons.org/licenses/MIT/}
   */
  $.fn.enter = $.fn.enter || function(data,callback){
    return $(this).binder('enter',data,callback);
  };
  $.event.special.enter = $.event.special.enter || {
    setup: function( data, namespaces ) {
      $(this).bind('keypress', $.event.special.enter.handler);
    },
    teardown: function( namespaces ) {
      $(this).unbind('keypress', $.event.special.enter.handler);
    },
    handler: function( event ) {
      // Prepare
      var $el = $(this);
      // Setup
      var enterKey = event.keyCode === 13;
      if ( enterKey ) {
        // Our event
        event.type = 'enter';
        $.event.handle.apply(this, [event]);
        return true;
      }
      // Not our event
      return;
    }
  };

  /**
   * Event for pressing the escape key
   * @version 1.0.0
   * @date June 30, 2010
     * @package jquery-sparkle {@link http://balupton.com/projects/jquery-sparkle}
   * @author Benjamin "balupton" Lupton {@link http://balupton.com}
   * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://balupton.com}
   * @license MIT License {@link http://creativecommons.org/licenses/MIT/}
   */
  $.fn.cancel = $.fn.cancel || function(data,callback){
    return $(this).binder('cancel',data,callback);
  };
  $.event.special.cancel = $.event.special.cancel || {
    setup: function( data, namespaces ) {
      $(this).bind('keyup', $.event.special.cancel.handler);
    },
    teardown: function( namespaces ) {
      $(this).unbind('keyup', $.event.special.cancel.handler);
    },
    handler: function( event ) {
      // Prepare
      var $el = $(this);
      // Setup
      var moz = typeof event.DOM_VK_ESCAPE === 'undefined' ? false : event.DOM_VK_ESCAPE;
      var escapeKey = event.keyCode === 27;
      if ( moz || escapeKey ) {
        // Our event
        event.type = 'cancel';
        $.event.handle.apply(this, [event]);
        return true;
      }
      // Not our event
      return;
    }
  };

  /**
   * Event for the last click for a series of one or more clicks
   * @version 1.0.0
   * @date July 16, 2010
     * @package jquery-sparkle {@link http://balupton.com/projects/jquery-sparkle}
   * @author Benjamin "balupton" Lupton {@link http://balupton.com}
   * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://balupton.com}
   * @license MIT License {@link http://creativecommons.org/licenses/MIT/}
   */
  $.fn.lastclick = $.fn.lastclick || function(data,callback){
    return $(this).binder('lastclick',data,callback);
  };
  $.event.special.lastclick = $.event.special.lastclick || {
    setup: function( data, namespaces ) {
      $(this).bind('click', $.event.special.lastclick.handler);
    },
    teardown: function( namespaces ) {
      $(this).unbind('click', $.event.special.lastclick.handler);
    },
    handler: function( event ) {
      // Setup
      var clear = function(){
        // Fetch
        var Me = this;
        var $el = $(Me);
        // Fetch Timeout
        var timeout = $el.data('lastclick-timeout')||false;
        // Clear Timeout
        if ( timeout ) {
          clearTimeout(timeout);
        }
        timeout = false;
        // Store Timeout
        $el.data('lastclick-timeout',timeout);
      };
      var check = function(event){
        // Fetch
        var Me = this;
        clear.call(Me);
        var $el = $(Me);
        // Store the amount of times we have been clicked
        $el.data('lastclick-clicks', ($el.data('lastclick-clicks')||0)+1);
        // Handle Timeout for when All Clicks are Completed
        var timeout = setTimeout(function(){
          // Fetch Clicks Count
          var clicks = $el.data('lastclick-clicks');
          // Clear Timeout
          clear.apply(Me,[event]);
          // Reset Click Count
          $el.data('lastclick-clicks',0);
          // Fire Event
          event.type = 'lastclick';
          $.event.handle.apply(Me, [event,clicks])
        },500);
        // Store Timeout
        $el.data('lastclick-timeout',timeout);
      };
      // Fire
      check.apply(this,[event]);
    }
  };

  /**
   * Event for the first click for a series of one or more clicks
   * @version 1.0.0
   * @date July 16, 2010
     * @package jquery-sparkle {@link http://balupton.com/projects/jquery-sparkle}
   * @author Benjamin "balupton" Lupton {@link http://balupton.com}
   * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://balupton.com}
   * @license MIT License {@link http://creativecommons.org/licenses/MIT/}
   */
  $.fn.firstclick = $.fn.firstclick || function(data,callback){
    return $(this).binder('firstclick',data,callback);
  };
  $.event.special.firstclick = $.event.special.firstclick || {
    setup: function( data, namespaces ) {
      $(this).bind('click', $.event.special.firstclick.handler);
    },
    teardown: function( namespaces ) {
      $(this).unbind('click', $.event.special.firstclick.handler);
    },
    handler: function( event ) {
      // Setup
      var clear = function(event){
        // Fetch
        var Me = this;
        var $el = $(Me);
        // Fetch Timeout
        var timeout = $el.data('firstclick-timeout')||false;
        // Clear Timeout
        if ( timeout ) {
          clearTimeout(timeout);
        }
        timeout = false;
        // Store Timeout
        $el.data('firstclick-timeout',timeout);
      };
      var check = function(event){
        // Fetch
        var Me = this;
        clear.call(Me);
        var $el = $(Me);
        // Update the amount of times we have been clicked
        $el.data('firstclick-clicks', ($el.data('firstclick-clicks')||0)+1);
        // Check we are the First of the series of many
        if ( $el.data('firstclick-clicks') === 1 ) {
          // Fire Event
          event.type = 'firstclick';
          $.event.handle.apply(Me, [event])
        }
        // Handle Timeout for when All Clicks are Completed
        var timeout = setTimeout(function(){
          // Clear Timeout
          clear.apply(Me,[event]);
          // Reset Click Count
          $el.data('firstclick-clicks',0);
        },500);
        // Store Timeout
        $el.data('firstclick-timeout',timeout);
      };
      // Fire
      check.apply(this,[event]);
    }
  };

  /**
   * Event for performing a singleclick
   * @version 1.1.0
   * @date July 16, 2010
   * @since 1.0.0, June 30, 2010
     * @package jquery-sparkle {@link http://balupton.com/projects/jquery-sparkle}
   * @author Benjamin "balupton" Lupton {@link http://balupton.com}
   * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://balupton.com}
   * @license MIT License {@link http://creativecommons.org/licenses/MIT/}
   */
  $.fn.singleclick = $.fn.singleclick || function(data,callback){
    return $(this).binder('singleclick',data,callback);
  };
  $.event.special.singleclick = $.event.special.singleclick || {
    setup: function( data, namespaces ) {
      $(this).bind('click', $.event.special.singleclick.handler);
    },
    teardown: function( namespaces ) {
      $(this).unbind('click', $.event.special.singleclick.handler);
    },
    handler: function( event ) {
      // Setup
      var clear = function(event){
        // Fetch
        var Me = this;
        var $el = $(Me);
        // Fetch Timeout
        var timeout = $el.data('singleclick-timeout')||false;
        // Clear Timeout
        if ( timeout ) {
          clearTimeout(timeout);
        }
        timeout = false;
        // Store Timeout
        $el.data('singleclick-timeout',timeout);
      };
      var check = function(event){
        // Fetch
        var Me = this;
        clear.call(Me);
        var $el = $(Me);
        // Update the amount of times we have been clicked
        $el.data('singleclick-clicks', ($el.data('singleclick-clicks')||0)+1);
        // Handle Timeout for when All Clicks are Completed
        var timeout = setTimeout(function(){
          // Fetch Clicks Count
          var clicks = $el.data('singleclick-clicks');
          // Clear Timeout
          clear.apply(Me,[event]);
          // Reset Click Count
          $el.data('singleclick-clicks',0);
          // Check Click Status
          if ( clicks === 1 ) {
            // There was only a single click performed
            // Fire Event
            //event.type = 'singleclick';
            //$.event.handle.apply(Me, [event])

            $.event.simulate('singleclick', Me, event)
          }
        }, 300);
        // Store Timeout
        $el.data('singleclick-timeout',timeout);
      };
      // Fire
      check.apply(this,[event]);
    }
  };

})(jQuery);
