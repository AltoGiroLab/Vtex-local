/*
 *
 * New Functions Index
 * 1. Call Functions
 * 2. Modifier Buy Together
 * 3. Mini Cart and WhatsApp Button modifier
 * 4. WhatsApp button position modifier
 * 5. Request product info via VTEX Search API and add video to page
 * 6. Add jquery tabs to Regulamentos page
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
}

// 3. Mini Cart and WhatsApp Button modifier
// 4. WhatsApp button position modifier
if (!isMobile) {
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
}

// 5. Request product info via VTEX Search API and add video to page
if (document.getElementById('product-page').length !== 0) {
  const allBotaoZoom = document.querySelectorAll('#botaoZoom');
  setTimeout(function () {
    allBotaoZoom[0].click();
  }, 50);
  setTimeout(function () {
    allBotaoZoom[1].click();
  }, 60);
  setTimeout(function () {
    allBotaoZoom[0].click();
  }, 70);
  setTimeout(function () {
    addVideosToProduct();
  }, 100);
}

// 6. Add jquery tabs to Regulamentos page
if (window.location.pathname === '/regulamentos') {
  regulamentoTabs();
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
  
  // Add divs to parent
  BTdivCompreJunto.append(BTLine1, BTLine2);
  BTLine1.append(BTdivItemA, BTdivPlus, BTdivItemB);
  BTdivBuy.append(BTTotal, BTTotalText);
  BTLine2.append(BTdivBuy);
  
  // Add divs to parent
  BTdivCompreJunto.append(BTLine1, BTLine2);
  BTLine1.append(BTdivItemA, BTdivPlus, BTdivItemB);
  BTdivBuy.append(BTTotal, BTTotalText);
  BTLine2.append(BTdivBuy);
  
  // Get old values from table
  const BTOldItemA = document.getElementsByClassName('itemA');
  const BTOldItemB = document.getElementsByClassName('itemB');
  const BTOldPlus = document.getElementsByClassName('plus');
  const BTOldBuy = document.getElementsByClassName('buy');

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
  
  // Pass old values for new divs
  BTdivItemA.insertAdjacentHTML('afterbegin', BTOldItemA[0].innerHTML);
  BTdivItemB.insertAdjacentHTML('afterbegin', BTOldItemB[0].innerHTML);
  BTdivPlus.insertAdjacentHTML('afterbegin', BTOldPlus[0].innerHTML);
  BTdivBuy.append(BTTotal, BTTotalText);
  BTdivBuy.insertAdjacentHTML('beforeend', BTdivBuyNewLink[0].innerHTML);

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
  const urlGet = `https://altogirorc.vtexcommercestable.com.br/api/catalog_system/pub/products/search${window.location.pathname}`

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
        getSkuReferenceValue = '1234'
      }
      const responseDataExactProduct = responseDataItems.find(element => element.itemId === getSkuReferenceValue);
      // Get videos from item found
      const responseDataExactProductVideos = responseDataExactProduct.Videos

      // Get thumbnails from product active
      const productImages = document.getElementById('newThumbsDiv');

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