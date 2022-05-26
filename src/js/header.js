function openSubmenu(menuItem) {
    menuItem.classList.add("active");
    document.querySelector('.submenu-list').classList.add("active");
}
function toggleSubmenu(menuItem) {
    menuItem.classList.add("active");
    document.querySelector('.submenu-list').classList.toggle("active");
}
function closeSubmenu(menuItem) {
    document.querySelector('.submenu-list').classList.remove("active");
    document.querySelector('.header-menu .menu-list .menu-item.active').classList.remove("active");
}

function toggleMenuMobile() {
    document.querySelector('.menu-mobile').classList.toggle('active');
}

function toggleOpenMenuMobile() {
	if (document.querySelector(".nav-menu")){
		document.querySelector(".nav-menu").classList.toggle("nav-menu--active");
   }
}

function openSubMenuMobile(e) {
	$(e)[0].classList.toggle("submenu-list--active");
}

function hideMenuMobile() {
    document.querySelector('.menu-mobile').classList.remove('active');
}

function toggleSubMenuSearch() {
	var formSearch = document.querySelector('.form-search');
	var headerMenu = document.querySelector('.header-menu-user .menu-list');

	if (!formSearch.classList.contains('active')) {
		formSearch.classList.add('active');
		headerMenu.style.display = 'none';
	}else {
		formSearch.classList.remove('active');
		headerMenu.style.display = 'none';
	}
}

function openSubmenuSearch() {
	//const submenuSearch = document.querySelector('.submenu-search');
	var formSearch = document.querySelector('.form-search');
	var headerMenu = document.querySelector('.header-menu-user .menu-list');

	//submenuSearch.classList.add('active');
	formSearch.classList.add('active');
	headerMenu.style.display = 'none';
}

function closeSubmenuSearch() {
	//const submenuActive = document.querySelector('.submenu-search');
	var formSearchActive = document.querySelector('.form-search');
	var headerActive = document.querySelector('.header-menu-user .menu-list');

	//submenuActive.classList.remove("active");
	formSearchActive.classList.remove('active');
	headerActive.style.display = 'flex';
}

$(document).ready(function() {
	$('#mini-cart-admake .mini-cart-header').before('<div id="lf-cart__darken" class="lf-cart__darken"></div>');
	$('.mini-cart-header').append('<a id="close-mini-cart-button"><img src="/arquivos/close-cart.svg" alt="Fechar Carrinho"></a> <div><h2>Minha Sacola</h2></div>');
	$('li.mini-cart a.btn-mini-cart').on('click', function (event) {
		event.preventDefault();
		$('#mini-cart-admake').css('display', 'block');
		$('#overlay-minicart-admake').css('display', 'block');
	})

	$('#close-mini-cart-button').on('click', function (event) {
		event.preventDefault();
		$('#mini-cart-admake').css('display', 'none');
		$('#overlay-minicart-admake').css('display', 'none');
	})

	$('#overlay-minicart-admake').on('click', function (event) {
		event.preventDefault();
		$('#mini-cart-admake').css('display', 'none');
		$('#overlay-minicart-admake').css('display', 'none');
	})

	
});