/**
 * 0. Check is mobile
 * 0.1 Change images when mobile
 * 1. Main slider
 * 1.1 Remove discount div when discount does not exist
 * 2. Shelfs
 * 3. Slider promos
 * 4. Slider instafeed
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

// 1. Main slider
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

// 1.1 Remove discount div when discount does not exist
removeDiscountDiv()

function removeDiscountDiv() {
    const discountDivs = document.getElementsByClassName('discount')
    Array.from(discountDivs).map((item) => {
        item.innerText.length === 0 ? item.classList.remove('have') : item.classList.add('have')
    })
}

// 2. Shelfs
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

// 3. Slider promos
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

// 4. Slider instafeed
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