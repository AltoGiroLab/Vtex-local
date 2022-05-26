/*
 *
 * New Functions Index
 * 1. Call Functions
 * 2. Modifier Buy Together
 * 3. Mini Cart and WhatsApp Button modifier
 * 4. WhatsApp button position modifier
 * 5. Request product info via VTEX Search API and add video to page
 * 6. Add jquery tabs to Regulamentos page
 * 7. Fix flag label in product page
 * 8. Fix flag label on shelfs
 * 9. Get cart id on Live Commerce page
 * 10. Banner home fix
 * 11. New toolbar
 * 12. Fix menu mobile
 * 13. Fix search mobile
 * 14 Fix filter in department page
 * 
 */

/*
 *
 * 1. Call Functions
 * 
 */

// Define mobile const
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? true : false;

// 2. Modifier Buy Together
if (document.getElementsByClassName('group_1').length === 2) {
  document.querySelector('.group_1').addEventListener('change', () => {
    setTimeout(function () {
      document.getElementsByClassName('newItemA').length === 0 && buyTogetherModifier();
      document.getElementById('divCompreJunto').children.length === 2 && buyTogetherModifier();
    }, 1700);
  });
};

// 3. Mini Cart and WhatsApp Button modifier
// 4. WhatsApp button position modifier
  $(".btn-mini-cart").on("click", function() {
    MiniCartModifier();
    setTimeout(function () {
      WhatsAppButtonModifier();
    }, 500);
    $('#close-mini-cart-button').on("click", function() {
      setTimeout(function () {
        WhatsAppButtonModifier();
      }, 500);
    });
  });
  
  $('#close-mini-cart-button').on("click", function() {
    setTimeout(function () {
      WhatsAppButtonModifier();
    }, 500);
  });
  
  $('.lf-cart__darken').on("click", function() {
    setTimeout(function () {
      WhatsAppButtonModifier();
    }, 500);
  });

// 5. Request product info via VTEX Search API and add video to page
const pathNameFiveFunc = window.location.pathname
if (window.location.pathname.substring(pathNameFiveFunc.length, pathNameFiveFunc.length - 2) === '/p') {
  // const allBotaoZoom = document.querySelectorAll('#botaoZoom');
  // setTimeout(function () {
  //   allBotaoZoom[0].click();
  // }, 100);
  // setTimeout(function () {
  //   allBotaoZoom[1].click();
  // }, 110);
  // setTimeout(function () {
  //   allBotaoZoom[0].click();
  // }, 120);
  setTimeout(function () {
    addVideosToProduct();
  }, 130);
};

// 6. Add jquery tabs to Regulamentos page
if (window.location.pathname === '/regulamentos') {
  regulamentoTabs();
};

// 7. Fix flag label in product page
if (window.location.pathname.substring(pathNameFiveFunc.length, pathNameFiveFunc.length - 2) === '/p') {
  fixProductFlag();
};

// 8. Fix flag label on shelfs
if (window.location.pathname.substring(pathNameFiveFunc.length, pathNameFiveFunc.length - 2) !== '/p') {
  fixProductFlag();
};

