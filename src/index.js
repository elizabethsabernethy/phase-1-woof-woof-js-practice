document.addEventListener('DOMContentLoaded', ()=>{
getPups();
})

function getPups(){
    fetch('http://localhost:3000/pups')
    .then(response => response.json())
    .then(pups => addPupsToTheDOM(pups))
}

function addPupsToTheDOM(pups){
    const dogMenu = document.getElementById('dog-bar');
    const dogInfo = document.getElementById('dog-info');
    pups.forEach(pup => makingPupInfo(pup))
    
    function makingPupInfo(pup){
        const goodDogFilter = document.getElementById('good-dog-filter');

        const filterByName = document.createElement('span');
        filterByName.innerHTML = pup.name;
        dogMenu.appendChild(filterByName);

        const pupPic = document.createElement('img');
        pupPic.src = pup.image;

        const pupName = document.createElement('h2');
        pupName.innerHTML = pup.name;

        const goodOrBadButton = document.createElement('button');

        let isGoodDog = pup.isGoodDog;
            if(isGoodDog === true){
                goodOrBadButton.innerHTML = 'Good Dog!';
                }
                else if(isGoodDog === false){
                goodOrBadButton.innerHTML = 'Bad Dog!'
                }
        
        filterByName.addEventListener('click', ()=>{
            dogInfo.textContent='';
            dogInfo.appendChild(pupName);
            dogInfo.appendChild(pupPic);
            dogInfo.appendChild(goodOrBadButton);
        })

        goodOrBadButton.addEventListener('click', ()=>{
            if(pup.isGoodDog){
                goodOrBadButton.innerHTML = 'Bad Dog!'
                pup.isGoodDog = false;
            }
            else if(!pup.isGoodDog){
                goodOrBadButton.innerHTML = 'Good Dog!';
                pup.isGoodDog = true;
            }
            fetch(`http://localhost:3000/pups/${pup.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(pup)
            })
            .then(response => response.json())
        })
    }
}