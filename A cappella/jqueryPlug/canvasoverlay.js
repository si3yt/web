/*
 * canvasoverlay
 * http://www.cw-internetdienste.de/overlay/
 *
 * Copyright (c) 2013 Christian Weber
 * Licensed under the MIT license.
 */
/*jshint devel:true */
/*jshint smarttabs:true */
;(function ($, window, document, undefined) {
	"use strict";

    // Default
    var pluginName = "CanvasOverlay";
    var defaults = {
        shadow:		10,
        radius:		150,
		ready:		null,
		background:	'rgba(0,0,0,1)',
		figure:	null
    };

    // The actual plugin constructor
    function CanvasOverlay(element, options) {
		/*jshint validthis:true */
		this.element = element;

        this.options	=	$.extend({}, defaults, options);
        this._defaults	=	defaults;
        this._name		=	pluginName;
        this.ctx		=	null;
        this.wWidth		=	$(window).width();
        this.wHeight	=	$(window).height();
        this.mouseX		=	0;
        this.mouseY		=	0;
        this.cursor		=	null;
        this.init();
    }

    CanvasOverlay.prototype = {
        init: function () {
           // make it fullscreen
           $(this.element).addClass('cw-overlay').css({'z-index':9999,'width':'100%','height':'100%','position':'fixed','top':'0px','right':'0px','bottom':'0px','left':'0px'}).attr({'width':this.wWidth,'height':this.wHeight});

           // check for canvas
           if(this.element.getContext) {
				this.ctx	=	this.element.getContext('2d');
           } else {
				console.log('Error: Browser does not support canvas element');
				return false;
           }

           // create cursor
           this.createCursor();

           // attach events
           var _this	=	this;
		   $(window).on('mousemove',function(e) {	_this._movement(e);	});
		   $(window).on('resize',function(e) { _this._resize(e); });
		   $(this.element).on('click', function(e) { _this._action(e); });
		   $(this.element).on('mousemove', function(e) { if((new Date()).getTime()%20 === 0) { _this._action(e,'hover'); } });

           this.renderOverlay(this.wWidth/2,this.wHeight/2);

           if(this.options['ready'] !== null) {
				// callback function(element)
				this.options['ready']($(this.element));
			}
        },

        _resize: function() {
			this.wWidth	=	$(window).width();
			this.wHeight=	$(window).height();

	        $(this.element).attr({'width':this.wWidth,'height':this.wHeight});
        },

        _movement: function(e) {
			this.mouseX	=	e.clientX;
			this.mouseY	=	e.clientY;
			this.renderOverlay();
        },

        _action:	function(e,_type) {
			var type	=	_type	||	'click';
	        $(this.element).hide();
	        var el = document.elementFromPoint(this.mouseX, this.mouseY);
	        $(this.element).show();
	        if(type==='click') { $(el).focus(); }
	        $(el).trigger(type);
	        e.preventDefault();
	        e.stopPropagation();
        },

        createCursor: function() {
			var el	=	document.createElement('canvas'),
				ctx	=	null;
			if(this.options.figure	!==	null	&&	this.options.figure instanceof Image) {
				el.setAttribute('width',	this.options.figure.width);
				el.setAttribute('height',	this.options.figure.height);

				ctx = el.getContext('2d');

				ctx.globalCompositeOperation	=	'source-over';
				ctx.drawImage(this.options.figure,0,0);
			} else {
				el.setAttribute('width',(this.options.radius+this.options.shadow)*2);
				el.setAttribute('height',(this.options.radius+this.options.shadow)*2);

				ctx	=	el.getContext('2d');

				ctx.globalCompositeOperation	=	'source-over';
				ctx.fillStyle	=	'rgba(255,0,0,1)';
		        ctx.shadowBlur = this.options.shadow;
				ctx.shadowColor = 'rgba(255, 0, 0,0.3)';
		        ctx.arc(~~(el.width/2),~~(el.height/2),(this.options.radius),0,Math.PI*2);
		        ctx.fill();
		    }

	        this.cursor	=	el;
        },

        renderOverlay: function(_x,_y) {
			var x	=	_x	||	this.mouseX,
				y	=	_y	||	this.mouseY;

			// render background
			this.ctx.globalCompositeOperation	=	'source-over';
			this.ctx.fillStyle	=	this.options.background;
			this.ctx.fillRect(0,0,this.element.width,this.element.height);

	        // cutout
	        this.ctx.globalCompositeOperation	=	'destination-out';
	        this.ctx.drawImage(this.cursor,~~(x-((this.options.radius+this.options.shadow)/2)),~~(y-((this.options.radius+this.options.shadow)/2)),(this.options.radius+this.options.shadow),(this.options.radius+this.options.shadow));

        }
	};

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function (options) {
		return this.each(function () {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new CanvasOverlay(this, options));
			}
		});
	};

})(jQuery, window, document);
