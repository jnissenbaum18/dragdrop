app.directive('fsadraggable', function ($document) {

	return {
		restrict: 'A',
		link: function (scope, element, attr) {
			var startX = 0, startY = 0, newX = 0, newY = 0

			var data = attr.fsadata
			console.log(data)

			var JSONdata = JSON.stringify(data)

			element.css({
				position: 'relative',
				cursor: 'pointer'
			})

			element[0].draggable = true

			element.bind('dragstart', function (event) {
				startX = event.originalEvent.pageX - newX
				startY = event.originalEvent.pageY - newY
				if (data) {
					event.originalEvent.dataTransfer.setData('auto', JSONdata)
				}
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
		},
		scope: {
			fsadata: '@'
		}
	}

})

app.directive('fsaresizeable', ['$document', function ($document) {
	return {
		link: function (scope, element, attr) {
			var topBorder, leftBorder, rightBorder, bottomBorder
			var borderWidth = 10

			element.css({
				position: 'relative',
				// cursor: 'pointer'
			})

			element.on('mousedown', function (event) {
				// event.preventDefault()
				
				var topBorder = element[0].offsetTop
				var leftBorder = element[0].offsetLeft
				var rightBorder = element[0].offsetLeft + element[0].offsetWidth
				var bottomBorder = element[0].offsetTop + element[0].offsetHeight

				if (event.pageX < rightBorder + borderWidth && event.pageX > rightBorder - borderWidth ||
					event.pageY < bottomBorder + borderWidth && event.pageY > bottomBorder - borderWidth) {
					$document.on('mousemove', sizeMouseMove)
					$document.on('mouseup', sizeMouseUp)
				}				
			})
			function sizeMouseMove () {
				var newHeight = event.pageY - element[0].offsetTop
				var newWidth = event.pageX - element[0].offsetLeft
				 
				bottomBorder = event.pageY
				rightBorder = event.pageX
				element.css({
					height: newHeight + 'px',
					width: newWidth + 'px'
				})
			}

			function sizeMouseUp () {
				element[0].draggable = true
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
         	attr.fsacontainer = []
			element.bind('dragover', function(e) {
				e.preventDefault()
         	});

         	element.bind('drop', function (event) {
         		if (event.originalEvent.dataTransfer.getData("auto") === '') {
         			return 
         		}         		
         		data = JSON.parse(JSON.parse(event.originalEvent.dataTransfer.getData("auto")))
         		console.log(data)
         		attr.fsacontainer.push(data)
         	})
		}
	}
}])
