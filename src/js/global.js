$(document).ready(function() {
	populateCart();
	$(".dimension-Cor").each(function() {
		$(this).append("<img src='https://www.altogiro.net/arquivos/" + convertToSlug($(this).text()) + ".jpg' >");
	});
	
	$(".filtro-cor .opcoes a").each(function() {
		$(this).empty();
		var name = $(this).attr('title');
		$(this).append("<img src='https://www.altogiro.net/arquivos/" + convertToSlug(name) + ".jpg' >");
	});
	$(".filtro-tamanho .opcoes a").each(function() {
		var text = $(this).text().replace(/\(.*\)/, '').replace(/\s/g, "");
		$(this).text(text);
	});

	if ($(".value-field.Tecnologia")) {
		var tecnologias = $(".value-field.Tecnologia").text().split(',');
		var html = '';
		tecnologias.forEach(element => {
			if (element.charAt(0) == " ") {
				element = element.substring(1);
			}
			html += '<div style="width:50px"><img width="42" style="margin:auto; margin-top:20px;display:block" src="/arquivos/' + convertToSlug(element) + '.png"/><span>' + element + '</span></div>'
		});
		$(".value-field.Tecnologia").html(html);
	}

	if ($(".filtro-cor .filtro-ativo")) {
		var name = $('.filtro-cor .filtro-ativo').clone().children().remove().end();
		$(".filtro-cor .filtro-ativo").append("<img src='https://www.altogiro.net/arquivos/"  + convertToSlug(name.text()) + ".jpg' >");
	}

	if ($('.main .searchResultsTime, .main .sub').length > 0) {
		$('.main .searchResultsTime, .main .sub').wrapAll('<div class="bar-filter"></div>');
		$('.main .sub').not(':last').remove();
		$('.main .searchResultsTime').not(':last').remove();
		$('.resultado-busca-numero .label').text('Encontramos');
		var value = $('.resultado-busca-numero .value').text();
		$('.resultado-busca-numero .value').text(value + ' PEÃ‡AS').after('<span> que fazem o seu estilo</span');
	}

	if ($('#admake-advanced-filter').length) {
		$(".filtro-cor").before($(".filtro-tamanho"));
	}

	var coll = document.getElementsByClassName("sub-titulo");
	var i;

	for (i = 0; i < coll.length; i++) {
  		coll[i].addEventListener("click", function() {
    		this.classList.toggle("active");
    		var content = this.nextElementSibling;
    		if (content.style.maxHeight){
      			content.style.maxHeight = null;
    		} else {
      		content.style.maxHeight = content.scrollHeight + "px";
    		} 
  	});
}
});

function populateCart() {
	var times = 0;
	var intervalID = setInterval(function(){ 
		var $itensAux = $('#mini-cart-admake-aux .vtexsc-productList tbody tr');
		if ($itensAux.length > 0) {
			$('.col-mini-cart').ADMAKEminiCart({
				miniCartQtd : '.mini-cart-qty-admake',
			});
			window.clearInterval(intervalID);
		}
		if(times == 3) {
			window.clearInterval(intervalID);
		}
		times++;
	},1000);
}

function convertToSlug(Text)
{
    return Text
        .toLowerCase()
        .replace(/[^\w ]/g,'')
        .replace(/ /g,'-')
        ;
}

function removeItemCarrinho(index) {
	$('#mini-cart-admake .mini-cart-itens').html('<div style="display; block;margin: 0 auto; width:100px"><img width="100" height="100" src="/arquivos/preloader.gif" /></div>');
	vtexjs.checkout.getOrderForm().then(function(orderForm){
		var item = orderForm.items[index];
		item.index = index;
		return vtexjs.checkout.removeItems([item]);
	}).done(function(orderForm){
		console.log('Item removido!');
		console.log(orderForm);
		recarregaCarrinho();
	});
}

