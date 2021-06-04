let baseURL = "http://numbersapi.com";
let favoriteNumber = 7;

// 1
$.getJSON(`${baseURL}/${favoriteNumber}?json`).then(data => {
  $('body').append(`<p>${data.text}</p>`);
})

// 2
let numbers = [1, 2, 3, 4];
$.getJSON(`${baseURL}/${numbers}?json`).then(data => {
  for (let value in data) {
    $('body').append(`<p>${data[value]}</p>`);
  }
})

// 3
let promises = [];
for (let i = 0; i < 4; i++) {
  promises.push(
    $.getJSON(`${baseURL}/${favoriteNumber}?json`)
  );
}
Promise.all(promises)
  .then(dataArr => {
    dataArr.forEach(data => $('body').append(`<p>${data.text}</p>`));
  })

/***********************
 * alternate?
*/

// 3 //why not this?
// for (let i = 0; i < 4; i++) {
//   $.getJSON(`${baseURL}/${favoriteNumber}?json`).then(data => {
//     $('body').append(`<p>${data.text}</p>`);
//   })
// }

// why not axios?
// axios
//   .get(`${baseURL}/${favoriteNumber}?json`)
//   .then(p => {
//     console.log(`${p.data.text}`);
//     return axios.get(`${baseURL}/1..4?json`);
//   })
//   .then(p1 => {
//     for (x in p1.data) {
//       console.log(`${p1.data[x]}`);
//     }
//     return axios.get(`${baseURL}/${favoriteNumber}?json`)
//   })
//   .then(p2 => {
//     console.log(`${p2.data.text}`);
//     return axios.get(`${baseURL}/${favoriteNumber}?json`)
//   })
//   .then(p3 => {
//     console.log(`${p3.data.text}`);
//     return axios.get(`${baseURL}/${favoriteNumber}?json`)
//   })
//   .then(p4 => {
//     console.log(`${p4.data.text}`);
//     return axios.get(`${baseURL}/${favoriteNumber}?json`)
//   })
//   .then(p5 => {
//     console.log(`${p5.data.text}`);
//   })