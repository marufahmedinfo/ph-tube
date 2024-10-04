console.log('videp .js add pyo')


//creat loade cata goris 
const loadCatagoris = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displayCatagoris(data.categories))
    .catch(error => console.log(error));

};


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