// 9. Get cart id on Live Commerce page
if (window.location.pathname === '/live-commerce') {
  setTimeout(function () {
    // getCartCookie('checkout.vtex.com');

    ;(function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.onload = function () {
        //Extract Cookie VTEX
        var cookies = document.cookie.split('; ').find(row => row.startsWith('checkout.vtex.com'));
        var cartId = cookies ? cookies.split('=')[2] : 'INVALID-VTEX-COOKIE';

        //Initialize Player
        var mimoPlayer = new window.MimoPlayer({
          liveId: '1ec3e375-1ba5-63c4-911c-02991c64708e',
          configEndpoint: 'https://api.mimo.com.br/api/(MIMO_API_VERSION)/config/(MIMO_LIVE_ID)',
          cartId: cartId,

          //Event Capture
          middleware: function (store) {
            return function (next) {
              return function (action) {
                switch (action.type) {
                  case "checkout/intent_addedToCart":
                    recarregaCarrinho();
                }
                return next(action);
              };
            };
          },
        });
 
        //Container
        var mimoContainer = document.createElement("div");
        mimoContainer.style.width = '100%';
        mimoContainer.style.height = '800px';
        mimoContainer.appendChild(mimoPlayer);

        //Add container do Body
        d.body.getElementsByClassName('live-commerce')[0].appendChild(mimoContainer);
      };
      js.src = "//sdk.mimo.com.br/0.0.1/index.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'mimo-jssdk'));
  }, 500);
};

// 10. Banner home fix
// Caso tenha slider na barra preta do topo, precisa ser [1], senão precisa ser [0]
if (window.location.pathname === '/' && isMobile) {
  // document.getElementsByClassName('fullbanner')[0].setAttribute('style', 'height: 420px;')
  setTimeout(function () {
    document.getElementsByClassName('owl-wrapper-outer')[1].setAttribute('style', 'height: 464px;')
  }, 500);
}

// 11. New toolbar
$('.toolbar__header .container .right').slick({
  arrows: false,
  autoplay: true,
})

$('.toolbar__header .container.mobile .all').slick({
  arrows: false,
  autoplay: true,
})

// 12. Fix menu mobile
if (isMobile) {
  fixMobileMenu();
}

// 13. Fix search mobile
if (isMobile) {
  fixMobileSearch();
}

/*
 *
 * 2. Modifier Buy Together
 * 
 */
function buyTogetherModifier() {
  const BTdivCompreJunto = document.getElementById('divCompreJunto');

  // Removes display:none from divCompreJunto parent
  BTdivCompreJunto.parentNode.removeAttribute('style');

  // Change Buy Together Title
  const BTTitle = document.getElementById('divTitulo');
  BTTitle.innerText = 'Complete o look';
  
  // Create new divs
  const BTLine1 = document.createElement('div');
  BTLine1.classList.add('BTLinha1');
  const BTLine2 = document.createElement('div');
  BTLine2.classList.add('BTLinha2');
  const BTdivItemA = document.createElement('div');
  BTdivItemA.classList.add('newItemA');
  const BTdivItemB = document.createElement('div');
  BTdivItemB.classList.add('newItemB');
  const BTdivPlus = document.createElement('div');
  BTdivPlus.classList.add('newPlus');
  const BTdivEqual = document.createElement('div');
  BTdivEqual.classList.add('newEqual');
  const BTdivBuy = document.createElement('div');
  BTdivBuy.classList.add('newBuy');
  const BTTotal = document.createElement('p');
  BTTotal.classList.add('BTTotal');
  const BTTotalText = document.createElement('p');
  BTTotalText.classList.add('BTTotalText');
  const BTdivDiscount = document.createElement('div');
  BTdivDiscount.classList.add('newDiscount');
  const BTTotalDiscount = document.createElement('p');
  BTTotalDiscount.classList.add('BTTotalDiscount');
  
  // Add divs to parent
  BTdivCompreJunto.append(BTLine1, BTLine2);
  BTLine1.append(BTdivItemA, BTdivPlus, BTdivItemB);
  BTdivBuy.append(BTTotal, BTTotalText);
  BTdivDiscount.append(BTTotalDiscount);
  BTLine2.append(BTdivBuy,BTdivDiscount);
  
  // Get old values from table
  const BTOldItemA = document.getElementsByClassName('itemA');
  const BTOldItemB = document.getElementsByClassName('itemB');
  const BTOldPlus = document.getElementsByClassName('plus');
  const BTOldBuy = document.getElementsByClassName('buy');
  const BTOldBuyDiscount = BTOldBuy[0].querySelectorAll('strong')[2];

  // Change .buy text before send to new div
  const BTdivBuyNewPrice = BTOldBuy[0].innerHTML.substring(BTOldBuy[0].innerHTML.indexOf('total'));
  const BTdivBuyNewLink = document.getElementsByClassName('comprar-junto');
  const lnkComprar = document.getElementById('lnkComprar');
  lnkComprar.innerText = 'Adicionar à sacola';
  
  // Get New Content and separate
  const BTdivBuyNewContentArray = BTdivBuyNewPrice.split(' ', 4);
  const BTNewTotal = BTdivBuyNewContentArray[0].slice(0, -1);
  BTTotal.append(BTNewTotal);
  const BTNewTotalRs = BTdivBuyNewContentArray[2];
  const BTNewTotalValue = BTdivBuyNewContentArray[3];
  BTTotalText.append(BTNewTotalRs, ' ', BTNewTotalValue);

  // Get New Discount
  const BTdivNuyNewDiscount = BTOldBuyDiscount.innerText.split(' ', BTOldBuyDiscount.innerText.length);
  const BTNewDiscount = BTdivNuyNewDiscount[5];

  
  // Pass old values for new divs
  BTdivItemA.insertAdjacentHTML('afterbegin', BTOldItemA[0].innerHTML);
  BTdivItemB.insertAdjacentHTML('afterbegin', BTOldItemB[0].innerHTML);
  BTdivPlus.insertAdjacentHTML('afterbegin', BTOldPlus[0].innerHTML);
  BTdivBuy.append(BTTotal, BTTotalText);
  BTdivBuy.insertAdjacentHTML('beforeend', BTdivBuyNewLink[0].innerHTML);
  BTTotalDiscount.append('Economize R$ ',BTNewDiscount);


  // Change images
  const BTNewItemA = document.getElementsByClassName('newItemA');
  const BTNewItemAImg = BTNewItemA[0].children[0].children[0]
  BTNewItemAImg.src = BTNewItemAImg.src.replace(/\-90\-90/g, '-145-190');
  BTNewItemAImg.style.width = '145px';
  BTNewItemAImg.style.height = '190px';

  const BTNewItemB = document.getElementsByClassName('newItemB');
  const BTNewItemBImg = BTNewItemB[0].children[0].children[0]
  BTNewItemBImg.src = BTNewItemBImg.src.replace(/\-90\-90/g, '-145-190');
  BTNewItemBImg.style.width = '145px';
  BTNewItemBImg.style.height = '190px';
  
  setTimeout(function () {
    // Remove table and hr from #divCompreJunto
    const BTOldTable = BTdivCompreJunto.getElementsByTagName('table');
    const BTOldHr = BTdivCompreJunto.getElementsByTagName('hr');
    BTOldTable[0].setAttribute('style', 'display:none;');
    BTOldHr[0].remove();
  }, 500);
};

/*
 *
 * 3. Mini Cart and WhatsApp Button modifier
 * This modifier affects only desktop version
 * 
 */

function MiniCartModifier() {
  const divMiniCart = document.querySelector('#mini-cart-admake');

  setTimeout(function () {
    // Get #mini-cart-admake width and .mini-cart-header and .mini-cart-footer height
    const MCHeader = document.querySelector('.mini-cart-header');
    const MCHeaderHeight = MCHeader.offsetHeight;
    const MCFooter = document.querySelector('.mini-cart-footer');
    const MCFooterHeight = MCFooter.offsetHeight;

    // Get mini-cart-itens height and modify
    const MCItens = document.querySelector('.mini-cart-itens');
    const MCItensNewHeight = MCHeaderHeight + MCFooterHeight;
    MCItens.setAttribute('style', `height: calc(100vh - ${MCItensNewHeight}px);`);
  }, 800);
};

/*
 *
 * 4. WhatsApp button position modifier
 * 
 */
function WhatsAppButtonModifier() {
  const divMiniCart = document.querySelector('#mini-cart-admake');
  let MCWidth = divMiniCart.offsetWidth;

  // Change WhatsApp button position when mini cart is open
  const divMiniCartHasStyle = divMiniCart.getAttribute('style');
  const getFooter = document.querySelector('#footer');
  const getWhatsAppButton = getFooter.querySelector('.float');
  MCWidth === 0 && getWhatsAppButton.setAttribute('style', 'right: 28px;');
  divMiniCartHasStyle === 'display: none;' ? getWhatsAppButton.setAttribute('style', 'right: 28px;') : '';
  divMiniCartHasStyle === 'display: block;' ? getWhatsAppButton.setAttribute('style',  "right: calc("+MCWidth+"px + 28px);") : '';

  // if windows rezided
  window.addEventListener('resize', function(event) {
    setTimeout(function () {
      MCWidth = divMiniCart.offsetWidth;
      getWhatsAppButton.setAttribute('style', `right: calc(${MCWidth}px + 28px);`);
    }, 250);
  }, true);
};

/*
 *
 * 5. Request product info via VTEX Search API and add video to page
 * https://developers.vtex.com/vtex-rest-api/reference/search-3#searchbyproducturl
 * 
 */
function addVideosToProduct() {
  const urlGet = `https://altogirorc.vtexcommercestable.com.br/api/catalog_system/pub/products/search${window.location.pathname}`;

  let getSkuReference = document.getElementsByClassName('skuReference');
  getSkuReferenceValue = getSkuReference[0].innerText;

  const divVideo = document.createElement('div');
  divVideo.setAttribute('id', 'divVideo');
  divVideo.setAttribute('style', 'display:none;');
  document.querySelector('#include').appendChild(divVideo);

  const newThumbsDiv = document.createElement('div');
  newThumbsDiv.setAttribute('id', 'newThumbsDiv');
  document.querySelector('#show').appendChild(newThumbsDiv);
  setTimeout(function () {
    const thumbsDiv = document.querySelector('.thumbs');
    document.querySelector('#newThumbsDiv').appendChild(thumbsDiv);
  }, 500);

  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      // Save response data
      const responseData = xhr.responseText;
      // Pass response to JSON.parse
      const responseParse = JSON.parse(responseData);
      // Get items from response data
      const responseDataItems = responseParse[0].items;
      // Search sku in response data items
      if (window.location.pathname === '/top-alto-giro-fax-costas-decotada-110351/p') {
        getSkuReferenceValue = '1234';
      }
      const responseDataExactProduct = responseDataItems.find(element => element.itemId === getSkuReferenceValue);
      // Get videos from item found
      const responseDataExactProductVideos = responseDataExactProduct.Videos;

      // Get thumbnails from product active
      const productImages = document.getElementById('newThumbsDiv');

      if (responseDataExactProductVideos.length > 0) {
          let productVideos = Array.from(responseDataExactProductVideos).map(function(item, index){
            let videoCode = '';
          
            if (item.includes('https://www.youtube.com/watch?v=')) {
              videoCode = item.substring(item.indexOf("=") + 1);
            }
          
            if (item.includes('https://youtu.be/')) {
              videoCode = item.substring(item.indexOf(".be/") + 4);
            }
    
            return `
              <li key=${index}>
                <a href="javascript:void(0);" data-video=${videoCode} class="videoThumb">
                  <img src="https://img.youtube.com/vi/${videoCode}/sddefault.jpg" width="58" height="70" />
                </a>
              </li>
            `;
          });
    
          let productVideosUl = `<ul class="video-thumbs">${productVideos.join('')}</ul>`;
            productImages.innerHTML = productImages.innerHTML + productVideosUl;
    
          $(".video-thumbs a").on("click", function () {
            divVideo.setAttribute('style', 'display:block;');
            let videoCode = $(this).attr('data-video');
            let embedCode = `<iframe width="422" height="514" src="https://www.youtube.com/embed/${videoCode}?controls=0&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="height:514px!important"></iframe>`;
            document.getElementById('divVideo').innerHTML = embedCode;
          });
          
          $(".thumbs a").on("click", function () {
            divVideo.setAttribute('style', 'display:none;');
            document.getElementById('divVideo').innerHTML = '';
          });
      }
    }
  };
  xhr.open('GET', urlGet);
  xhr.send();
}

