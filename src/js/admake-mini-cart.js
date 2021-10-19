/**
* Plugin Authoring
*
* @author Leonam Bernini / ADMAKE <leonambernini@admake.com.br>
*
**/
;(function( $ ){

  "use strict";

  $.fn.ADMAKEminiCart = function( params ) {

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
      }, params);

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
          getQtd : function(){
            var qtd = parseInt( $cartInfos.find('.amount-items-em').html() );
      var qtd = ( qtd > 0 ) ? qtd : 0 ;
      
      if( options.showQtd ){
        elements.$miniCartQtd.html( qtd );
      }

      if( qtd < 1 ){
        elements.$miniCart.hide();
      }
          },
          getItens : function(){
      vtexjs.checkout.getOrderForm().then(function(orderForm){
        $miniCartItens.html("");
        $.each( orderForm.items, function(i, item){
          var imagem 		= '<a class="sku-imagem" href="' + item.detailUrl + '"><img height="71" width="71" alt="' + item.name + '" src="' + item.imageUrl + '"></a><div style="display: inline;position: absolute;right: 15px;top: 20px;line-height: 17px;"><img src="/arquivos/close-cart.svg" alt="Remover Produto"></div>';
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
      /*
      var $itensAux = elements.$miniCartAux.find('.vtexsc-productList').find('tbody').find('tr');
      if( $itensAux.length > 0 ){
        $.each( $itensAux, function(i){
          var $this 		= $(this);
          var imagem 		= $this.find('.cartSkuImage').html();
          var nome 		= $this.find('.cartSkuName').find('h4').html();
          var preco 		= $this.find('.cartSkuPrice').find('.bestPrice').html();
          var qtd 		= $this.find('.cartSkuQuantity').find('.vtexsc-skuQtt').html();

          $miniCartItens.append( 
            options.htmlItem.replace( /\{{IMAGEM}}/g, 	imagem )
                    .replace( /\{{NOME}}/g, 	nome )
                    .replace( /\{{PRECO}}/g, 	preco )
                    .replace( /\{{QTD}}/g, 		qtd )
                    .replace( /\{{ID}}/g, 		i )
          );
        });
      }
      */
          },
          getTotal : function(){
            var total = $cartInfos.find('.total-cart-em').html();
      elements.$miniCartTotal.html( total );
          }
      };
      
      // Plugin events
      var events = {
          winBind : function(){
                methods.getBoxes();
                methods.getQtd();
                methods.getItens();
                methods.getTotal();
          },
      };

      methods.init();

  };

})(jQuery);