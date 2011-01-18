/**
 * @author fjgm
 */
 (function(){
    var obj = {
        url: "/qunit/test/resources/json/contacts.json",
        success: function(ajaxWrapper){
            ok(ajaxWrapper.status == 200, 'Ajax call successful');
        },
        error: function(ajaxWrapper){
            ok(ajaxWrapper.status != 200, 'Ajax call failed');
            // ok(ajaxWrapper.retry>3,'Retry executed 3 times');
        },
        dataType: 'json',
        async: true,
        doRetry: true
    };

    QUnit.init();

    module('AjaxUtil.getHtmlElem() Test Module');

    test('Use Case: Called without arguments',
    function(){
        equals("<div />", AjaxUtil.getHtmlElem(), 'Passed');
    });

    test('Use Case: Call with all parameters especified',
    function(){
        equals("<p id='testId'>Test Content</p>", AjaxUtil.getHtmlElem({
            elemName: "p",
            elemContent: "Test Content",
            attrName: "id",
            attrValue: "testId"
        }), 'Use Case: Call with all parameters especified');
    });

    test('Use Case: Call with Attribute both parameters missing',
    function(){
        equals("<p >Test Content</p>", AjaxUtil.getHtmlElem({
            elemName: "p",
            elemContent: "Test Content"
        }), 'Use Case: Call with Attribute both parameters missing');
    });

    test('Use Case: Call with Attribute Value parameter missing',
    function(){
        equals("<p >Test Content</p>", AjaxUtil.getHtmlElem({
            elemName: "p",
            elemContent: "Test Content"
        }), 'Use Case: Call with Attribute Value parameter missing');
    });


    module('AjaxUtil.getAttr() Module');
    test('Use Case: Call with no parameter',
    function(){
        equals(AjaxUtil.getAttr(), "", 'Use Case: Call with no parameter');
    });

    test('Use Case: Call with Attribute Name parameter missing',
    function(){
        equals(AjaxUtil.getAttr({
            attrValue: "testId"
        }), "", 'Use Case: Call with Attribute Name parameter missing');
    });

    test('Use Case: Call with Attribute Value parameter missing',
    function(){
        equals(AjaxUtil.getAttr({
            attrName: "class"
        }), "", 'Use Case: Call with Attribute Value parameter missing');
    });

    test('Use Case: Call with all Attribute Values provided',
    function(){
        equals(AjaxUtil.getAttr({
            attrName: "class",
            attrValue: "active"
        }), "class='active'", 'Use Case: Call with all Attribute Values provided');
    });


    module('AjaxUtil.addAjaxQueue() Module');

    AjaxUtil.addAjaxQueue(obj);

    test('Use Case: Validates the object added is the object returned',
    function(){
        equals(AjaxUtil.getAjaxQueue()[0], obj, 'Use Case: Validates the object added is the object returned');
    });

    test('Use Case: Validate length is correct',
    function(){
        equals(AjaxUtil.getAjaxQueue().length, 1, 'Use Case: Validate length is correct');
    });


    module('AjaxUtil.runNow() Module');
    
    test('Retrieve a json resources Async', 6,
    function(){
    
    
    
        var o1 = $.extend(true, {},
        obj);
    
        o1['success'] = function(ajaxWrapper){
            ok(ajaxWrapper.status == 200, 'HTTP Code = 200');
        };
        o1['error'] = function(ajaxWrapper){
            ok(false, "Expected HTTP/200 response");
        };
    
        var o2 = $.extend(true, {},
        obj);
    
        o2['url'] = '/qunit/test/resources/json/doesnotexist.json';
    
        o2['success'] = function(ajaxWrapper){
            ok(false, 'Expected response code different from HTTP/200');
            ok(false, 'Retry does not execute on success responses anyway....');
        };
        o2['error'] = function(ajaxWrapper){
            ok(ajaxWrapper.status != 200, 'HTTP Code different from 200');
            ok(ajaxWrapper.retry === undefined, 'No retry executed');
        };
    
        o2['doRetry'] = false;
    
    
        var o3 = $.extend(true, {},
        obj);
    
        o3['url'] = '/qunit/test/resources/json/doesnotexist.json';
        o3['success'] = function(ajaxWrapper){
            ok(false, 'Expecting call to purposely fail.');
            ok(false, 'Retries don\'t execute on success anyway....');
        };
    
        o3['error'] = function(ajaxWrapper){
            ok(ajaxWrapper.status != 200, 'HTTP Code different from 200');
            ok(ajaxWrapper.retry == 3, 'Retries reached 3+');
        };
    
        o3['doRetry'] = true;
    
        stop(600);
    
        AjaxUtil.doAjaxNow(o1);
    
        AjaxUtil.doAjaxNow(o2);
    
        AjaxUtil.doAjaxNow(o3);
    
        AjaxUtil.getFacets();
    
        setTimeout(function(){
            start()
        },
        500);
    });
    
})();
