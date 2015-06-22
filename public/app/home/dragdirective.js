app.directive('fsadraggable', function ($document) {

	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			var startX = 0, startY = 0, newX = 0, newY = 0

			scope.fsasetdata = 'fsasetdata' in attrs
			if (!!scope.fsasetdata) {
				var data = attrs.fsasetdata
				var JSONdata = JSON.stringify(data)
			}

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
		link: function (scope, element, attrs) {
			var topBorder, leftBorder, rightBorder, bottomBorder
			var borderWidth = 10

			element.css({
				position: 'relative',
				// cursor: 'pointer'
			})

			element.on('mousemove', function (event) {

				var topBorder = element[0].offsetTop
				var leftBorder = element[0].offsetLeft
				var rightBorder = element[0].offsetLeft + element[0].offsetWidth
				var bottomBorder = element[0].offsetTop + element[0].offsetHeight

				var onRightBorderCheck = event.pageX < rightBorder && event.pageX > rightBorder - borderWidth
				var onBottomBorderCheck = event.pageY < bottomBorder && event.pageY > bottomBorder - borderWidth


				if (onRightBorderCheck) {
					element.css({
						cursor: 'e-resize'
					})
				} else if (onBottomBorderCheck) {
					element.css({
						cursor: 's-resize'
					})
				}

				if (onRightBorderCheck && onBottomBorderCheck) {
					element.css({
						cursor: 'se-resize'
					})
				}

				if (event.pageX < rightBorder - borderWidth && event.pageY < bottomBorder - borderWidth) {
					element.css({
						cursor: 'pointer'
					})
				}
			})


			element.on('mousedown', function (event) {
				// event.preventDefault()
				// element[0].draggable = false
				
				var topBorder = element[0].offsetTop
				var leftBorder = element[0].offsetLeft
				var rightBorder = element[0].offsetLeft + element[0].offsetWidth
				var bottomBorder = element[0].offsetTop + element[0].offsetHeight

				var onRightBorderCheck = event.pageX < rightBorder && event.pageX > rightBorder - borderWidth
				var onBottomBorderCheck = event.pageY < bottomBorder && event.pageY > bottomBorder - borderWidth

				if (onRightBorderCheck && onBottomBorderCheck) {
					element[0].draggable = false
					$document.on('mousemove', adjustWidthHeight)
					$document.on('mouseup', adjustMouseUp)

				}		

				if (onRightBorderCheck) {
					element[0].draggable = false
					$document.on('mousemove', adjustWidth)
					$document.on('mouseup', adjustMouseUp)
					
				}	

				if (onBottomBorderCheck) {
					element[0].draggable = false
					$document.on('mousemove', adjustHeight)
					$document.on('mouseup', adjustMouseUp)
					
				}

			})

			element.on('mouseup', function (event) {
				// event.preventDefault()
				element[0].draggable = true
			})

			function adjustHeight () {
				var newHeight = event.pageY - element[0].offsetTop

				if (newHeight < borderWidth) {
					newHeight = borderWidth
				}

				bottomBorder = event.pageY

				element.css({
					height: newHeight + 'px',
				})
			}

			function adjustWidth () {
				var newWidth = event.pageX - element[0].offsetLeft

				if (newWidth < borderWidth) {
					newWidth = borderWidth
				}

				rightBorder = event.pageX

				element.css({
					width: newWidth + 'px',
				})
			}

			function adjustWidthHeight () {
				var newHeight = event.pageY - element[0].offsetTop
				var newWidth = event.pageX - element[0].offsetLeft

				if (newHeight < borderWidth) {
					newHeight = borderWidth
				}

				if (newWidth < borderWidth) {
					newWidth = borderWidth
				}
				 
				bottomBorder = event.pageY
				rightBorder = event.pageX
				element.css({
					height: newHeight + 'px',
					width: newWidth + 'px'
				})
			}

			function adjustMouseUp () {
				element[0].draggable = true
				$document.off('mousemove', adjustWidthHeight)
				$document.off('mousemove', adjustWidth)
				$document.off('mousemove', adjustHeight)
				$document.off('mouseup', adjustMouseUp);
			}

		}
	}
}])

app.directive('fsacontainer', ['$document', function ($document) {
	return {
		link: function (scope, element, attrs) {
			var data

			scope.fsagetdata = 'fsagetdata' in attrs
			if (!!scope.fsagetdata) {
				attrs.fsagetdata = []
			}         	

			element.bind('dragover', function (event) {
				event.preventDefault()
         	});

         	element.bind('drop', function (event) {
         		console.log(event.originalEvent.target)
         		if (event.originalEvent.dataTransfer.getData("auto") === '') {
         			return 
         		}         		
         		data = JSON.parse(JSON.parse(event.originalEvent.dataTransfer.getData("auto")))
         		
         		if (!!scope.fsagetdata) {
					attrs.fsagetdata.push(data)
				}	
         	})
		}
	}
}])
