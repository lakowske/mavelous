goog.require('RedUI.video');
goog.require('goog.testing.jsunit');
goog.require('goog.testing.Mock');
goog.require('goog.dom.query');


var testmakeMJPGVideoElement = function() {
	el = document.getElementsByName('body');
	assertNotEquals('should not be null', el, null);	

	var errorHandler = function() { console.log('error loading video'); };
	var url = 'http://localhost/nonexistant';
	mjpgView = new RedUI.video.MJPGView('http://localhost/nonexistant', el);
	var videoElement = mjpgView.makeMJPGVideoElement('video1', errorHandler);	
	assertNotEquals('should not be null', videoElement, null);
	var img = goog.dom.query('img',videoElement);
	assertNotEquals('should not be null', img , null);
	assertNotEquals('should not be empty', img.length, 0);
	assertTrue('should have attributes', img.item(0).hasAttributes());
	var attributes = img.item(0).attributes;
	var src = attributes.getNamedItem('src').value;
	assertEquals('should be equal', src, url);
	var video2 = goog.dom.query('#video2',videoElement);	
	assertEquals('should be empty', video2.length , 0);
	
};
