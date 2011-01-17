/**
 * @author fjgm
 */

(function(){
 	var obj = {
		url: "/contacts.json",
		success: function(ajaxWrapper) {
			$(document.body).append(JsonUtil.getHtmlElem({
				elemName: "div",
				attrName: "id",
				attrValue: "testDiv"
			})).find("#testDiv").append(ajaxWrapper.data);
		},
		error: function(ajaxWrapper) {
			$(document.body).append(JsonUtil.getHtmlElem({
				elemName: "div",
				attrName: "id",
				attrValue: "testDiv"
			})).find("#testDiv").append(ajaxWrapper.data);
		},
		doRetry: false
	};
	

	module('AjaxUtil.getHtmlElem() Test Module');
	
	test('Use Case: Called without arguments', function() {
		equals("<div />",JsonUtil.getHtmlElem(),'Passed');
	 });

	test('Use Case: Call with all parameters especified', function() {
		equals("<p id='testId'>Test Content</p>",JsonUtil.getHtmlElem({
			elemName: "p",
			elemContent: "Test Content",
			attrName: "id",
			attrValue: "testId"
		}),'Use Case: Call with all parameters especified');
	 });

	test('Use Case: Call with Attribute both parameters missing', function() {
		equals("<p >Test Content</p>",JsonUtil.getHtmlElem({
			elemName: "p",
			elemContent: "Test Content"
		}),'Use Case: Call with Attribute both parameters missing');
	 });

	test('Use Case: Call with Attribute Value parameter missing', function() {
		equals("<p >Test Content</p>",JsonUtil.getHtmlElem({
			elemName: "p",
			elemContent: "Test Content"
		}),'Use Case: Call with Attribute Value parameter missing');
	 });


	module('AjaxUtil.getAttr() Module');
	test('Use Case: Call with no parameter', function() {
		equals(JsonUtil.getAttr(),"",'Use Case: Call with no parameter');
	 });

	test('Use Case: Call with Attribute Name parameter missing', function() {
		equals(JsonUtil.getAttr({
			attrValue: "testId"
		}),"",'Use Case: Call with Attribute Name parameter missing');
	 });

	test('Use Case: Call with Attribute Value parameter missing', function() {
		equals(JsonUtil.getAttr({
			attrName: "class"
		}),"",'Use Case: Call with Attribute Value parameter missing');
	 });

	test('Use Case: Call with all Attribute Values provided', function() {
		equals(JsonUtil.getAttr({
			attrName: "class",
			attrValue: "active"
		}),"class='active'",'Use Case: Call with all Attribute Values provided');
	 });


	module('AjaxUtil.addAjaxQueue() Module');

	JsonUtil.addAjaxQueue(obj);

	test('Use Case: Validates the object added is the object returned',function() {
		equals(
			JsonUtil.getAjaxQueue()[0],
			obj,
			'Use Case: Validates the object added is the object returned'
		);
	});

	test('Use Case: Validate length is correct',function() {
		equals(
			JsonUtil.getAjaxQueue().length,
			1,
			'Use Case: Validate length is correct'
		);
	});

	
	//module('AjaxUtil.runNow() Module');
	//JsonUtil.getAjaxQueue().pop();
	//	test('JsonUtil.runNow() Test Cases',function() {
	//		stop(3000);
	//		
	//		equals(
	//			JsonUtil.runNow(),'','Use Case: Success Ajax call'
	//		);
	//	});
	
})();
 
