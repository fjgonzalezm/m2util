/**
 * @author fjgm
 */
//var testJsonFeed = "http://localhost/emptyjson.php?callback=?";

//getHtmlElem TestCases

(function(){
test('testJsonUtil.getHtmlElem() Test Cases', function() {
	equals("<div />",JsonUtil.getHtmlElem(),'Called without arguments');

	equals("<p id='testId'>Test Content</p>",JsonUtil.getHtmlElem({
		elemName: "p",
		elemContent: "Test Content",
		attrName: "id",
		attrValue: "testId"
	}),'Call with all parameters especified');

	equals("<p >Test Content</p>",JsonUtil.getHtmlElem({
		elemName: "p",
		elemContent: "Test Content"
	}),'Call with Attribute both parameters missing');

	equals("<p >Test Content</p>",JsonUtil.getHtmlElem({
		elemName: "p",
		elemContent: "Test Content"
	}),'Call with Attribute Value parameter missing');
 });
 
// test('testJsonUtil.getHtmlElem(): AllProvided', function() {
//	equals("<p id='testId'>Test Content</p>",JsonUtil.getHtmlElem({
//		elemName: "p",
//		elemContent: "Test Content",
//		attrName: "id",
//		attrValue: "testId"
//	}),'Call with all parameters especified');
// });
// 
// test('testJsonUtil.getHtmlElem():AttributeMissing', function() {
//	equals("<p >Test Content</p>",JsonUtil.getHtmlElem({
//		elemName: "p",
//		elemContent: "Test Content"
//	}),'Call with Attribute both parameters missing');
// });
// 
// test('testJsonUtil.getHtmlElem():AttributeValueMissing', function() {
//	equals("<p >Test Content</p>",JsonUtil.getHtmlElem({
//		elemName: "p",
//		elemContent: "Test Content"
//	}),'Call with Attribute Value parameter missing');
// });
	
})();
 
 
(function(){
	// getAttr TestCases
test('testJsonUtil.getAttr() Test Cases', function() {
	equals(JsonUtil.getAttr(),"",'Call with no parameter');

	equals(JsonUtil.getAttr({
		attrValue: "testId"
	}),"",'Call with Attribute Name parameter missing');

	equals(JsonUtil.getAttr({
		attrName: "class"
	}),"",'Call with Attribute Value parameter missing');
	
	equals(JsonUtil.getAttr({
		attrName: "class",
		attrValue: "active"
	}),"class='active'",'Call with all Attribute Values provided');
 });

//test('testJsonUtil.getAttr():AttributeNameMissing', function() {
//	equals(JsonUtil.getAttr({
//		attrValue: "testId"
//	}),"",'Call with Attribute Name parameter missing');
// });
//
//test('testJsonUtil.getAttr():AttributeValueMissing', function() {
//	equals(JsonUtil.getAttr({
//		attrName: "class"
//	}),"",'Call with Attribute Value parameter missing');
// });
// 
//test('testJsonUtil.getAttr():AllAttributeValueProvided', function() {
//	equals(JsonUtil.getAttr({
//		attrName: "class",
//		attrValue: "active"
//	}),"class='active'",'Call with all Attribute Values provided');
// });

})(); 
 
 // ajaxQueue TestCases
 
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
		isRetry: false
	}
	
	JsonUtil.addAjaxQueue(obj);
	
	test('JsonUtil.addAjaxQueue() Test Cases',function() {
		equals(
			JsonUtil.getAjaxQueue()[0],
			obj,
			'Validates the object added is the object returned'
		);
		equals(
			JsonUtil.getAjaxQueue().length,
			1,
			'Validate length is correct'
		);
		
	});
 })();
