/**
 * @author fjgm
 */
var AjaxUtil = JsonUtil = (function($, wnd, undefined){
    var initialized = false, ajaxQueue = [], retryQueue = [], inProgressXhr = [], _maxRetry = 3, _timeout = 290, _addAjaxQueue = function(options){
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
        
        var _wrapper = settings;
        
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
                        //_wrapper.retry++; // Workaround for adjust count of retry which is off by 1
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
        if (!initialized) 
            _init();
        
        return (options === undefined || options.attrName === undefined || options.attrValue === undefined) ? "" : options.attrName === undefined ? "" : options.attrName + "='" + options.attrValue + "'";
    }, //End toAttr
 _getHtmlElem = function(options){
        if (!initialized) 
            _init();
        
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
        if (!initialized) 
            _init();
        
        if (!resume) {
            // Fire up Ajax call
        
        }
        else {
            // resume Ajax call from where I left off (It's acting as a callback function)
            // Extract data from within ajaxWrapper
            if (!ajaxWrapper || ajaxWrapper.status != 200) { // Failed
                if (ajaxWrapper.ajaxObj && ajaxWrapper.ajaxObj.isRetry) {
                    retryQueue.push(ajaxWrapper.ajaxObj);
                }
            }
            else { //Succeeded
            }
        }
    }, _init = function(){
        if (initialized) {
            return;
        }
        
        $.ajaxSetup({
            timeout: _timeout,
            dataType: 'json',
            async: true,
            beforeSend: function(xhr){
                xhr.setRequestHeader("Header1", "Value1");
                xhr.setRequestHeader("Header2", "Value2");
                xhr.setRequestHeader("Header3", "Value3");
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
        doAjaxNow: _doAjaxNow
    };
})(jQuery, this);

