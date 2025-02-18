




document.addEventListener("DOMContentLoaded", () => {
    const storiesContainer = document.querySelector(".stories");

    // 限時動態資料
    const storiesData = [
        { title: "東京 - 楓", folder: "影片/東京 - 楓", videos: ["1.MP4", "2.MOV", "3.MOV", "4.MP4", "5.MP4", "6.MOV", "7.MOV", "8.MOV", "11.MOV", "12.MOV", "14.MP4", "15.MOV", "16.MOV", "17.MP4", "18.MOV", "19.MOV", "20.MOV", "21.MP4", "22.MOV", "24.MP4", "25.MOV", "26.MOV", "27.MOV", "28.MP4", "29.MOV"], thumbnail: "5.MP4" },
        { title: "河口湖 - 楓", folder: "影片/河口湖 - 楓", videos: ["1.MP4", "2.MP4", "3.MOV", "4.MOV", "5.MP4", "6.MP4", "7.MP4", "8.MOV", "10.MP4", "11.MP4", "12.MOV"], thumbnail: "1.MP4" },
        { title: "箱根 - 楓", folder: "影片/箱根 - 楓", videos: ["1.MOV", "2.MP4", "3.MOV", "4.MP4", "5.MP4", "7.MP4", "8.MP4", "9.MP4"], thumbnail: "7.MP4" },
        { title: "京都 - 楓", folder: "影片/京都 - 楓", videos: ["1.MOV", "2.MP4", "3.MOV", "4.MOV", "5.MP4", "6.MOV", "7.MP4", "8.MP4", "9.MP4", "10.MP4", "11.MP4", "12.MOV", "13.MP4", "14.MP4"], thumbnail: "10.MP4" },
        { title: "香港 - 秋", folder: "影片/香港 - 秋", videos: ["1.MP4", "2.MOV", "3.MP4", "4.MOV", "5.MOV", "6.MP4", "7.MOV", "8.MOV"], thumbnail: "6.MP4" },
        { title: "宜蘭 - 夏", folder: "影片/宜蘭 - 夏", videos: ["1.MOV", "2.MOV", "3.MOV", "4.MOV", "5.MOV", "6.MOV"], thumbnail: "1.MOV" },
        { title: "台南 - 夏", folder: "影片/台南 - 夏", videos: ["1.MOV", "2.MOV", "3.MOV", "4.MOV", "5.MOV"], thumbnail: "1.MOV" },
        { title: "沖繩 - 春", folder: "影片/沖繩 - 春", videos: ["1.MP4", "2.MOV", "3.MOV", "4.MOV", "5.MOV", "6.MOV", "7.MOV", "8.MOV", "9.MOV", "10.MOV", "11.MOV", "12.MOV"], thumbnail: "4.MOV" },
        { title: "京都 - 秋", folder: "影片/京都 - 秋", videos: ["1.MP4", "2.MP4", "3.MP4", "4.MP4", "5.MP4", "6.MP4", "7.MP4"], thumbnail: "2.MP4" },
        { title: "大阪 - 秋", folder: "影片/大阪 - 秋", videos: ["1.MP4", "2.MP4", "3.MP4", "4.MP4", "5.MP4", "6.MP4", "7.MP4", "8.MP4", "9.MP4", "10.MP4", "11.MP4", "12.MP4", "13.MP4"], thumbnail: "1.MP4" },
    ];


    let showAllStories = false; // 用來追蹤是否顯示所有限時動態

function generateStories() {
    storiesContainer.innerHTML = ""; // 清空現有的限時動態

    // 根據螢幕寬度選擇顯示的限時動態數量
    const storiesToShow = showAllStories 
        ? storiesData 
        : window.innerWidth <= 1480 
            ? storiesData.slice(0, 6)  // 手機顯示 5 個
            : storiesData.slice(0, 8); // 桌面顯示 6 個

    // 生成限時動態
    storiesToShow.forEach((story, index) => {
        const storyElement = document.createElement("div");
        storyElement.classList.add("story");

        const img = document.createElement("img");
        const videoPath = `${story.folder}/${story.thumbnail}`;
        generateThumbnail(videoPath, img);

        const title = document.createElement("p");
        title.textContent = story.title;

        storyElement.appendChild(img);
        storyElement.appendChild(title);
        storyElement.addEventListener("click", () => openStory(index));

        storiesContainer.appendChild(storyElement);
    });



       // 新增展開/收起按鈕
const toggleButton = document.createElement("button");
toggleButton.textContent = showAllStories ? "⤴︎" : "⤵︎";

// 設定按鈕樣式
toggleButton.style.border = "none";  // 移除外框
toggleButton.style.background = "none";  // 移除底色
toggleButton.style.fontSize = "30px";  // 調整箭頭大小
toggleButton.style.cursor = "pointer";  // 顯示指標為手形
toggleButton.style.transition = "transform 0.3s ease";  // 加入動畫效果

// 按鈕點擊後的動作
toggleButton.addEventListener("click", () => {
    showAllStories = !showAllStories;
    generateStories();
});

        // 將按鈕放在 stories 區塊下方
        if (storiesContainer.querySelector("button") === null) {
            storiesContainer.appendChild(toggleButton);
        }
    }

    function generateThumbnail(videoPath, imgElement) {
        const video = document.createElement("video");
        video.src = videoPath;
        video.crossOrigin = "anonymous";
        video.muted = true;

        video.addEventListener("loadeddata", () => {
            video.currentTime = 0.1;
        });

        video.addEventListener("seeked", () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            // 設定縮圖解析度（這裡設為影片的 50% 解析度，或根據需要調整）
            const scale = 0.5; // 縮小的比例
            canvas.width = video.videoWidth * scale;
            canvas.height = video.videoHeight * scale;

            // 畫出影片的第一幀
        ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, canvas.width, canvas.height);

             // 將 canvas 畫出的圖像轉換成 base64 編碼的圖片 URL
            const thumbnailUrl = canvas.toDataURL("image/jpeg", 0.5); // 設定 70% 的品質
            imgElement.src = canvas.toDataURL("image/png");
            imgElement.src = thumbnailUrl; // 設定為縮圖的來源
        });

        video.load();
    }

    function openStory(index) {
        const story = storiesData[index];
        // 在這裡打開浮動視窗的程式碼...
    }

    // 初始化生成限時動態
    generateStories();


    function openStory(index) {
        const story = storiesData[index];
        let currentVideoIndex = 0;

        // 建立浮動視窗
        const storyModal = document.createElement("div");
        storyModal.classList.add("story-modal");

        // 建立標題區塊
        const storyHeader = document.createElement("div");
        storyHeader.classList.add("story-header");

        // 左側區塊 (縮圖 + 標題)
        const storyInfo = document.createElement("div");
        storyInfo.classList.add("story-info");

        const storyThumbnail = document.createElement("img");
        storyThumbnail.src = document.querySelectorAll(".story img")[index].src;
        storyThumbnail.classList.add("story-thumbnail");

        const storyTitle = document.createElement("p");
        storyTitle.textContent = story.title;
        storyTitle.classList.add("story-title");

        storyInfo.appendChild(storyThumbnail);
        storyInfo.appendChild(storyTitle);

        const closeButton = document.createElement("button");
        closeButton.classList.add("close-button");
        closeButton.textContent = "✖";
        closeButton.addEventListener("click", () => {
            document.body.removeChild(storyModal);
        });

        storyHeader.appendChild(storyInfo);
        storyHeader.appendChild(closeButton);

        // 影片播放器
        const videoElement = document.createElement("video");
        videoElement.src = `${story.folder}/${story.videos[currentVideoIndex]}`;
        videoElement.controls = false;
        videoElement.autoplay = true;
        videoElement.muted = false;
        videoElement.classList.add("story-video");

        // **影片播放結束時，自動播放下一個**
        videoElement.addEventListener("ended", () => {
            playNextVideo();
        });

        function playNextVideo() {
            if (currentVideoIndex < story.videos.length - 1) {
                currentVideoIndex++;
                videoElement.src = `${story.folder}/${story.videos[currentVideoIndex]}`;
                videoElement.play();
            } else {
                document.body.removeChild(storyModal);
            }
        }

        // 點擊影片左右切換
        videoElement.addEventListener("click", (event) => {
            const clickX = event.clientX - videoElement.getBoundingClientRect().left;
            if (clickX < videoElement.clientWidth / 2) {
                if (currentVideoIndex > 0) {
                    currentVideoIndex--;
                    videoElement.src = `${story.folder}/${story.videos[currentVideoIndex]}`;
                    videoElement.play();
                }
            } else {
                playNextVideo();
            }
        });

        // 影片自適應螢幕大小
        videoElement.addEventListener("loadedmetadata", () => {
            videoElement.style.width = "80vw";
            videoElement.style.height = "auto";
        });

        // 組合元素
        storyModal.appendChild(storyHeader);
        storyModal.appendChild(videoElement);
        document.body.appendChild(storyModal);
    }
});