/*
 *
 * 6. Add jquery tabs to Regulamentos page
 * 
 */
function regulamentoTabs() {
  if(!isMobile) {
    $('.nav-tabs a').on('click', function (event) {
      event.preventDefault();
      
      $('.tab-active').removeClass('tab-active');
      $(this).parent().addClass('tab-active');
      $('.tab-content div').hide();
      $($(this).attr('href')).show();
      window.location.hash = $(this).attr('href');
    
      const bodyOffset = $('body').offset();
      scrollTo(bodyOffset.top, bodyOffset.left);
    });
    
    if (!!window.location.hash) {
      const hash = window.location.hash;
      $(`.nav-tabs a[href^="${hash}"]`).trigger('click');
    } else {
      $('.nav-tabs a:first').trigger('click');
    }
  }

  if (isMobile) {
    $('.ag-regulamentos').prepend('<select class="select-tabs"></select>');

    $('.nav-tabs').children('li').each(function() {
      let valueHash = $(this).children()[0].hash
      $('.select-tabs').append($('<option />').attr('value', valueHash).html($(this).html()));
    });

    $('.nav-tabs').attr('style', 'display:none;');

    $('.select-tabs').on('change', function () {
      window.location.hash = this.value;

      $('.tab-pane').removeClass('active');
      $(this.value).addClass('active');
    
      const bodyOffset = $('body').offset();
      scrollTo(bodyOffset.top, bodyOffset.left);
    });
    
    if (!!window.location.hash) {
      const hash = window.location.hash;
      $(`.select-tabs option[value="${hash}"]`).attr('selected','selected');
      $('.tab-pane').removeClass('active');
      $(hash).addClass('active');
    } else {
      $(".select-tabs option:first").attr('selected','selected');
    }
  }
}

