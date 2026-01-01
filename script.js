let opt = document.getElementById('opt');
let btnTest = document.getElementById('btnTest');
let askDiff = document.getElementById('askDiff');
let containPara = document.getElementById('containPara');
let contentPara = document.getElementById('contentPara');
let hiddenInput = document.getElementById('hiddenInput');
let container = document.getElementById('container');
let timerEl = document.getElementById('timer');
let cpmEl = document.getElementById('cpm');
let wpmEl = document.getElementById('wpm');
let mistakesEl = document.getElementById('mistakes');
let tryAgainBtn = document.getElementById('tryAgain');
let diff = document.getElementById('diff');

let containArr = [];
let timer;
let maxTime = 60;
let timeLeft = maxTime;
let mistakes = 0;
let isTyping = false;

btnTest.addEventListener('click', function() {
    if (opt.value === '') {
        alert('Please select difficulty level');
    }
    else if(opt.value === 'easy') {
        fetchPara('https://pebrrhnnhjgkwhxbyunt.supabase.co/storage/v1/object/sign/Typing%20Speed%20Test/Paragraphs/Easy/easy.txt?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81MmZjNTBiYy0zNDI2LTQzZTYtYThkNy0zNDgxMDU2OWE5M2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJUeXBpbmcgU3BlZWQgVGVzdC9QYXJhZ3JhcGhzL0Vhc3kvZWFzeS50eHQiLCJpYXQiOjE3NjcxMDYxNTAsImV4cCI6MzMzMDMxMDYxNTB9.uEDn0lW9jhgFqJF0mXB5xgW3fso069W_6NvlGwk8D78');
    } else if(opt.value === 'medium') {
        fetchPara('https://pebrrhnnhjgkwhxbyunt.supabase.co/storage/v1/object/sign/Typing%20Speed%20Test/Paragraphs/Medium/medium.txt?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81MmZjNTBiYy0zNDI2LTQzZTYtYThkNy0zNDgxMDU2OWE5M2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJUeXBpbmcgU3BlZWQgVGVzdC9QYXJhZ3JhcGhzL01lZGl1bS9tZWRpdW0udHh0IiwiaWF0IjoxNzY3MTA2NDMwLCJleHAiOjQ5MjA3MDY0MzB9.GU7Jyruwjop-LMhqsUlMmEeyp99JqtiNJlFoBMsRcUE');
    } else if(opt.value === 'difficult') {
        fetchPara('https://pebrrhnnhjgkwhxbyunt.supabase.co/storage/v1/object/sign/Typing%20Speed%20Test/Paragraphs/Hard/hard.txt?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81MmZjNTBiYy0zNDI2LTQzZTYtYThkNy0zNDgxMDU2OWE5M2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJUeXBpbmcgU3BlZWQgVGVzdC9QYXJhZ3JhcGhzL0hhcmQvaGFyZC50eHQiLCJpYXQiOjE3NjcxMDY0MTAsImV4cCI6NDkyMDcwNjQxMH0.MPJ_pe8eUlLvzLTrYjv4aOpdT7-ZSNxbgJE75K-suBc');
    }
});

async function fetchPara(api) {
    try {
        askDiff.hidden = true;
        container.hidden = false;
        let output = await fetch(api);
        let response = await output.json();
        containArr = response;
        containPara.hidden = false;
        displayData();
        startTimer();
        mistakes = 0;
        mistakesEl.textContent = "Mistakes: 0";
        timeLeft = maxTime;
        timerEl.textContent = timeLeft + "s";
        cpmEl.textContent = "CPM: 0";
        wpmEl.textContent = "WPM: 0";
    } catch(e) {
        alert(`API throws an error ${e}`);
    }
}

function displayData() {
    let i = Math.floor(Math.random() * containArr.length);
    let text = containArr[i].content;
    diff.innerText = `Difficulty Level: ${containArr[i].difficulty.charAt(0).toUpperCase() + containArr[i].difficulty.slice(1)}`;
    contentPara.innerHTML = text
        .split("")
        .map(char => `<span>${char}</span>`)
        .join("");
    hiddenInput.value = "";
    hiddenInput.focus();
}

containPara.addEventListener("click", () => {
    hiddenInput.focus();
});

function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        if(timeLeft > 0) {
            timeLeft--;
            timerEl.textContent = timeLeft + "s";
        } else {
            clearInterval(timer);
            hiddenInput.disabled = true;
        }
    }, 1000);
}

hiddenInput.addEventListener("input", () => {
    if(!isTyping) isTyping = true;
    let typed = hiddenInput.value.split("");
    let spans = contentPara.querySelectorAll("span");
    mistakes = 0;

    spans.forEach((span, index) => {
        let char = typed[index];
        if (char == null) {
            span.classList.remove("correct", "incorrect");
        } else if (char === span.textContent) {
            span.classList.add("correct");
            span.classList.remove("incorrect");
        } else {
            span.classList.add("incorrect");
            span.classList.remove("correct");
            mistakes++;
        }
    });

    mistakesEl.textContent = "Mistakes: " + mistakes;
    let correctChars = typed.length - mistakes;
    cpmEl.textContent = "CPM: " + correctChars;
    wpmEl.textContent = "WPM: " + Math.round(correctChars / 5);
});

containPara.addEventListener("click", () => {
    hiddenInput.focus();
});

tryAgainBtn.addEventListener("click", () => {
    hiddenInput.disabled = false;
    hiddenInput.value = "";
    mistakes = 0;
    mistakesEl.textContent = "Mistakes: 0";
    cpmEl.textContent = "CPM: 0";
    wpmEl.textContent = "WPM: 0";
    timeLeft = maxTime;
    timerEl.textContent = timeLeft + "s";
    clearInterval(timer);
    startTimer();
    displayData();
});
