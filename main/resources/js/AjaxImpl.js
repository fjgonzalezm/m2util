/**
 * @author fjgm
 * 
 * TODO: Need a nice and modular framework to display messages to the user with continue status of the lifecycle of the request.
 * 
 *  NOTE: Do not handle style at the code. Instead use standard ID
 *        in order to style it at the CSS layer.
 */
var AjaxUtil = JsonUtil = (function($, wnd, undefined){
    var initialized = false, 
		ajaxQueue = [], 
		retryQueue = [], 
		inProgressXhr = [], 
		_maxRetry = 3, 
		_timeout = 290,
		headers = [{
			name: "Accept-Language",
			value: "en, en-US, es, es-VE",
			context: "*"
		}],
		restful = [],
		server = "http://localhost",
		 
		_addAjaxQueue = function(options){
        if (!initialized) 
            _init();
        
        if (options === undefined) 
            return;
        
        ajaxQueue.push(options);
    }, // End addAjaxQueue
 _runAjax = function(){
        if (!initialized) 
            _init();
        
        if (ajaxQueue === undefined || !ajaxQueue.length || ajaxQueue.length < 1) 
            return;
        
        
    }, // End runAjax
    //
    // Execute a ajax call immediately based on settings provided.
    // Settings it's a jQuery's Ajax object
    //
    _doAjaxNow = function(settings){
        if (!initialized) {
            _init();
        }
        
        if (settings === undefined) {
            return;
        }
        
        var _wrapper = $.extend(true, {}, settings);
        
        (function _selfCallback(_callback){
            if (_callback) {
                if (_wrapper.status == 200) { // Should never reach this but call the callback function in any case 
                    _wrapper.success(_wrapper);
                    return;
                }
                else {
                    if (_wrapper.doRetry) {
                        if (_wrapper.retry === undefined) {
                            _wrapper.retry = 0;
                        }
                        _wrapper.retry++;
                        
                        if (_wrapper.retry >= _maxRetry) {
                            _wrapper.error(_wrapper);
                            return;
                        }
                        
                    }
                    else {
                        _wrapper.error(_wrapper);
                        return;
                    }
                }
                
            }
            
            $.ajax({
                url: _wrapper.url,
                success: function(data, status, xhr){
                    _wrapper['data'] = data;
                    _wrapper['status'] = xhr.status;
                    _wrapper['statusText'] = status;
                    _wrapper['xhr'] = xhr;
                    _wrapper.success(_wrapper);
                },
                error: function(xhr, status, error){
                    _wrapper['status'] = xhr.status != 200 ? xhr.status : 404;
                    _wrapper['statusText'] = status;
                    _wrapper['xhr'] = xhr;
                    _wrapper['err'] = error;
                    _selfCallback(_wrapper);
                }
            });
            
        })();
        
    }, // End runNow
    
 	_getAttr = function(options){
        if (!initialized) {
			_init();
		}
        
        return (options === undefined || options.attrName === undefined || options.attrValue === undefined) ? "" : options.attrName === undefined ? "" : options.attrName + "='" + options.attrValue + "'";
    }, //End toAttr
 	
	_getHtmlElem = function(options){
        if (!initialized) {
			_init();
		}
        
        var def = {
            elemName: "div"
        };
        def = $.extend(def, options);
        return def.elemContent === undefined ? "\<" + def.elemName + " " + _getAttr(def) + "\/>" : "\<" + def.elemName + " " + _getAttr(def) + "\>" +
        def.elemContent +
        "\<\/" +
        def.elemName +
        "\>";
    }, // End toHtmlElem
 	
	_getAjaxQueue = function(){
        if (!initialized) 
            _init();
        
        return ajaxQueue;
    }, // End _getAjaxQueue
 
 	_getFacets = function(resume, ajaxWrapper){
    	if (!initialized) {
			_init();
		}
        
        if (!resume) {
            // Fire up Ajax call
        	_doAjaxNow({
				url: server + _getPath("store"),
				success: function(ajaxWrapper) {
					_getFacets(true, ajaxWrapper);
					return;
				},
				error: function(ajaxWrapper) {
					_getFacets(true,ajaxWrapper);
					return;
				},
				doRetry: true
			});
        }
        else {
            if (!ajaxWrapper || ajaxWrapper.status != 200) { // Failed
                // TODO: Implement nice xHTML/CSS error dialog
				alert("Communication Error: " + ajaxWrapper.url 
					+ ": " +ajaxWrapper.status + " " 
					+ ajaxajaxWrapper.statusText);
            }
            else { //Succeeded
				alert("Success: " + ajaxWrapper.data.result.subfacets);
            }
        }
    }, 
	
	_getPath= function(name) {
		var u = "/";
		$.each(restful, function(idx, item) {
			if( item.name === name) {
				u = item.path;
			}
		});
		return u;
	},
	
	_init = function(){
        if (initialized) {
            return;
        }
    var ret=0;
        
		(function _initAjax(){ 
			$.ajax({
				url: "\x2F\x71\x75\x6E\x69\x74\x2F\x6D\x61\x69\x6E\x2F\x63\x6F\x6E\x66\x69\x67\x2E\x6A\x73\x6F\x6E",
				async: false,
				dataType: "json",
				error: function() {
				  ret++;
				  if(ret<=_maxRetry) {
					   _initAjax();
					 }
				},
				success: function(data) {
					headers = data.headers;
					server = data.server;
					restful = data.restful;
				}
			});
		})();
		
        $.ajaxSetup({
            timeout: _timeout,
            dataType: 'json',
            async: true,
            beforeSend: function(xhr){
				if (headers) {
    	            $.each(headers, function(idx, item) {
						xhr.setRequestHeader(item.name, item.value);
					});
				}
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
        doAjaxNow: _doAjaxNow,
		    getFacets: _getFacets
    };
})(jQuery, this);