/*
 *
 * 7. Fix flag label in product page
 * 
 */
function fixProductFlag() {
  let discountFlag = document.getElementsByClassName('flag')
  // let discountFlagZero = discountFlag[0]
  // subFunction()

  if (discountFlag.length === 2) {
    discountFlagZero = discountFlag[0]
    subFunction()
  } else {
    for (var i = 0, len = discountFlag.length; i < len; ++i) {
      discountFlagZero = discountFlag[i]
      subFunction()
    }
  }

  function getLastWord(words) {
      var n = words.split(" ");
      return n[n.length - 1];
  }

  function subFunction() {
    let discountFlagInnetHTML = discountFlagZero.innerHTML
    if (discountFlag.length !== 0 && discountFlagInnetHTML.includes('OFF')) {
      let wordCount
      if (getLastWord(discountFlagInnetHTML) === 'OFF') {
        wordCount = 3
      } else {
        wordCount = 8
      }
      let textLength = discountFlagInnetHTML.length
      let newContent = discountFlagInnetHTML.substring(0, textLength - wordCount) + "<br />" + discountFlagInnetHTML.substring(textLength - wordCount)
      discountFlagZero.innerHTML = newContent
      if (discountFlagZero.innerHTML.includes('<br><br>')) {
        discountFlagZero.innerHTML = newContent
      }
    }
  }
}

