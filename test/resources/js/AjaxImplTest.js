/**
 * @author fjgm
 */
//var testJsonFeed = "http://localhost/emptyjson.php?callback=?";

//getHtmlElem TestCases

 test('testJsonUtil.getHtmlElem():AllDefaults', function() {
	equals("<div />",JsonUtil.getHtmlElem(),'Called without arguments');
 });
 
 test('testJsonUtil.getHtmlElem(): AllProvided', function() {
	equals("<p id='testId'>Test Content</p>",JsonUtil.getHtmlElem({
		elemName: "p",
		elemContent: "Test Content",
		attrName: "id",
		attrValue: "testId"
	}),'Call with all parameters especified');
 });
 
 test('testJsonUtil.getHtmlElem():AttributeMissing', function() {
	equals("<p >Test Content</p>",JsonUtil.getHtmlElem({
		elemName: "p",
		elemContent: "Test Content"
	}),'Call with Attribute both parameters missing');
 });
 
 test('testJsonUtil.getHtmlElem():AttributeValueMissing', function() {
	equals("<p >Test Content</p>",JsonUtil.getHtmlElem({
		elemName: "p",
		elemContent: "Test Content"
	}),'Call with Attribute Value parameter missing');
 });


// getAttr TestCases
test('testJsonUtil.getAttr():AllParamsMissing', function() {
	equals(JsonUtil.getAttr(),"",'Call with no parameter');
 });

test('testJsonUtil.getAttr():AttributeNameMissing', function() {
	equals(JsonUtil.getAttr({
		attrValue: "testId"
	}),"",'Call with Attribute Name parameter missing');
 });

test('testJsonUtil.getAttr():AttributeValueMissing', function() {
	equals(JsonUtil.getAttr({
		attrName: "class"
	}),"",'Call with Attribute Value parameter missing');
 });
 
test('testJsonUtil.getAttr():AllAttributeValueProvided', function() {
	equals(JsonUtil.getAttr({
		attrName: "class",
		attrValue: "active"
	}),"class='active'",'Call with all Attribute Values provided');
 });
