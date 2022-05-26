$(document).ready( function(){
    precoTotal();
    removeEmptyIten();
    removeProd();
    $(".totalKit .finalizaKit").bind("click", comprar);
    function comprar() {
    var indexInList = 0,
        productActive = 0,
        productCheck = 0,
        objectKit = [];
    if ($.each($(".productIten"), function(index, value) {
            var urlTest = ["javascript", ":", "alert('Por favor, selecione o modelo desejado.');"].join(""),
            url = $(".productIten").eq(index).find(".buy-in-page-button").attr("href");
            
            if (!$(".productIten").eq(index).hasClass("inactive"))
                if (productActive++, 0 == $(".productIten").eq(index).find('input.item_unavaliable[checked="checked"]').length) {
                    $(".productIten").eq(index).find(".buy-in-page-button").parent().removeClass("unavailable");
                    $(".productIten").eq(index).find(".buy-in-page-button").each(function() {
                    if (url == urlTest) {
                    $(".productIten").eq(index).find(".buy-in-page-button").parent().addClass("required");
                    return !1
                    }
                    objectKit[indexInList] = new Object, objectKit[indexInList].url = url, $(".productIten").eq(index).find(".buy-in-page-button").parent().removeClass("unavailable"), $(".productIten").eq(index).find(".buy-in-page-button").parent().removeClass("required"), objectKit[indexInList].sku = url.split("sku=")[1].split("&")[0], objectKit[indexInList].skuUrl = "sku=" + objectKit[indexInList].sku + "&qty=1&seller=1&", indexInList++, productCheck++
                })
                } else $(".productIten").eq(index).find(".buy-in-page-button").parent().addClass("unavailable")
        }), console.log(productCheck + " / " + productActive), console.log(objectKit), productCheck == productActive) {
        for (var ajaxUrl = "/checkout/cart/add?", i = 0; i < objectKit.length; i++) { 
            ajaxUrl += objectKit[i].skuUrl;
        }
        /*
        console.log(ajaxUrl);
        $.ajax({
        url: ajaxUrl,
        type: "GET",
        crossDomain: !0,
        dataType: "html",
        complete: function() {
        }
        })
        */
        window.location.href = "https://www.altogiro.net" + ajaxUrl;
    } else alert("Por favor, selecione o modelo desejado dos produtos que desejar.")
    }

    function removeProd() {
        $(".productIten").each(function() {
            if ($(this).find(".unavailable-button").css('display') == 'block') {
                $(this).addClass("inactive");
            } else {
                $(this).find(".buy-in-page-button").length > 0 && $(this).find(".remove-product").show(), $(".remove-product input").on("change", function() {
                    if ($(this).is(":checked")) {
                        $(this).parents(".productIten").addClass("inactive")
                        $(this).prev().html('<i class="fa fa-plus"></i>');
                    } else {
                        $(this).parents(".productIten").removeClass("inactive")
                        $(this).prev().html('<i class="fa fa-minus"></i>');
                    }
                    precoTotal()
                })
            }
        })
    }

    function precoTotal() {
        var totalKit = 0;
        $(".productIten").each(function() {
            if (!$(this).hasClass("inactive")) {
                var bestPrice = $(this).find(".skuBestPrice");
                bestPrice.each(function() {
                    totalKit += parseFloat($(this).text().replace("R$ ", "").replace(",", "."))
                })
            }
        }), $(".totalKit .preco em").html("R$ " + totalKit.toFixed(2).replace(".", ","))
    }

    function unselectProd() {
        $(this).is(":checked") ? $(this).parents(".productIten").addClass("inactive") : $(this).parents(".productIten").removeClass("inactive"), precoTotal()
    }

    function removeEmptyIten() {
        $(".productIten").each(function() {
            "" === $(this).find("h4").html() ? ($(this).next(".sepSection").remove(), $(this).remove()) : $(this).show().css("display", "table")
        })
    }
});