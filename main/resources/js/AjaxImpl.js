/**
 * @author fjgm
 */

var AjaxUtil = JsonUtil = (function($,wnd,undefined){
	var initialized = false,
		ajaxQueue = [],
		retryQueue = [],
		inProgressXhr = [],
		maxRetry = 3,
		_timeout = 290,
		_addAjaxQueue = function(options) {
			if (!initialized) _init();
			
			if (options===undefined)
				return;
			
			ajaxQueue.push(options);
		}, // End addAjaxQueue
		//
		// When called, it will fireup a ajax call for each elem in ajaxQueue
		//
		_runAjax = function() {
			if (!initialized) _init();

			if (ajaxQueue===undefined || !ajaxQueue.length || ajaxQueue.length<1)
				return;
			
			
		}, // End runAjax
		
		
		//
		// Execute a ajax call immediately based on settings provided.
		// Settings it's a jQuery's Ajax object
		//
		_runNow = function(settings) {
			if (!initialized) _init();

			if (settings===undefined)
				return;
			
			$.ajax({
				url: settings.url,
				success: function(data, status, xhr) {
					if (settings.success) {
						settings['data'] = data;
						settings['status'] = xhr.status;
						settings['xhr'] = xhr;
						settings.success(settings);
					}
				},
				error: function(xhr, status, error) {
					if(settings.doRetry) {
						if (settings.retry===undefined)
							settings.retry=0;
							
						settings.retry +=1;
						if (settings.retry<=maxRetry)
							retryQueue.push(settings);	
					}
					
					if (settings.error) {
						settings['status'] = xhr.status;
						settings['xhr'] = xhr;
						settings['error'] = error;
						settings.error(settings);
					}
				}
			});
			
		}, // End runNow
		//
		// Returns a HTML attribute formatted as: attrName = 'attrValue'
		// 
		_getAttr = function(options){
			if (!initialized) _init();

			return (options===undefined || options.attrName===undefined || options.attrValue===undefined) 
					? ""
					: options.attrName===undefined
					? ""
					: options.attrName + "='" + options.attrValue + "'"; 
		}, //End toAttr
		
		_getHtmlElem = function(options){
			if (!initialized) _init();

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
			if (!initialized) _init();

			return ajaxQueue;
		}, // End _getAjaxQueue
		
		_getFacets = function(resume, ajaxWrapper){
			if (!initialized) _init();

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
		},
		_init = function() {
			if (initialized) 
				return;
				
			$.ajaxSetup({
				timeout: _timeout,
				dataType: 'json',
				async: true,
				beforeSend: function(xhr) {
					xhr.setRequestHeader("Header1","Value1");
					xhr.setRequestHeader("Header2","Value2");
					xhr.setRequestHeader("Header3","Value3");
				}
			});
			initialized = true;
		};
		
		
		return {
			getAttr: _getAttr,
			getHtmlElem: _getHtmlElem,
			addAjaxQueue: _addAjaxQueue,
			getAjaxQueue: _getAjaxQueue,
			runAjax: _runAjax,
			runNow: _runNow
		}; 	
})(jQuery,this);