function recarregaCarrinho() {
	// Default options
    var options = $.extend( {
		miniCartAux 	: '#mini-cart-admake-aux',
		miniCart 		: '#mini-cart-admake',
		showQtd			: true,
		miniCartQtd		: '.mini-cart-qty-admake',
		miniCartTotal	: '#mini-cart-admake-total',
        htmlItem 		: 	'<div class="mini-cart-item item-{{ID}}">' +
							'	' +
							'	<span class="imagem">' +
							'		{{IMAGEM}}' +
							'	</span>' +
							'	<span class="detalhes">' +
							'		<p class="nome-produto">{{NOME}}</p>' +
							'		<span class="qtd-valor">' +
							'			<span class="qtd">' +
							'				<i class="fa fa-minus" aria-hidden="true" onclick="removeUnidade(\'{{ID}}\')"></i>' +
							'				<input type="text" id="qtd-{{ID}}" value="{{QTD}}" readonly />' +
							'				<i class="fa fa-plus" aria-hidden="true" onclick="adicionaUnidade(\'{{ID}}\')"></i>' +
							'			</span> ' +
							'			<span class="preco">{{PRECO}}</span>' +
							'		</span>' +
							'	</span>' +
							'</div>',
    });

    // Plugin variables
    var $self       	= this;
    var $miniCartHeader = null;
	var $miniCartItens  = null;
	var $miniCartFooter = null;
	var $cartInfos 		= null;

    // Put your DOM elements here
    var elements = {
        $window   		: $( window ),
        $miniCart   	: $( options.miniCart ),
        $miniCartAux   	: $( options.miniCartAux ),
        $miniCartQtd   	: $( options.miniCartQtd ),
        $miniCartTotal 	: $( options.miniCartTotal ),
    };

    var methods = {
        init : function(){
            events.winBind();
        },
		getBoxes : function(){
			$miniCartHeader = elements.$miniCart.find('.mini-cart-header');
			$miniCartItens  = elements.$miniCart.find('.mini-cart-itens');
			$miniCartFooter = elements.$miniCart.find('.mini-cart-footer');
			$cartInfos 		= elements.$miniCartAux.find('.cart-info');
        },
		clearFieds : function() {
			$miniCartItens.html('<div style="display; block;margin: 0 auto; width:100px"><img width="100" height="100" src="/arquivos/preloader.gif" /></div>');
		},
        getQtd : function(){
			var qtd_calc = 0;
			vtexjs.checkout.getOrderForm().then(function(orderForm){
				qtd_calc = orderForm.items.length;
			}).done(function(orderForm){
				console.log(orderForm);
				var qtd = parseInt( qtd_calc );
				var qtd = ( qtd > 0 ) ? qtd : 0 ;

				if( options.showQtd ){
					elements.$miniCartQtd.html( qtd );
				}

				if( qtd < 1 ){
					elements.$miniCart.hide();
				}
			});
        },
        getItens : function(){
			vtexjs.checkout.getOrderForm().then(function(orderForm){
				$miniCartItens.html("");
				$.each( orderForm.items, function(i, item){
					var imagem 		= '<a class="sku-imagem" href="' + item.detailUrl + '"><img height="71" width="71" alt="' + item.name + '" src="' + item.imageUrl + '"></a><div onclick="removeItemCarrinho(\'{{ID}}\')" style="display: inline;position: absolute;right: 15px;top: 20px;line-height: 17px;"><img src="/arquivos/close-cart.svg" alt="Remover Produto"></div>';
					var nome 		= '<a href="' + item.detailUrl + '">' + item.name + '</a>';
					var preco 		= item.formattedPrice;
					var qtd 		= item.quantity;

					$miniCartItens.append(
						options.htmlItem.replace( /\{{IMAGEM}}/g, 	imagem )
										.replace( /\{{NOME}}/g, 	nome )
										.replace( /\{{PRECO}}/g, 	preco )
										.replace( /\{{QTD}}/g, 		qtd )
										.replace( /\{{ID}}/g, 		i )
					);
				});
			}).done(function(orderForm){
				console.log('Recarregou o carrinho.');
			});
        },
        getTotal : function(){
			var preco_total = 0;
			vtexjs.checkout.getOrderForm().then(function(orderForm){
				preco_total = orderForm.value;
			}).done(function(orderForm){
				var total = 'R$ ' + formatReal(preco_total);
				elements.$miniCartTotal.html( total );
			});
        }
    };

    // Plugin events
    var events = {
        winBind : function(){
           	elements.$window.bind( "load", function(){
            	methods.getQtd();
            	methods.getItens();
            	methods.getTotal();
           	});
        },
    };

    methods.init();
	methods.getBoxes();
	methods.clearFieds();
	methods.getQtd();
    methods.getItens();
    methods.getTotal();
}


