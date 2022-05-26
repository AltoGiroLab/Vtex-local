/*
 *
 * Desenvolvido por Integrando.se
 * hello@integrando.se
 * 
 * Bootstrap v.3
 *
 */
$(document).ready( function(){

	if ($.fn.ADMAKEadvancedFilter) {
		$(document).ADMAKEadvancedFilter({
            tipoFiltros     : {},
		});
	}
	if ($.fn.ADMAKEmenu) {
		$(document).ADMAKEmenu();
	}

	var $btnComprar = $('.btn-add-buy-button-asynchronous');
	if ($btnComprar.length) {
		$btnComprar.html('Adicionar à  sacola');
	}

	var $btnComprarProduto = $('.buy-button.buy-button-ref');
	if ($btnComprarProduto.length) {
		if( $('#comprar-flutuante').length ){
			var $comprarFlutuante = $('#comprar-flutuante');
			var btnComprarTop = $('.product-info .buy-button-box').offset().top;
			$(window).scroll( function(){
				if( $(window).width() > 768 ){
					if( $(this).scrollTop() >= btnComprarTop && !$comprarFlutuante.is(':visible') ){
						$comprarFlutuante.fadeIn( function(){
							var urlImage = ( $('#include #image-main').attr('src') != '' ) ? $('#include #image-main').attr('src') : '/arquivos/sem-foto.gif';
							$('#foto-comprar-flutuante').attr('src', urlImage);
							$('body').css('padding-bottom', $comprarFlutuante.height() + 30);
						});
					}else if( $(this).scrollTop() < btnComprarTop && $comprarFlutuante.is(':visible') ){
						$comprarFlutuante.fadeOut( function(){
							$('body').css('padding-bottom', 0);
						});
					}					
				}
			});
		}


		$btnComprarProduto.html('Adicionar à  sacola');

		var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? true : false;

		$btnComprarProduto.click(function (e) {
			// e.preventDefault();
			console.log('clicou');
			
			var $this = $(this);
			var url   = $this.attr('href');
			// if( url.indexOf('qty=1') > 0 ){
				// $this.attr('href', url.replace('qty=1', 'qty='+ parseInt( $('.buy-button-box .box-qtd .qtd').val() ) ) );
			// }

			if(!isMobile) {
				if( url.indexOf('sku=') > 0 ){
					// Linha comentada pra não dar o problema de redirecionamento quando clica no botão comprar
					// Esse redirecionamento retira o qty=1 da url e coloca um qty=NaN,
					// indicando que o parseInt da função abaixo, não é um número
					// Walter Jaworski - 10/12/2021
					// $this.attr('href', url.replace('qty=1', 'qty='+ parseInt( $('.buy-button-box .box-qtd .qtd').val() ) ) );
					var id = url.substring((url.indexOf('sku=')+4),url.indexOf('&qty='));
					var item = {
						id: id,
						quantity: 1,
						seller: 1
					};
					vtexjs.checkout.addToCart([item], null, 1);

					$('.mini-cart .btn-mini-cart').click();

					recarregaCarrinho();
					
					return false;
				}
			}
		});
	
		var $recebeQtyForm = $btnComprarProduto.parents('.buy-button-box');
		if( $recebeQtyForm.length ){
			$recebeQtyForm.prepend(
				'<div class="pull-left box-qtd">' +
				'	<input type="text" class="qtd pull-left" value="1" />' +
				'	<div class="bts pull-left">' +
				'		<button class="btn btn-mais">+</button>' +
				'		<button class="btn btn-menos">-</button>' +
				' 	</div>' +
				'</div>'
			);
			$(document).on('keypress' , '.buy-button-box .box-qtd .qtd', function(e){
				var tecla = ( window.event ) ? event.keyCode : e.which;   
			    if( ( tecla > 47 && tecla < 58 ) ){
			    	return true;
			    }else{
			    	if ( tecla == 8 || tecla == 0 ){
			    		return true;
			    	}else{
			    		return false;
			    	}
			    }
			});
			$(document).on('keyup' , '.buy-button-box .box-qtd .qtd', function(e){
				$('.buy-button-box .box-qtd .qtd').val( $(this).val() );
			});
			$(document).on('blur' , '.buy-button-box .box-qtd .qtd', function(e){
				var $this = $(this);
				if( $this.val() === '' || parseInt( $this.val() ) < 1 ){
					$('.buy-button-box .box-qtd .qtd').val(1);
				}else{
					$('.buy-button-box .box-qtd .qtd').val( $this.val() );
				}
			});
			$(document).on('click', '.buy-button-box .box-qtd .btn', function(){
				var $this = $(this);
				var $qtd  = $('.buy-button-box .box-qtd .qtd');
				var valor = parseInt( $qtd.val() );
				if( $this.hasClass('btn-mais') ){
					$qtd.val( valor + 1 );
				}else if( $this.hasClass('btn-menos') ){
					if( valor > 1 ){
						$qtd.val( valor - 1 );
					}
				}
			});
		}
	}

	if( $.fn.owlCarousel ){
		setTimeout(function () {
			var win = $(this); //this = window
			if (win.width() <= 650) {
				if ($('.box-banner img').length) {
					$('.box-banner img').each(function () {
						$(this).attr('src','/arquivos/' + $(this).attr('alt') + '-mobile.jpg');
						if ($(this).attr('alt') == 'banner-amor-ta-on') {
							$(this).attr('src','/arquivos/' + $(this).attr('alt') + '-mobile.gif');
						}
					})
				}
			}
		}, 50);

		$('.fullbanner').owlCarousel({
			items: 1,
			singleItem: true,
			autoPlay: true,
			stopOnHover: true,
			navigation: true,
			autoHeight: false,
			navigationText: ['<i class="fa fa-chevron-left"></i>','<i class="fa fa-chevron-right"></i>'],
		})

		// var $fullbanner = $(".fullbanner");
		// if( $fullbanner.length ){
		// 	$fullbanner.owlCarousel({
		// 	 	items 			: 1,
		// 	    singleItem 		: true,
		// 	    autoPlay 		: true,
		// 	    stopOnHover 	: true,
		// 	    navigation 		: true,
		// 	    autoHeight 		: false,
		// 	    navigationText 	: ['<i class="fa fa-chevron-left"></i>','<i class="fa fa-chevron-right"></i>'],
		// 	});
		// }

		var $carouseltop = $(".owl-carousel-top");
		if( $carouseltop.length ){
			$carouseltop.owlCarousel({
			 	items 			: 1,
			    singleItem 		: true,
			    autoPlay 		: true,
			    stopOnHover 	: false,
			    navigation 		: false,
			    autoHeight 		: false,
			});
		}

		var $showCaseOwl = $(".showcase-owl .ag-prateleira > ul");
		if( $showCaseOwl.length ){
			$showCaseOwl.find('.helperComplement').remove();
			$showCaseOwl.owlCarousel({
			 	items 				: 4,
			    autoPlay 			: true,
			    stopOnHover 		: true,
			    pagination 	 		: false,
			    itemsDesktop 		: [1199,4],
			    itemsDesktopSmall 	: [980,4],
			    itemsTablet 		: [768,3],
			    itemsMobile 		: [479,1],
			    navigation 			: true,
			    navigationText 		: ['<button class="btn btn-default btn-lg"><i class="fa fa-chevron-left"></i></button>','<button class="btn btn-default btn-lg"><i class="fa fa-chevron-right"></i></button>'],
			});
		}

	}

});
// Fim ag-default