// 貼文統計區塊 
document.addEventListener("DOMContentLoaded", function () {
    // 選取所有圖片和影片
    let postItems = document.querySelectorAll(".post-grid .post-item");
    
    // 統計數量
    let postCount = postItems.length;
    
    // 更新 "貼文 80" 數字
    document.getElementById("post-count").textContent = postCount;
});





document.addEventListener("DOMContentLoaded", function () {
    const postItems = document.querySelectorAll(".post-item");
    const modal = document.getElementById("post-modal");
    const modalImage = document.getElementById("modal-image");
    const modalVideo = document.getElementById("modal-video");
    const modalText = document.getElementById("modal-text");
    const modalLocation = document.querySelector(".post-location"); // 取得地點元素

    postItems.forEach(item => {
        item.addEventListener("click", function () {
            const img = item.querySelector("img");
            const video = item.querySelector("video");
            const description = item.getAttribute("data-description") || "";
            const location = item.getAttribute("data-location") || "未知地點"; // 讀取 data-location

            // 設定圖片或影片
            if (img) {
                modalImage.src = img.src;
                modalImage.style.display = "block";
                modalVideo.style.display = "none";
            } else if (video) {
                modalVideo.src = video.src;
                modalVideo.style.display = "block";
                modalImage.style.display = "none";

                // 移除進度條並自動播放影片
                //modalVideo.removeAttribute("controls");  // 移除進度條
                modalVideo.play();  // 自動播放影片

                // 監聽影片播放結束事件，並重新播放
                modalVideo.addEventListener("ended", function() {
                    modalVideo.play(); // 播放完畢後重新播放
                });
            }

            // 設定描述與地點
            modalText.innerHTML = description;
            modalLocation.textContent = location; // 更新地點資訊

            // 顯示模態框
            modal.style.display = "flex";
        });
    });

    // 點擊灰色區域關閉模態框
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
            modalImage.src = "";
            modalVideo.src = "";
            modalVideo.removeAttribute("controls"); // 確保關閉時去除進度條
            modalVideo.removeEventListener("ended", function() {}); // 移除事件監聽器
        }
    });
});








