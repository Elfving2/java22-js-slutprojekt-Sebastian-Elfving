//DOM Elements
const userInput = document.getElementById("userSearch");
const btn = document.getElementById("btn");
const imgContainer = document.getElementById("imgContainer");
const numberInput = document.getElementById("number");
const selectSize = document.getElementById("size");
const selectSort = document.getElementById("sort");
const h1ErrorMessage = document.getElementById("errorMessage");


btn.addEventListener("click", getUrl);

/* FUNCTIONS */

//Get data from api
function getUrl(event) {
    event.preventDefault();
    if(userInput.value.length === 0 || numberInput.value.length === 0  ) {
        imgContainer.innerHTML = "";
        h1ErrorMessage.innerText = "Both fields have to be filled out";
    }else {
        const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&
        api_key=884bbb4d6caeba4db5fb638df191be3c&text=${userInput.value}
        &per_page=${numberInput.value}&sort=${selectSort.value}&format=json&nojsoncallback=1`;
    
        fetch(url)
            .then(response => {
                if(response.status >= 200 && response.status < 300) {
                    return response.json();  
                }else {
                    throw "SERVER ERROR";
                }
            })
            .then(data => {
                displayImage(data.photos.photo);
        })
        .catch(error=> {
            console.error(error);
            h1ErrorMessage.innerText = "There where an internet problem";
            imgContainer.innerHTML = "";
        })      
    }
}

// displaying images in DOM
function displayImage(data) {
    imgContainer.innerHTML = "";
    if(data.length === 0) {
        h1ErrorMessage.innerText = "there where no img of " + userInput.value;
    } else {
        h1ErrorMessage.innerText = "";
        data.forEach(({server, id, secret})  => {
            const a = document.createElement("a");
            const img = document.createElement("img");
                
            img.src = `https://live.staticflickr.com/${server}/${id}_${secret}_${selectSize.value}.jpg`;
            a.href = img.src;
            a.target = "_blank";
    
            imgContainer.append(a);
            a.append(img);
    
            // Change style depending on what size user chooses.   
            if(selectSize.value == "q") {
                imgContainer.style.gridTemplateColumns = "repeat(5, 1fr)";
                imgContainer.style.gridAutoRows = "11em";
            }else if(selectSize.value == "c") {
                img.classList.add("mediumSizePicture");
                imgContainer.style.gridTemplateColumns = "repeat(4, 1fr)";
                imgContainer.style.gridAutoRows = "17em";
            } else {
                img.classList.add("largeSizePicture");
                imgContainer.style.gridTemplateColumns = "repeat(3, 1fr)";
                imgContainer.style.gridAutoRows = "25em";
            }
        });
    }
}   