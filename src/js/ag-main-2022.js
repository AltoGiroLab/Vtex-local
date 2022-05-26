/*
 * 0. Check is mobile
 * 0.1 - Change imagens when mobile
 * 1. Topbar
 * 2. Main slider home
 * 3. Shelfs
 * 3.1 Remove discount div when discount does not exist
 * 4. Slider promos home
 * 5. Slider instafeed
 * 6. Search
 * 7. Cart
 * 7.1 - Open MiniCart Function
 * 7.2 - Close MiniCart Function
 * 7.3 - Check items quantity in the Cart
 * 7.4 - List products in the Cart
 * 7.5 - Decrement product quantity
 * 7.6 - Increment product quantity
 * 7.7 - Remove product in the cart
 * 7.8 - Reload cart
 * 7.9 - Format to Real
 * 8. Main menu mobile
 *
 */

// 0. Check is mobile
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? true : false;

// 0.1 Change images when mobile
if (isMobile) {
    setTimeout(() => {
        if ($('.box-banner img').length) {
            $('.box-banner img').each(function () {
                $(this).attr('src','/arquivos/' + $(this).attr('alt') + '-mobile.jpg');
            })
        }
    }, 500);
}

// 1. Topbar
$('.carousel-promo').slick({
    infinite: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 2000,
})

// 2. Main slider home
$('.banner-home').slick({
    infinite: true,
    arrows: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 2000,
    prevArrow: "<button type='button' class='slick-prev'><i class='fa-solid fa-chevron-left'></i></button>",
    nextArrow: "<button type='button' class='slick-next'><i class='fa-solid fa-chevron-right'></i></button>",
    customPaging : function(slider, i) {
        return "<button></button>";
    },
});

// 3. Shelfs
$('.n12colunas .helperComplement').remove();

$('.n12colunas ul').slick({
    infinite: true,
    mobileFirst: true,
    dots: true,
    customPaging : function(slider, i) {
        return "<button></button>";
    },
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                arrows: true,
                prevArrow: "<button type='button' class='slick-prev'><i class='fa-solid fa-chevron-left'></i></button>",
                nextArrow: "<button type='button' class='slick-next'><i class='fa-solid fa-chevron-right'></i></button>",
                slidesToShow: 4,
                slidesToScroll: 4
            }
        },
        {
            breakpoint: 300,
            settings: {
                arrows: false,
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
    ]
});

// 3.1 Remove discount div when discount does not exist
removeDiscountDiv()

function removeDiscountDiv() {
    const discountDivs = document.getElementsByClassName('discount')
    Array.from(discountDivs).map((item) => {
        item.innerText.length === 0 ? item.setAttribute('style','display: none;') : item.setAttribute('style','display: block;')
    })
}

// 4. Slider promos home
$('.promos-home .container').slick({
    infinite: true,
    arrows: false,
    mobileFirst: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: "unslick"
        },
        {
            breakpoint: 600,
            settings: {
                autoplay: true,
                autoplaySpeed: 4000,
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        },
    ]
});

// 5. Slider instafeed
// this slick have setTimeout because instafeed.js needs to check instagram api for get recent photos
setTimeout(() => {
    $('#instafeed').slick({
        infinite: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: 2,
        slidesToScroll: 2,
        mobileFirst: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: "unslick"
            },
            {
                breakpoint: 600,
                settings: {
                }
            },
        ]
    });
}, 2000);

// 6. Search
function openSearch() {
    const divSearch = document.getElementsByClassName('search')[0]
    divSearch.classList.add('active')
    
    const inputSearch = document.getElementsByClassName('fulltext-search-box')[0]
    inputSearch.setAttribute('placeholder','O que você está procurando?')
    inputSearch.value = ''

    const ulSuggest = document.getElementsByClassName('ui-autocomplete')[0]
    divSearch.append(ulSuggest)
}

function closeSearch() {
    const divSearch = document.getElementsByClassName('search')[0]
    divSearch.classList.remove('active')
}

// 7. Cart

// 7.1 - Open MiniCart Function
function openMinicart() {
    const miniCart = document.getElementsByClassName('mini-cart-2022-container')[0]
    miniCart.classList.add('active')
    
    const overlay = document.getElementsByClassName('overlay')[0]
    overlay.classList.add('active')
    overlay.setAttribute('onclick','closeMinicart()')

    const body = document.getElementsByTagName('body')[0]
    body.setAttribute('style','overflow: hidden;')
}

// 7.2 - Close MiniCart Function
function closeMinicart() {
    const miniCart = document.getElementsByClassName('mini-cart-2022-container')[0]
    miniCart.classList.remove('active')
    
    const overlay = document.getElementsByClassName('overlay')[0]
    overlay.classList.remove('active')
    overlay.removeAttribute('onclick')

    const body = document.getElementsByTagName('body')[0]
    body.removeAttribute('style')
}

// 7.3 - Check items quantity in the Cart
cartQuantity()

function cartQuantity() {
    const miniCartQuantity = document.getElementsByClassName('mini-cart-2022-quantity')[0]
    let cartQuantity = 0
    vtexjs.checkout.getOrderForm()
        .then(function (orderForm) {
            cartQuantity = orderForm.items.length
        })
        .done(function (orderForm) {
            miniCartQuantity.innerHTML = cartQuantity
        })
}

