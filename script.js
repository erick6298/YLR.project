const videosContainer = document.getElementById('videosContainer');
const popup = document.getElementById('popup');
const videoEl = document.querySelector('#popup > iframe');
const videoIdInput = document.getElementById('videoId');
const IDS_Key = "youTubeVideoIds"
let youTubeVideoIds = [];

const loadVideos = () => {
    youTubeVideoIds = JSON.parse(localStorage.getItem(IDS_Key)) || []
};

const displayVideos = () => {
    const videosHTMLString = youTubeVideoIds.map(
        (id) => `
      <li onclick="clickVideo(event, '${id}')">
        <img class="thumbnail" src="https://i3.ytimg.com/vi/${id}/sddefault.jpg" alt="Cover image for YouTube vide with id ${id}">
        <button class="delete-btn" >&times;</button>
      </li>
    `
    )
    .join('');
    videosContainer.innerHTML = videosHTMLString;
};

const clickVideo = (event, id) => {
    if (event.target.classList.contains('delete-btn')) {
        youTubeVideoIds = youTubeVideoIds.filter((i) => i !== id)
        localStorage.setItem(IDS_Key, JSON.stringify(youTubeVideoIds));
        displayVideos();
    } else {
        videoEl.src = `https://www.youtube.com/embed/${id}`;
        popup.classList.add('open');
        popup.classList.remove('closed');
    }

};

const saveVideo = (e) => {
    e.preventDefault();
    const videoId = videoIdInput.value.trim(); // Trim to remove leading/trailing whitespace
    if (videoId) {
        youTubeVideoIds.unshift(videoId);
        videoIdInput.value = "";
        localStorage.setItem(IDS_Key, JSON.stringify(youTubeVideoIds));
        displayVideos();
    } else {
        // Handle the case where the input is empty or only contains whitespace
        alert("Please enter a valid YouTube video ID.");
    }
};

const handlePopupClick = () => {
    if (popup.classList.contains('open')) {
        popup.classList.add('closed');
        popup.classList.remove('open');
        
        // Stop the video by setting the iframe source to an empty string
        videoEl.src = '';
    }
};

loadVideos();
displayVideos();
