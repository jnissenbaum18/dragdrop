app.directive('fsadraggable', ['$document', function ($document) {
	return {
		link: function (scope, element, attr) {
			var startX = 0, startY = 0, newX = 0, newY = 0

			element.css({
				position: 'relative',
				cursor: 'pointer'
			})

			element.bind('drag', function () {
				console.log('drag')
			})

			element.on('mousedown', function (event){
				event.preventDefault()
				startX = event.pageX - newX
				startY = event.pageY - newY
				$document.on('mousemove', dragMouseMove)
				$document.on('mouseup', dragMouseUp)
			})

			function dragMouseMove () {
				newX = event.pageX - startX
				newY = event.pageY - startY
				element.css({
					left: newX + 'px',
					top: newY + 'px'
				})
			}

			function dragMouseUp () {
				$document.off('mousemove', dragMouseMove)
				$document.off('mouseup', dragMouseUp);
			}
			console.log(element)
		}
	}
}])

app.directive('fsaresizeable', ['$document', function ($document) {
	return {
		link: function (scope, element, attr) {
			var startHeight = element.context.offsetHeight
			var startWidth = element.context.offsetWidth
			var topBorder = element.context.offsetTop
			var	bottomBorder = element.context.offsetTop + startHeight
			var leftBorder = element.context.offsetLeft 
			var rightBorder = element.context.offsetLeft + startWidth
			var borderWidth = 10

			element.css({
				position: 'relative',
				// cursor: 'pointer'
			})

			element.on('mousedown', function (event) {
				// console.log(attr)
				event.preventDefault()

				if (event.pageX < rightBorder + borderWidth && event.pageX > rightBorder - borderWidth ||
					event.pageY < bottomBorder + borderWidth && event.pageY > bottomBorder - borderWidth) {
					$document.on('mousemove', sizeMouseMove)
					$document.on('mouseup', sizeMouseUp)
				}				
			})
			function sizeMouseMove () {
				var newHeight = event.pageY - topBorder
				var newWidth = event.pageX - leftBorder
				bottomBorder = topBorder + newHeight
				rightBorder = leftBorder + newWidth
				element.css({
					height: newHeight + 'px',
					width: newWidth + 'px'
				})
			}

			function sizeMouseUp () {
				$document.off('mousemove', sizeMouseMove)
				$document.off('mouseup', sizeMouseUp);
			}

		}
	}
}])

app.directive('fsacontainer', ['$document', function ($document) {
	return {
		link: function (scope, element, attr) {
			// element[0].draggable = true
			element.bind('dragover', function(e) {
				e.preventDefault()
            	console.log('e', e)
         	});

			/* if mouseenter:
			lookup:
			drop event
			drop end
				-send data
			check to see if fsadraggable is on the div that is being dragged in*/
		}
	}
}])