// 8. Only in Call Functions

/*
 *
 * 9. Get cart id on Live Commerce page
 * 
 */
function getCartCookie(name) {
  let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) {
    match = match[2];
    match = match.substring(7, match.length);
    // let iframe = document.getElementsByTagName('iframe')[0];
    // let iframeSrc = iframe.src+"&cartId="+match;
    // iframe.src = iframeSrc;

    // Forma seucndária
    let embedCode = `<iframe src="https://sdk.mimo.com.br/0.0.1/embed/player.html?liveId=1ec3e375-1ba5-63c4-911c-02991c64708e&cartId=${match}" style="height:800px;width:100%;" title="Mimo"></iframe>`;
    document.getElementsByClassName('live-commerce')[1].innerHTML = embedCode;

  } else {
    console.log('Erro ao pegar id do carrinho');
  }
}

// 10. Only in Call Functions

// 11. Only in Call Functions

/*
 *
 * 12. Fix menu mobile
 * 
 */
function fixMobileMenu() {
  // select target
  let target = document.querySelector('.nav-menu');
  let classes;

  // create new observator instance
  let observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      classes = mutation.target.classList.value

      if (classes.includes('nav-menu--active')) {
        divLayer.setAttribute('style', 'position: absolute;top: 0; left: 0; width:100vw; height:100vh; background: rgba(0,0,0,0.5); transition: all 0.5s 0s ease;');
        divLayer.setAttribute('onClick', 'toggleOpenMenuMobile()');
      } else {
        divLayer.setAttribute('style', 'position: absolute; top: 0; left: -100vw; width:100vw; height:100vh; transition: all 0.5s 0s ease;');
      }

    });
  });

  // observator config
  let config = { attributes: true };

  // trigger
  observer.observe(target, config);

  // create transparency div
  const divLayer = document.createElement('div');
  divLayer.setAttribute('id', 'divLayer');
  divLayer.setAttribute('style', 'position: absolute; top: 0; left: -100vw; width:100vw; height:100vh; transition: all 0.5s 0s ease;');
  document.body.append(divLayer);
}

/*
 *
 * 13. Fix search mobile
 * 
 */

function fixMobileSearch() {
  // select target
  let target = document.querySelector('.form-search');
  let classes;

  // create new observator instance
  let observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      classes = mutation.target.classList.value

      if (classes.includes('active')) {
        console.log('oie')
        divLayerSearch.setAttribute('style', 'position: absolute;top: 0; left: 0; width:100vw; height:100vh; background: rgba(0,0,0,0.5); transition: all 0.5s 0s ease;');
        divLayerSearch.setAttribute('onClick', 'toggleSubMenuSearch()');
      } else {
        divLayerSearch.setAttribute('style', 'position: absolute; top: 0; left: -100vw; width:100vw; height:100vh; transition: all 0.5s 0s ease;');
      }

    });
  });

  // observator config
  let config = { attributes: true };

  // trigger
  observer.observe(target, config);

  // create transparency div
  const divLayerSearch = document.createElement('div');
  divLayerSearch.setAttribute('id', 'divLayerSearch');
  divLayerSearch.setAttribute('style', 'position: absolute;top: 0; left: -100vw; width:100vw; height:100vh; background: rgba(0,0,0,0.5); transition: all 0.5s 0s ease;');
  document.body.append(divLayerSearch);
}

/*
 *
 * 14 Fix filter in department page
 * 
 */
let coll = document.getElementsByClassName("sub-titulo");
let i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        let content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}