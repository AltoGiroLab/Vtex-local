var mySwiper4 = new Swiper('#slide-collection-grid-home-4', {
	allowSlideNext: false,
	allowSlidePrev: false
});

var mySwiper3 = new Swiper('#slide-collection-grid-home-3', {
	allowSlideNext: false,
	allowSlidePrev: false
});

var mySwiper2 = new Swiper('#slide-collection-grid-home-2', {
	allowSlideNext: false,
	allowSlidePrev: false
});

var mySwiper1 = new Swiper('#slide-collection-grid-home', {
	// If we need pagination
	pagination: {
		el: '.swiper-pagination',
		type: 'progressbar',
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});

mySwiper1.controller.control = [mySwiper2, mySwiper3, mySwiper4];

  
$(document).ready(function() {
	var lightbox = GLightbox({ 
		    selector: '.glightbox',
		    width: '80vw',
		    height: 'auto',
		    videosWidth: '80vw'
	});


	// $('#instagram-feed').instaJS({
	// 	username: 'altogiro',
	// 	accessToken: 'IGQVJYb0R5bmhzSnFPVHpGN1YwZA0E0TklPZAnliNGFRZAThoREpCV3NpQ2tTRV9RalgtNjR5ci0yZA1dlMExzNUc0MUVDYmJIakE3LV91dXYxVmtRTG5UNjBRckEwSEpuMWRzX2lSM3ZANUEtkenNYcENyOAZDZD',
	// 	limit: 10
	// })
	
	/*

	var user = 'altogiro';
	var totalImages = 10;
	fetch('https://www.instagram.com/'+ user +'/?__a=1')
		.then(res => res.json())
		.then(response => {
			
			var items = response.graphql.user.edge_owner_to_timeline_media.edges;

			items.forEach(function (item, n) {
				if ((n + 1) <= totalImages) {

					var li = '<li><a href="https://www.instagram.com/p/' + item.node.shortcode +'" target="_blank"><img src=' + item.node.thumbnail_src + '></a></li>';
					
					document.querySelector('#instagram-feed').innerHTML += li;
				}
			});
		})
		.catch(error => console.log('Error:', error));
		*/
});

// fim home.js