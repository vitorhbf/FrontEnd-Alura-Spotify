const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');
const offerListItem = document.getElementById('offer__list-item'); // Referência aos cards

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`;
    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result))
        .catch((error) => console.error('Erro ao buscar dados:', error));
}

function displayResults(result) {
    // Esconde os cards e o artista
    offerListItem.style.display = 'none';
    resultPlaylist.classList.add("hidden");

    // Limpa o conteúdo do artista
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');
    artistName.innerText = '';
    artistImage.src = '';

    // Verifica se há resultado
    if (result && result.length > 0) {
        // Exibe o primeiro resultado
        const firstResult = result[0];
        artistName.innerText = firstResult.name;
        artistImage.src = firstResult.urlImg;
        resultArtist.classList.remove('hidden');
    } else {
        // Se não houver resultado, exibe os cards
        resultArtist.classList.add('hidden');
        offerListItem.style.display = 'block';
    }
}

document.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm === '') {
        // Se a pesquisa estiver vazia, restaura os estilos dos cards e artistas
        resultPlaylist.classList.remove('hidden');
        resultArtist.classList.add('hidden');
        offerListItem.style.display = 'grid'; // Restaura a exibição dos cards para a configuração original
        return;
    }
    
    requestApi(searchTerm);
});

