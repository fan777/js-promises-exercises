$(document).ready(() => {
  let baseURL = 'https://deckofcardsapi.com/api/deck';

  // 1
  $.getJSON(`${baseURL}/new/draw`)
    .then(data => {
      let { suit, value } = data.cards[0];
      console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    })

  // 2
  let cards = [];
  $.getJSON(`${baseURL}/new/draw`)
    .then(data => {
      cards.push(data.cards[0]);
      let deck = data.deck_id;
      return $.getJSON(`${baseURL}/${deck}/draw`);
    })
    .then(data => {
      cards.push(data.cards[0]);
      cards.forEach(card => {
        console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`)
      })
    })

  //3
  let deck = null;
  let $btn = $('button');
  let $pile = $('#pile')
  $.getJSON(`${baseURL}/new/shuffle/?deck_count=1`)
    .then(data => {
      deck = data.deck_id;
    })
  $btn.on('click', function () {
    $.getJSON(`${baseURL}/${deck}/draw`).then(data => {
      let degree = Math.floor(Math.random() * (50)) * (Math.round(Math.random()) * 2 - 1);
      $pile.append(`<img src="${data.cards[0].image}" style="transform: rotate(${degree}deg);"></img>`);
      $('#counter').text(`Cards left: ${data.remaining}`)
      if (data.remaining == 0)
        $btn.remove();
    });
  });
});
