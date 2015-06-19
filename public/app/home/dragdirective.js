app.directive('fsadraggable', ['$document', function ($document) {
	return {
		link: function (scope, element, attr) {
			var startX = 0, startY = 0, newX = 0, newY = 0

			var data = {
				test: 'test'
			}

			data = JSON.stringify(data)

			element.css({
				position: 'relative',
				cursor: 'pointer'
			})

			element[0].draggable = true

			element.bind('dragstart', function (event) {
				startX = event.originalEvent.pageX - newX
				startY = event.originalEvent.pageY - newY

				event.originalEvent.dataTransfer.setData('auto', data)
			})

			element.bind('drag', function (event) {

				if (event.originalEvent.pageX === 0) {
					// If this isn't here, pageX will reset to 0 upon end of drag
					return;
				}
				
				newX = event.originalEvent.pageX - startX
				newY = event.originalEvent.pageY - startY
			})

			element.bind('dragend', function (event){
				element.css({
					left: newX + 'px',
					top: newY + 'px'
				})
			})
		}
	}
}])

app.directive('fsaresizeable', ['$document', function ($document) {
	return {
		link: function (scope, element, attr) {
			var startHeight = element[0].offsetHeight
			var startWidth = element[0].offsetWidth
			var topBorder = element[0].offsetTop
			var	bottomBorder = element[0].offsetTop + startHeight
			var leftBorder = element[0].offsetLeft 
			var rightBorder = element[0].offsetLeft + startWidth
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
			var data
			element.bind('dragover', function(e) {
				e.preventDefault()
         	});

         	element.bind('drop', function (event) {
         		data = JSON.parse(event.originalEvent.dataTransfer.getData("auto"))
         		console.log(data)
         	})
		}
	}
}])
