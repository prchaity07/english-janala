const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all"
    )
    .then ((res) => res.json())
    .then ((json) =>displayLessons(json.data))
};

// level word load and showing - 2nd step
const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then((res) => res.json())
    .then ((data) => displayLevelWord(data.data));
}

// word show kora

const displayLevelWord = (words) => {
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
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF70]">
                    <i class="fa-solid fa-circle-info"></i>
                </button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF70]">
                    <i class="fa-solid fa-volume-high"></i>
                </button>
            </div>
        </div>
    `;

    wordContainer.append(card)
    });
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
        <button onclick = "loadLevelWord( ${lesson.level_no})"  class=" btn btn-outline btn-primary"> 
        <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
        </button>         
        `;

        // 4. append into container
        levelContainer.append(btnDiv);
    }
};


loadLessons()