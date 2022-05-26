
$(document).ready(function () {
	// dev only
	// let containerMosaic = document.getElementsByClassName('ag-grid-collection-complet')[1]
	// containerMosaic.removeAttribute('style')
	// document.getElementsByClassName('ag-grid-collection-complet')[1].removeAttribute('style')
	document.getElementsByClassName('fullbanner')[0].removeAttribute('style')
	// $('.fullbanner').slick()
	// dev only

	$('#home-mosaic .column-1 .slider-top').slick({
		lazyLoad: 'ondemand',
		infinite: false,
		arrows: false,
	}).on('beforeChange', function(event, slick, currentSlide, nextSlide){
		changeMosaicSlide(currentSlide, nextSlide)
	});

	$('#home-mosaic .column-1 .slider-bottom').slick({
		lazyLoad: 'ondemand',
		infinite: false,
		arrows: true,
		appendArrows: '.slider-pagination-container',
		prevArrow: '<button class="btn btn-default btn-lg"><i class="fa fa-chevron-left"></i></button>',
		nextArrow: '<button class="btn btn-default btn-lg"><i class="fa fa-chevron-right"></i></button>',
	}).on('beforeChange', function(event, slick, currentSlide, nextSlide){
		changeMosaicSlide(currentSlide, nextSlide)
	});

	$('#home-mosaic .column-2 .slider-top').slick({
		lazyLoad: 'ondemand',
		infinite: false,
		arrows: false,
	}).on('beforeChange', function(event, slick, currentSlide, nextSlide){
		changeMosaicSlide(currentSlide, nextSlide)
	});

	$('#home-mosaic .column-2 .slider-bottom').slick({
		lazyLoad: 'ondemand',
		infinite: false,
		arrows: false,
	}).on('beforeChange', function(event, slick, currentSlide, nextSlide){
		changeMosaicSlide(currentSlide, nextSlide)
	});

	$('#home-mosaic .column-3 .slider-top').slick({
		lazyLoad: 'ondemand',
		infinite: false,
		arrows: false,
	}).on('beforeChange', function(event, slick, currentSlide, nextSlide){
		changeMosaicSlide(currentSlide, nextSlide)
	});

	$('#home-mosaic .column-3 .slider-bottom').slick({
		lazyLoad: 'ondemand',
		infinite: false,
		arrows: false,
	}).on('beforeChange', function(event, slick, currentSlide, nextSlide){
		changeMosaicSlide(currentSlide, nextSlide)
	});

	function changeMosaicSlide(currentSlide, nextSlide) {
		$('.slider-top').each(function () {
			if (currentSlide > nextSlide) {
				$(this).slick('slickPrev')
			} else {
				$(this).slick('slickNext')
			}
		})
		$('.slider-bottom').each(function () {
			if (currentSlide > nextSlide) {
				$(this).slick('slickPrev')
			} else {
				$(this).slick('slickNext')
			}
		})
	}
});