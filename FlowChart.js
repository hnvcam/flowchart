/**
 * Flow Chart jQuery plugin 1.0
 * 
 * Copyright (c) 2014, AIWSolutions
 * License: GPL2
 * Project Website: http://wiki.aiwsolutions.net/
 **/

jQuery.fn.flowChart = function(targetDiv) {
	var source = $(this);
	var target = $(targetDiv);
	var elementCount = 0;
	var arrowElementRatio = 0.3;
	var arrowBodyRatio = 0.5;
	var defaultSpace = 10;
	
	function renderElements() {
		source.find('li').each(function(index) {
			if (index > 0) {
				var arrow_body = $('<div class="arrow-body arrow-' + index + '"></div>');
				var arrow_head = $('<div class="arrow-head arrow-' + index + '"></div>');
				target.append(arrow_body);
				target.append(arrow_head);
			}
			var element = $('<div class="item-' + index + '"></div>');
			element.append($(this).text());
			target.append(element);
			elementCount++;
		});
	}
	
	function layout() {
		var viewWidth = target.width();
		var viewHeight = target.height();
		var elementWidth = (viewWidth - 2 * defaultSpace * (elementCount - 1)) / (elementCount + (elementCount - 1) * arrowElementRatio);
		var arrowWidth = elementWidth * arrowElementRatio;
		var arrowBodyWidth = arrowWidth * arrowBodyRatio;
		var arrowHeadWidth = arrowWidth - arrowBodyWidth;
		for (var i = 0; i < elementCount; i++) {
			var itemLeft = i * (elementWidth * (1 + arrowElementRatio) + defaultSpace * 2);
			$('item-' + i).css('left', itemLeft).
				css('width', elementWidth);
			if (i > 0) {
				$('arrow-body arrow-' + i).css('width', arrowBodyWidth).css('left', i * elementWidth;
			}
		}
	}
	
	renderElements();
	layout();
	return this;
}

