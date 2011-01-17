/**
 * @author fjgm
 */

var JsonUtil = (function($,undefined){
	var settings = {},
		ajaxQueue = [],
		retryQueue = [],
		inProgressXhr = [],
		_addAjaxQueue = function(settings) {
			if (settings===undefined || settings.length)
				return;

			ajaxQueue.push(settings);
		}, // End addAjaxQueue
		//
		// When called, it will fireup a ajax call for each elem in ajaxQueue
		//
		_runAjax = function() {
			if (ajaxQueue===undefined || ajaxQueue.length)
				return;
			
			
		}, // End runAjax
		//
		// Execute a ajax call immediately based on settings provided.
		// Settings it's a jQuery's Ajax object
		//
		_runNow = function(settings) {
			if (settings===undefined || settings.length)
				return;
			
		}, // End runNow
		//
		// Returns a HTML attribute formatted as: attrName = 'attrValue'
		// 
		_getAttr = function(options){
			return options===undefined
					? ""
					: options.attrName===undefined
					? ""
					: options.attrName + "='" + options.attrValue + "'"; 
		}, //End toAttr
		_getHtmlElem = function(options){
			var def = {
				elemName: "div"
			};
			def = $.extend(def, options);
			return def.elemContent===undefined	
					? "\<" + def.elemName + " " + _getAttr(def)+ "\/>"
					: "\<" + def.elemName + " " + _getAttr(def) +"\>"
						+ def.elemContent + "\<\/" + def.elemName + "\>";
		}, // End toHtmlElem
		_getAjaxQueue = function() {
			return ajaxQueue;
		},
		_getFacets = function(resume, ajaxWrapper){
			if (!resume) {
				// Fire up Ajax call
				
			} else {
				// resume Ajax call from where I left off (It's acting as a callback function)
				// Extract data from within ajaxWrapper
				if (!ajaxWrapper || ajaxWrapper.status!=200) { // Failed
					if (ajaxWrapper.ajaxObj && ajaxWrapper.ajaxObj.isRetry) {
						retryQueue.push(ajaxWrapper.ajaxObj);
					}
				} else { //Succeeded
					
				}
			}
		}
		
		return {
			getAttr: _getAttr,
			getHtmlElem: _getHtmlElem,
			addAjaxQueue: _addAjaxQueue,
			getAjaxQueue: _getAjaxQueue,
			runAjax: _runAjax,
			runNow: _runNow
		}; 	
})(jQuery);

