/**
 * @author fjgm
 */

(function(){
 	var obj = {
		url: "/qunit/test/resources/json/contacts.json",
		success: function(ajaxWrapper) {
			ok(true, 'Ajax call successful');
		},
		error: function(ajaxWrapper) {
			alert(ajaxWrapper.status);
			ok(false,'Ajax call failed');
		},
		dataType: 'json',
		async: true,
		doRetry: false
	};
	
	QUnit.init();

	module('AjaxUtil.getHtmlElem() Test Module');
	
	test('Use Case: Called without arguments', function() {
		equals("<div />",AjaxUtil.getHtmlElem(),'Passed');
	 });

	test('Use Case: Call with all parameters especified', function() {
		equals("<p id='testId'>Test Content</p>",AjaxUtil.getHtmlElem({
			elemName: "p",
			elemContent: "Test Content",
			attrName: "id",
			attrValue: "testId"
		}),'Use Case: Call with all parameters especified');
	 });

	test('Use Case: Call with Attribute both parameters missing', function() {
		equals("<p >Test Content</p>",AjaxUtil.getHtmlElem({
			elemName: "p",
			elemContent: "Test Content"
		}),'Use Case: Call with Attribute both parameters missing');
	 });

	test('Use Case: Call with Attribute Value parameter missing', function() {
		equals("<p >Test Content</p>",AjaxUtil.getHtmlElem({
			elemName: "p",
			elemContent: "Test Content"
		}),'Use Case: Call with Attribute Value parameter missing');
	 });


	module('AjaxUtil.getAttr() Module');
	test('Use Case: Call with no parameter', function() {
		equals(AjaxUtil.getAttr(),"",'Use Case: Call with no parameter');
	 });

	test('Use Case: Call with Attribute Name parameter missing', function() {
		equals(AjaxUtil.getAttr({
			attrValue: "testId"
		}),"",'Use Case: Call with Attribute Name parameter missing');
	 });

	test('Use Case: Call with Attribute Value parameter missing', function() {
		equals(AjaxUtil.getAttr({
			attrName: "class"
		}),"",'Use Case: Call with Attribute Value parameter missing');
	 });

	test('Use Case: Call with all Attribute Values provided', function() {
		equals(AjaxUtil.getAttr({
			attrName: "class",
			attrValue: "active"
		}),"class='active'",'Use Case: Call with all Attribute Values provided');
	 });


	module('AjaxUtil.addAjaxQueue() Module');

	AjaxUtil.addAjaxQueue(obj);

	test('Use Case: Validates the object added is the object returned',function() {
		equals(
			AjaxUtil.getAjaxQueue()[0],
			obj,
			'Use Case: Validates the object added is the object returned'
		);
	});

	test('Use Case: Validate length is correct',function() {
		equals(
			AjaxUtil.getAjaxQueue().length,
			1,
			'Use Case: Validate length is correct'
		);
	});

	
	module('AjaxUtil.runNow() Module');
	//AjaxUtil.getAjaxQueue().pop();
	test('Retrieve a json resources Async',function() {
		stop();
		
		AjaxUtil.runNow(obj);
		
		setTimeout(function(){start()},300);
	});
	
})();
 