// 7.4 - List products in the Cart
setTimeout(() => {
    productsList()
}, 2000);

function productsList() {
    let productsList = []
    let productsListTotal =  []
    vtexjs.checkout.getOrderForm()
        .then(function (orderForm) {
            const retornoMap = orderForm.items.map((item) => {
                let productSize = item.name.split(" ");
                productSize = productSize[productSize.length - 1]

                let productPrice = item.sellingPrice
                productPrice = formatReal(productPrice)

                let productTotal = item.sellingPrice * item.quantity
                
                let productDetails = {
                    'productId': item.productId,
                    'productImage': item.imageUrl,
                    'productName': item.name,
                    productSize,
                    'productQuantity': item.quantity,
                    productPrice,
                    productTotal

                }
                productsList.push(productDetails)
                productsListTotal.push(productDetails.productTotal)
                return
            })

            retornoMap
        })
        .done(function (orderForm) {
            productsList.map((item, index) => {
                const cartItems = document.getElementsByClassName('mini-cart-items')[0]
                const cartItem = document.createElement('div')
                cartItem.setAttribute('class', 'mini-cart-item')
                cartItem.setAttribute('id',item.productId)
                cartItem.innerHTML = `
                    <aside class="photo">
                        <img src="${item.productImage}" width="130" height="160" />
                    </aside>
                    <main class="data">
                        <h3 class="name">${item.productName}</h3>
                        <p class="size"><strong>Tamanho:</strong> ${item.productSize}</p>
                        <div class="quantity">
                            <button onclick="decrementQuantity(${item.productId},${index})">
                                <i class="fa-solid fa-minus fa-lg"></i>
                            </button>
                            <span>${item.productQuantity}</span>
                            <button onclick="incrementQuantity(${item.productId},${index})">
                                <i class="fa-solid fa-plus fa-lg"></i>
                            </button>
                        </div>
                        <p class="price">R$ ${item.productPrice}</p>
                    </main>
                    <aside class="action">
                        <button onclick="removeProduct(${index})">
                            <i class="fa-solid fa-trash fa-lg"></i>
                        </button>
                    </aside>
                `

                cartItems.append(cartItem)
            })

            if (productsListTotal.length > 0) {
                const reducer = (previousValue, currentValue) => previousValue + currentValue
                let totalValue = productsListTotal.reduce(reducer)
                const divTotalValue = document.getElementsByClassName('value')[0]
                divTotalValue.innerHTML = `R$ ${formatReal(totalValue)}`
            }
        })
}

// 7.5 - Decrement product quantity
function decrementQuantity(id, index) {
    vtexjs.checkout.getOrderForm()
    .then(function (orderForm) {
        let itemIndex = index
        let item = orderForm.items[itemIndex]
        let new_qtd = item.quantity - 1

        if (item.quantity == 1) {
			return vtexjs.checkout.removeItems([item]);
        } else {
            let updateItem = {
                index: itemIndex,
                quantity: new_qtd
            }
            return vtexjs.checkout.updateItems([updateItem], null, false);
        }
    })
    .done(function (orderForm) {
        reloadCart()
    })
}

// 7.6 - Increment product quantity
function incrementQuantity(id, index) {
    vtexjs.checkout.getOrderForm()
    .then(function (orderForm) {
        let itemIndex = index
        let item = orderForm.items[itemIndex]
        let new_qtd = item.quantity + 1
        let updateItem = {
            index: itemIndex,
            quantity: new_qtd
        }
        return vtexjs.checkout.updateItems([updateItem], null, false);
    })
    .done(function (orderForm) {
        reloadCart()
    })
}

// 7.7 - Remove product in the cart
function removeProduct(index) {
    vtexjs.checkout.getOrderForm()
        .then(function (orderForm) {
            let item = orderForm.items[index];
            item.index = index;
            return vtexjs.checkout.removeItems([item]);
        })
        .done(function (orderForm) {
            reloadCart()
        })
}

// 7.8 - Reload cart
function reloadCart() {
    const cartItems = document.getElementsByClassName('mini-cart-items')[0]
    cartItems.innerHTML = ''
    productsList()
}

// 7.9 - Format to Real
function formatReal(value) {
    var tmp = value+'';
    tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
    if( tmp.length > 6 )
        tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    return tmp;
}

// 8. Main menu mobile
function openMenuMobile() {
    const mainMenu = document.getElementsByClassName('main-menu')[0]
    mainMenu.classList.add('active')

    let closeMenu = document.createElement('div')
    closeMenu.setAttribute('style', 'position: absolute; top: 2rem; right: 2rem; z-index: 90;')
    closeMenu.setAttribute('onclick','closeMenuMobile()')
    closeMenu.innerHTML = `<i class="fa-solid fa-xmark fa-xl"></i>`
    mainMenu.append(closeMenu)
}

function closeMenuMobile() {
    const mainMenu = document.getElementsByClassName('main-menu')[0]
    mainMenu.classList.remove('active')
}

// 8.1 Submenu
$('.hasSubmenu').on("click", function () {
    $(this).parent().find('.submenu').toggleClass('active')
});

// dev only



// dev only