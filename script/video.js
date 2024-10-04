console.log('videp .js add pyo')


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
    const videoContainer = document.getElementById('video')
    videos.forEach((video) => {
        console.log(video)
        const card = document.createElement("div");
        card.classList = "card card-compact";
        card.innerHTML = `
  <figure class="h-[200px]">
    <img
    class="h-full w-full object-cover"
      src=${video.thumbnail}
      alt="Shoes" />
  </figure>
  <div class="px-0 py-3 flex gap-6">
    <div class="">
        <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture}  alt="Shoes"/>
    </div>
     <div>
        <h2 class="font-bold">${video.title}</h2>
        <div class="flex items-center gap-3">
        <p class="text-gray-500">${video.authors[0].profile_name}</p>
        <img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"  alt="Shoes"/>
        </div>
        <p class="text-gray-400">${video.others.views}</p>
        </div>
  </div>
        `;
        videoContainer.append(card)
    });
}

const displayCatagoris = (catagores) => {
    const catagoriContainer = document.getElementById('catagoriys');
    catagores.forEach((item) => {
        console.log(item)
        const btton = document.createElement('button');
        btton.classList = "btn";
        btton.innerText = item.category;

        catagoriContainer.append(btton)
    });
}


loadCatagoris();
loadVideos();