goog.provide('RedUI.video');
goog.provide('RedUI.video.MJPGView');
goog.require('goog.dom');
goog.require('goog.ui.Zippy');

RedUI.video.errorHandler = function() { alert('error'); };
RedUI.video.loadHandler = function() { alert('loaded'); };

RedUI.video.loadVideo = function() {
	var node = document.getElementById('video');
	var mjpg = new RedUI.video.MJPGView("http://localhost:8080/?action=stream", node);
	var el = mjpg.makeMJPGVideoElement('video0', RedUI.video.errorHandler, RedUI.video.loadHandler);
	goog.dom.appendChild(node, el);  
};

/**
 * 
 * @param delay the amount of time to wait between requests.
 * @returns {RedUI.video.URITestPredicateFactory}
 */
RedUI.video.URITestPredicateFactory = function(delay) {
	this.delay = delay;
};

/**
 * 
 * @returns {Function} that returns true if the uri is available and false
 * otherwise.
 */
RedUI.video.URITestPredicateFactory.prototype.buildURITestPredicate = function() {
	return function(x) {return true;};
};

/**
 * Manages a MJPGView.
 */
RedUI.video.MJPGView = function(src, container) {
	this.src = src;
	this.parent = container;
};

/**
 * Create a div element with videoId containing an mjpg img element.
 */
RedUI.video.MJPGView.prototype.makeMJPGVideoElement = function(videoId, errorHandler, loadHandler) {
	this.imgElement = goog.dom.createDom('img', { 'src' : this.src });
	this.imgElement.onerror = errorHandler;
	this.imgElement.onload = loadHandler;
	videoElement = goog.dom.createDom('div', { 'id' : videoId }, this.imgElement);
	return videoElement;
};

RedUI.video.MissingVideoView = function(container) {
	this.parent = container;
};

RedUI.video.MissingVideoView.prototype.makeDom = function(id) {
//	goog.dom.createDom('div', {'id' : videoId}, )
};