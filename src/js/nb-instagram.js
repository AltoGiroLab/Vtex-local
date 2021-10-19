$(document).ready(function() {
  var instantTokenApiUrl = 'https://ig.instant-tokens.com/users/1ddb52a3-909e-4e94-971f-9993cb1eaa50/instagram/17841400180277640/token?userSecret=py3vc3bksyc82w01cs1rof'
  
  $.ajax({
    url: instantTokenApiUrl,
    dataType: 'json'
  })
  .done(function (response) {
    if (!response.Token) {
      console.log('Error :: ', response);
    } else {
      var feed = new Instafeed({
        accessToken: response.Token,
        limit: 4,
        template: '<a href="{{link}}" target="_blank" rel="noreferrer noopener"><img title="{{caption}}" src="{{image}}" /><div class="caption">{{caption}}</div></a>'
      });
    feed.run();
    }
  });
});

// Only for dev
// const instafeedDiv = document.getElementById('instafeed');

// instafeedDiv.parentNode.removeAttribute('style');

// const instafeedContent = `<a href="https://www.instagram.com/p/CTQWsxnL8i8/">
// <img title="Minimalismo sofisticado! ✨ Com estampa exclusiva, nosso Maiô Microfibra Meia Taça é a prova perfeita de que o clássico P&amp;B também tem lugar garantido no beachwear. 

// #newbeach #modapraia #beachwear" src="https://scontent.cdninstagram.com/v/t51.29350-15/240951130_101373422261055_94704733487387763_n.jpg?_nc_cat=104&amp;ccb=1-5&amp;_nc_sid=8ae9d6&amp;_nc_ohc=2AEU0TXaaoAAX9mIh02&amp;_nc_ht=scontent.cdninstagram.com&amp;edm=ANo9K5cEAAAA&amp;oh=6844de15efa42295940fe917ad15be1b&amp;oe=613431D3" />
// <div class="caption">Minimalismo sofisticado! ✨ Com estampa exclusiva, nosso Maiô Microfibra Meia Taça é a prova perfeita de que o clássico P&amp;B também tem lugar garantido no beachwear. 

// #newbeach #modapraia #beachwear</div>
// </a>

// <a href="https://www.instagram.com/p/CTF8RzkLTuZ/">
// <img title="Ícone de versatilidade, nosso biquíni Zig Triangle une a atemporalidade de uma modelagem básica às diversas possibilidades de amarrações. Suas alças longas e finas permitem as opções de amarrações no pescoço ou nas costas, como é o caso do styling escolhido pela musa @celinalocks. ✨" src="https://scontent.cdninstagram.com/v/t51.29350-15/240652293_193671366031322_2366315870066294551_n.jpg?_nc_cat=108&amp;ccb=1-5&amp;_nc_sid=8ae9d6&amp;_nc_ohc=Bqe8XhdXnZgAX-BzwFL&amp;_nc_ht=scontent.cdninstagram.com&amp;edm=ANo9K5cEAAAA&amp;oh=1e9263fd00ba0e90a8e747752ac1355e&amp;oe=613480BC" />
// <div class="caption">Ícone de versatilidade, nosso biquíni Zig Triangle une a atemporalidade de uma modelagem básica às diversas possibilidades de amarrações. Suas alças longas e finas permitem as opções de amarrações no pescoço ou nas costas, como é o caso do styling escolhido pela musa @celinalocks. ✨</div>
// </a>

// <a href="https://www.instagram.com/p/CTDSaGILTpV/">
// <img title="Luz e sombra formam a atmosfera do verão. É tempo de desacelerar e deixar o sol e a brisa serem guias. Visite o nosso e-shop e vista-se para o sol. 🍃

// #newbeach #modapraia #beachwear" src="https://scontent.cdninstagram.com/v/t51.29350-15/240508872_1037839676958807_5318807730107637582_n.jpg?_nc_cat=107&amp;ccb=1-5&amp;_nc_sid=8ae9d6&amp;_nc_ohc=-qv9PgOEbikAX9NwN9K&amp;_nc_ht=scontent.cdninstagram.com&amp;edm=ANo9K5cEAAAA&amp;oh=4bbdfea6192d161cc149b3505bfac712&amp;oe=6134C48A" />
// <div class="caption">Luz e sombra formam a atmosfera do verão. É tempo de desacelerar e deixar o sol e a brisa serem guias. Visite o nosso e-shop e vista-se para o sol. 🍃

// #newbeach #modapraia #beachwear</div>
// </a>

// <a href="https://www.instagram.com/p/CTA01ipr-O5/">
// <img title="O fim de tarde dos sonhos: banhadas pelo brilho do sol com direito a biquíni e saída de praia @newbeach_oficial ✨

// #camilacoelho #beachwear #modapraia" src="https://scontent.cdninstagram.com/v/t51.29350-15/240496850_910999186161226_2884912063875244136_n.jpg?_nc_cat=110&amp;ccb=1-5&amp;_nc_sid=8ae9d6&amp;_nc_ohc=ur8UEBqsI94AX_oaM9-&amp;_nc_ht=scontent.cdninstagram.com&amp;edm=ANo9K5cEAAAA&amp;oh=ca262944d5af116b8c2d0bbb4873fca1&amp;oe=6134CEBA" />
// <div class="caption">O fim de tarde dos sonhos: banhadas pelo brilho do sol com direito a biquíni e saída de praia @newbeach_oficial ✨

// #camilacoelho #beachwear #modapraia</div>
// </a>`;

// instafeedDiv.innerHTML = instafeedContent;

// // console.log('instafeedDiv', instafeedDiv);