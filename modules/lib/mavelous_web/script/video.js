goog.provide('RedUI.video');
goog.provide('RedUI.video.MJPGView');
goog.provide('RedUI.video.MissingVideoView');
goog.provide('RedUI.video.VideoView');

goog.require('goog.dom');
goog.require('goog.ui.Zippy');

RedUI.video.errorHandler = function() { alert('error'); };
RedUI.video.loadHandler = function() { alert('loaded'); };

RedUI.video.loadVideo = function() {
	var node = document.getElementById('video');
	var mjpg = new RedUI.video.MJPGView("http://localhost:8080/?action=stream", node);
	var miss = new RedUI.video.MissingVideoView(node);
	//var el = mjpg.makeDom('video0', RedUI.video.errorHandler, RedUI.video.loadHandler);
	var el = miss.makeDom('video0');
	goog.dom.appendChild(node, el);  
};

RedUI.video.StatusAwareVideoView = function(missing, available, isAvailable) {
	this.missing = missing;
	this.available = available;
	this.isAvailable = available;
};


RedUI.video.VideoView = function() {
	this.name = "video parent";
	this.style = {'style' : "background-color:red;color:blue"};
};

RedUI.video.VideoView.prototype.getName = function() {
	return this.name;
};

RedUI.video.VideoView.prototype.getStyle = function() {
	return this.style;
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
 * Create a div element with videoId containing a mjpg img element.
 */
RedUI.video.MJPGView.prototype.makeDom = function(videoId, errorHandler, loadHandler) {
	this.imgElement = goog.dom.createDom('img', { 'src' : this.src });
	this.imgElement.onerror = errorHandler;
	this.imgElement.onload = loadHandler;
	videoElement = goog.dom.createDom('div', { 'id' : videoId }, this.imgElement);
	return videoElement;
};

RedUI.video.MissingVideoView = function(container) {
	RedUI.video.VideoView.call(this);
	this.parent = container;
};

goog.inherits(RedUI.video.MissingVideoView, RedUI.video.VideoView);

RedUI.video.MissingVideoView.prototype.makeDom = function(id) {
	this.nameElement = goog.dom.createDom('div', $.extend({ 'id' : 'videoName'}, this.getStyle()), this.getName());
	return goog.dom.createDom('div', {'style' : 'background-color:orange'}, this.nameElement);
};