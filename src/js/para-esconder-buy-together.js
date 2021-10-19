
if (document.getElementsByClassName('group_1').length === 2) {
  document.querySelector('.group_1').addEventListener('change', () => {
    setTimeout(function () {
      // Para esconder
      const BTTotal = document.getElementsByClassName('BTTotal');
      BTTotal[0].setAttribute('style', 'display:none;');

      const BTTotalText = document.getElementsByClassName('BTTotalText');
      BTTotalText[0].setAttribute('style', 'display:none;');

      const newPlus = document.getElementsByClassName('newPlus');
      newPlus[0].setAttribute('style', 'display:none;');

      const newBuy = document.getElementsByClassName('newBuy');
      newBuy[0].setAttribute('style', 'justify-content: center;');

      newBuy[0].children[2].style.width = '200px';
    }, 1750);
  });
}
