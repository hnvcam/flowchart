/**
 * Flow Chart jQuery plugin 1.0
 * 
 * Copyright (c) 2014, AIWSolutions
 * License: GPL2
 * Project Website: http://wiki.aiwsolutions.net/PXR4E
 **/

jQuery.fn.flowChart = function(targetDiv) {
	var source = $(this);
	var target = $(targetDiv);
	var elementCount = 0;
	var arrowElementRatio = 0.5;
	var arrowBodyRatio = 0.5;
	var arrowBodyHeadRatio = 0.5;
	var defaultSpace = 20;
	
	function renderElements() {
		target.css('position', 'relative');
		source.find('li').each(function(index) {
			if (index > 0) {
				var arrow_body = $('<div class="arrow-body arrow-' + index + '"></div>');
				var arrow_head = $('<div class="arrow-head arrow-' + index + '"></div>');
				target.append(arrow_body);
				target.append(arrow_head);
			}
			var element = $('<div class="item item-' + (index + 1) + '"></div>');
			var elementContent = $('<div class="item-content"></div>');
			elementContent.append($(this).html());
			element.append(elementContent);
			target.append(element);
			elementCount++;
		});
	}
	
	function layout() {
		var viewWidth = target.width();
		var viewHeight = target.height();
		var elementWidth = (viewWidth - 2 * defaultSpace * (elementCount - 1)) / (elementCount + (elementCount - 1) * arrowElementRatio);
		var elementHeight = viewHeight;
		var arrowWidth = elementWidth * arrowElementRatio;
		var arrowHeight = elementHeight * arrowElementRatio;
		var arrowBodyWidth = arrowWidth * arrowBodyRatio;
		var arrowHeadWidth = arrowWidth - arrowBodyWidth;
		var arrowHeadTop = (viewHeight - arrowHeight) / 2;
		var arrowBodyHeight = arrowHeight * arrowBodyHeadRatio;
		var arrowBodyTop = (viewHeight - arrowBodyHeight) / 2;
		for (var i = 0; i < elementCount; i++) {
			var elementLeft = i * (elementWidth * (1 + arrowElementRatio) + defaultSpace * 2);
			$('.item-' + (i + 1)).css('left', elementLeft).
				css('width', elementWidth).css('height', elementHeight).each(function() {
					var contentElement = $($(this).find('.item-content')[0]);
					var contentElementLeft = (elementWidth - contentElement.width()) / 2;
					var contentElementTop = (elementHeight - contentElement.height()) / 2;
					contentElement.css('left', contentElementLeft).css('top', contentElementTop);
				});
			if (i > 0) {
				var arrowLeft = elementLeft - defaultSpace - arrowWidth;
				$('.arrow-body.arrow-' + i).css('width', arrowBodyWidth).css('left', arrowLeft).css('height', arrowBodyHeight).css('top', arrowBodyTop);
				$('.arrow-head.arrow-' + i).css('width', 0).css('left', arrowLeft + arrowBodyWidth).css('height', 0).css('top', arrowHeadTop).css('border-width', (arrowHeight / 2) + 'px 0 ' + (arrowHeight / 2) + 'px ' + arrowHeadWidth + 'px');
			}
		}
	}
	
	renderElements();
	layout();
	return this;
}

