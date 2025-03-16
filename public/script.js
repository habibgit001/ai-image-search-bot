let currentPage = 1;
let lastQuery = "";

async function sendMessage() {
    const message = document.getElementById('message').value;
    if (!message.trim()) return alert("Please enter a message.");

    const responseBox = document.getElementById('response');
    responseBox.innerText = "Thinking...";
    responseBox.style.opacity = "0.6";

    const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
    });

    const data = await response.json();
    responseBox.innerText = `🤖 AI: ${data.message}`;
    responseBox.style.opacity = "1";
}

function newChat() {
    document.getElementById('message').value = "";
    document.getElementById('response').innerText = "";
}

async function searchImages() {
    const query = document.getElementById('imageQuery').value;
    if (!query.trim()) return alert("Enter an image query!");

    lastQuery = query;
    currentPage = 1;
    fetchImages(query, currentPage, true);
}

async function fetchImages(query, page, reset = false) {
    document.getElementById('loading').classList.remove('hidden');

    const response = await fetch(`http://localhost:5000/images/search?query=${query}&page=${page}&random=${Math.random()}`);
    const data = await response.json();

    document.getElementById('loading').classList.add('hidden');

    if (reset) {
        document.getElementById('imageResults').innerHTML = "";
    }

    data.images.forEach(img => {
        const imgElement = document.createElement('img');
        imgElement.src = img.url;
        imgElement.alt = img.description;
        imgElement.onclick = () => openImage(img.url);
        document.getElementById('imageResults').appendChild(imgElement);
    });

    document.getElementById('loadMore').classList.remove('hidden');
}

async function loadMoreImages() {
    currentPage++;
    fetchImages(lastQuery, currentPage);
}

function newImages() {
    document.getElementById('imageQuery').value = "";
    document.getElementById('imageResults').innerHTML = "";
    document.getElementById('loadMore').classList.add('hidden');
}

function openImage(url) {
    window.open(url, '_blank');
}
