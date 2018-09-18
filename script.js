$(document).ready(() => {  
  const btnBusca = document.getElementById('btn-busca');
  btnBusca.addEventListener('click', trazBusca);
}); 

const myKey = data['myAPIkey'];
let docs = [];

function buscaPalavra() {
  return document.getElementById('campo-busca').value;
}

function erro() {
  console.log('erro');
}

function trazBusca(event) {
  event.preventDefault();
  const url =
  `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${buscaPalavra()}&api-key=${myKey}`;
  
  $.ajax({
    type: 'GET',
    url,
    success: carregarPosts,
    error: erro
  })
}

function carregarPosts(data) {
  docs = data.response.docs;
  exibePosts();
}

function exibePosts() {
  let exibeBusca = document.getElementById('exibe-busca');
  exibeBusca.innerHTML = `
  <div class='area-noticia'>
    ${docs.map(doc => `
      <div class='noticia'>
        <h3>${doc.headline.main}</h3>
        <p>${doc.snippet}</p>
        <a href='${doc.web_url}'>Link para original</a>
      <div>
    `).join('')}
  </div>
  `;
}