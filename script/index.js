

const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all"
    )
    .then ((res) => res.json())
    .then ((json) =>displayLessons(json.data))
};


// voice pronunciation button active

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

// active remove
const removeActive =()=>{
    const lessonButtons = document.querySelectorAll(".lesson-btn");
    lessonButtons.forEach(btn=> btn.classList.remove("active"))
}

// level word load and showing - 2nd step
const loadLevelWord = (id) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then((res) => res.json())
    .then ((data) => {
        removeActive();
        const clickBtn =  document.getElementById(`lesson-btn-${id}`);

        clickBtn.classList.add("active");

        displayLevelWord(data.data)

    });
}

// modal
const loadWordDetail = async(id) =>{
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    const res= await fetch(url);
    const details = await res.json()
    displayWordDetails(details.data)
}

// manage spinner
const manageSpinner = (status) => {
    if(status===true){
        document.getElementById("spinner").classList.remove("hidden")
        document.getElementById("word-container").classList.add("hidden")
    } else {
        document.getElementById("word-container").classList.remove("hidden")
        document.getElementById("spinner").classList.add("hidden")
    }

}


// for get synonyms dynamically we call a function
const createElement = (arr) => {
    const htmlElements = arr.map((el) => `<span> ${el} </span>`)
    return htmlElements.join(" ");  
}

const displayWordDetails = (word)=>{
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
    <div class="">
            <h2 class="text-2xl font-bold">${word.word} ( <i class="fa-solid fa-microphone-lines"></i>  :${word.pronunciation})</h2>
        </div>
        <div class="">
            <h2 class="text-xl font-semibold">meaning</h2>
            <p class="font-bangla">${word.meaning}</p>
        </div>
        <div class="">
            <h2 class="text-xl font-semibold">example</h2>
            <p class="font-bangla">${word.sentence}</p>
        </div>
        <div class="">
            <h2 class="text-xl font-semibold">Synonym</h2>
            <div class="">
            ${createElement(word.synonyms)}
            </div>
        </div>
    
    `
    document.getElementById("word-modal").showModal()
}


// word show kora

const displayLevelWord = async(words) => {
    const wordContainer = document.getElementById ("word-container");
    wordContainer.innerHTML = "";

    if(words.length === 0){
        
        wordContainer.classList.remove('grid-cols-3', 'gap-7');
        wordContainer.classList.add('flex', 'flex-col', 'items-center', 'justify-center');

        const emptyBox= document.createElement("div");
        emptyBox.innerHTML = `
        <div 
            class="col-span-full text-center space-y-5 font-bangla"
        >
            <img class ="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="text-sm font-normal text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h1 class="text-4xl font-medium text-[#292524]">নেক্সট Lesson এ যান।</h1>
        </div>


        `;
        wordContainer.append(emptyBox)
        
    }

    words.forEach(word => {      
    const card = document.createElement("div");
    card.innerHTML = 
    `
        <div class="bg-white text-center rounded-xl shadow-md py-10 px-5 space-y-4">
            <h2 class="text-4xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="text-xl font-medium ">Meaning /Pronounciation</p>
            <h2 class="font-bangla text-3xl font-semibold  ">${word.meaning? word.meaning : "শব্দার্থ পাওয়া যায়নি"} / ${word.pronunciation? word.pronunciation: "সঠিক উচ্চারণ আইডেন্টিফাই করা যায় নই"}</h2>

            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF70]">
                    <i class="fa-solid fa-circle-info"></i>
                </button>
                <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF70]">
                    <i class="fa-solid fa-volume-high"></i>
                </button>
            </div>
        </div>
    `;

    wordContainer.append(card)
    });
    manageSpinner(false)
}

// lesson category showing 1st step
const displayLessons = (lessons) => {
    console.log(lessons)

    // 1.get the container & empty
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = "";

    // 2. get into every lessons
    for (let lesson of lessons){        
        console.log(lesson)
        
        // 3. create Element
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML =  `
        <button id= "lesson-btn-${lesson.level_no}" onclick = "loadLevelWord( ${lesson.level_no})"  class=" btn btn-outline btn-primary lesson-btn"> 
        <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
        </button>         
        `;

        // 4. append into container
        levelContainer.append(btnDiv);
    }
};


loadLessons()

document.getElementById("btn-search").addEventListener("click",()=>{    
    removeActive();
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim().toLowerCase();
    console.log(searchValue);

    fetch("https://openapi.programming-hero.com/api/words/all")
    .then (res => res.json())
    .then(data=>{
    
        const allWords = data.data;
        const filterWords = allWords.filter (word => word.word.toLowerCase().includes(searchValue))

            displayLevelWord(filterWords)
    })

})
