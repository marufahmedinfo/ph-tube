console.log('videp .js add pyo')
// timeString set
function getTimeString(time){
    const hour = parseInt(time / 3600);
    let reminderSecond = hour % 3600;
    const minute = parseInt(time / 60);
    reminderSecond = reminderSecond % 60;
    return `${hour} hour ${minute} minute ${reminderSecond} Second`;
};

//creat loade catagoris 
const loadCatagoris = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCatagoris(data.categories))
        .catch(error => console.log(error));
};

// creat loade videos 
const loadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
        .catch(error => console.log(error));

};

const loadCatagorisVideo = (id) => {
    // alert(id)
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data => {
        removeActiveClass();

        const activeBtn = document.getElementById(`btn-${id}`);
        activeBtn.classList.add("active")
        displayVideos(data.category);
    })
    .catch(error => console.log(error))
};

const removeActiveClass = () => {
    const removeClass = document.getElementsByClassName('catagori-btn');
    console.log(removeClass)
    for(let btn of removeClass){
        btn.classList.remove('active');
    };
};

const loadDetails = async(videoId) => {
    // console.log(videoId)
    const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(uri);
    const data = await  res.json()
    displayDetails(data.video)
};
const displayDetails = (video) => {
    console.log(video)
    const ditailContainer = document.getElementById('modal-content');
    ditailContainer.innerHTML = `
    <img src=${video.thumbnail}/>
    <p>${video.description}</p>
    `;
    // document.getElementById('showModalData').click();
    document.getElementById('customModal').showModal();
}
// const cardDemo = {
//         "category_id": "1001",
//         "video_id": "aaaa",
//         "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//         "title": "Shape of You",
//         "authors": [
//           {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//           }
//         ],
//         "others": {
//           "views": "100K",
//           "posted_date": "16278"
//         },
//         "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }
const displayVideos = (videos) => {
    const videoContainer = document.getElementById('video');
    videoContainer.innerHTML = "";
    if(videos.length === 0){
        videoContainer.classList.remove('grid');
        videoContainer.innerHTML = `
        <div class="min-h-[500px] flex flex-col gap-5 justify-center items-center">
        <img src="assets/Icon.png" alt="loading....."/>
        <h2 class="font-black text-3xl">Oops!!Sorry. There is no content here</h2>
        </div>
        `;
    }else{
        videoContainer.classList.add('grid');
    }
    videos.forEach((video) => {
        console.log(video)
        const card = document.createElement("div");
        card.classList = "card card-compact";
        card.innerHTML = `
  <figure class="h-[200px] relative">
    <img
    class="h-full w-full object-cover"
      src=${video.thumbnail}
      alt="Shoes" />
        ${video.others.posted_date?.length === 0? "": `<span class="absolute bg-black text-gray-300 right-4 bottom-2 p-1 rounded text-xs">${getTimeString(video.others.posted_date)}</span>`}
  </figure>
  <div class="px-0 py-3 flex gap-6">
    <div class="">
        <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture}  alt="Shoes"/>
    </div>
     <div>
        <h2 class="font-bold">${video.title}</h2>
        <div class="flex items-center gap-3">
        <p class="text-gray-500">${video.authors[0].profile_name}</p>
        ${video.authors[0].verified === true ? '<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"  alt="Shoes"/>': ""}
        </div>
        <p class="text-gray-400">${video.others.views}</p>
        <button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error text-white">Details</button>
        </div>
  </div>
        `;
        videoContainer.append(card)
    });
};

const displayCatagoris = (catagores) => {
    const catagoriContainer = document.getElementById('catagoriys');
    catagores.forEach((item) => {
        console.log(item)
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
        <button id="btn-${item.category_id}" class="btn catagori-btn" onclick="loadCatagorisVideo(${item.category_id})">${item.category}</button>
        `;

        catagoriContainer.append(buttonContainer);
    });
}


loadCatagoris();
loadVideos();