function adicionaUnidade(index) {
	$('#mini-cart-admake .mini-cart-itens').html('<div style="display; block;margin: 0 auto; width:100px"><img width="100" height="100" src="/arquivos/preloader.gif" /></div>');
	/*
	vtexjs.checkout.getOrderForm().then(function(orderForm){
		var item = orderForm.items[index];
		item.index = index;

		if (item.quantity < 5) {
			item.quantity = item.quantity + 1;
    		return vtexjs.checkout.updateItems([item]);
		}
	}).done(function(orderForm){
		console.log('Quantidade removida!');
		console.log(orderForm);
		recarregaCarrinhoFull();
	});
	*/
	vtexjs.checkout.getOrderForm().then(function(orderForm) {
	    var itemIndex = index;
	    var item      = orderForm.items[itemIndex];
	    var new_qtd   = item.quantity + 1;
	    var updateItem = {
	      index: itemIndex,
	      quantity: new_qtd
	    };
	    return vtexjs.checkout.updateItems([updateItem], null, false);
	}).done(function(orderForm) {
	    //console.log('Items atualizados!');
	    //console.log(orderForm);

	    /*
	    var total = orderForm.value;
		if(formatReal(total) > formatReal(399.90)) {
			Swal.fire({
				icon: 'success',
				title: 'ParabÃƒÆ’Ã‚Â©ns',
				showConfirmButton: false,
				showCloseButton: true,
				html: 'VocÃƒÆ’Ã‚Âª atingiu R$ 399,90 em compras e pode escolher um cinto GRÃƒÆ’Ã‚ÂTIS ÃƒÂ°Ã…Â¸Ã‹Å“Ã‚Â <br/> Clique no link abaixo para adicionar o seu preferido ao carrinho!',
				footer: '<a href="https://www.moikana.com.br/acessorios/cintos">Clique aqui e escolha seu brinde</a>'
			})
		}
		*/
	    
	    recarregaCarrinho();
	});
}

function removeUnidade(index) {
	$('#mini-cart-admake .mini-cart-itens').html('<div style="display; block;margin: 0 auto; width:100px"><img width="100" height="100" src="/arquivos/preloader.gif" /></div>');
	/*
	vtexjs.checkout.getOrderForm().then(function(orderForm){
		var item = orderForm.items[index];
		item.index = index;

		if (item.quantity == 1) {
			return vtexjs.checkout.removeItems([item]);
		} else {
			item.quantity = item.quantity - 1;
    		return vtexjs.checkout.updateItems([item]);
		}
	}).done(function(orderForm){
		console.log('Quantidade removida!');
		console.log(orderForm);
		recarregaCarrinhoFull();
	});
	*/

	vtexjs.checkout.getOrderForm().then(function(orderForm) {
	    var itemIndex = index;
	    var item      = orderForm.items[itemIndex];
	    var new_qtd   = item.quantity - 1;

	    if (item.quantity == 1) {
			return vtexjs.checkout.removeItems([item]);
			console.log('Item removido!');
		} else {
    		var updateItem = {
		      index: itemIndex,
		      quantity: new_qtd
		    };
		    return vtexjs.checkout.updateItems([updateItem], null, false);
		    console.log('Item atualizado!');
		}
	    
	    
	}).done(function(orderForm) {
	    console.log(orderForm);
	    recarregaCarrinho();
	});
}

function formatReal( valor )
{
        var tmp = valor+'';
        tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
        if( tmp.length > 6 )
                tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

        return tmp;
}