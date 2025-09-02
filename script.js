const track = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.option');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;

function updateSlide() {
    let slideWidth;
    if (window.matchMedia("(max-width: 600px)").matches) {
        slideWidth = 250; // Mobil
    } else if (window.matchMedia("(max-width: 900px)").matches){
        slideWidth = 400; //tablet
    }else{
        slideWidth = 900; //tablet
    }
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlide();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlide();
});

updateSlide();

function resetScore() {

    sonuc = { win: 0, tie: 0, lose: 0 };
    updateScoreElement()
    localStorage.setItem("sonuc", JSON.stringify(sonuc));
    console.log("Skor sıfırlandı:", sonuc);
}
// Sayfa yüklendiğinde mevcut skoru konsolda göster
window.onload = function () {
    getResult();
};
function Calculate() {
    let numberx = Math.random();
    if (numberx < 1 / 3) {
        numberx = "Rock";
    } else if (numberx < 2 / 3) {
        numberx = "Paper";
    } else {
        numberx = "Scissors";
    }
    return numberx;
}

let result = "";
function fight(choise) {
    const ComputerMove = Calculate();
    let translate = { "Rock": "Taş", "Paper": "Kağıt", "Scissors": "Makas" };
    let result = "";
    if (choise === "Rock") {
        if (ComputerMove === "Rock") {
            result = "Berabere";
        } else if (ComputerMove === "Paper") {
            result = "Kaybettin";
        } else {
            result = "Kazandın";
        }
    } else if (choise === "Paper") {
        if (ComputerMove === "Rock") {
            result = "Kazandın";
        } else if (ComputerMove === "Paper") {
            result = "Berabere";
        } else {
            result = "Kaybettin";
        }
    } else {
        if (ComputerMove === "Rock") {
            result = "Kaybettin";
        } else if (ComputerMove === "Paper") {
            result = "Kazandın";
        } else {
            result = "Berabere";
        }
    }
    alert(`Sen ${translate[choise]} seçtin, Bilgisayar ${translate[ComputerMove]} seçti. Sonuç: ${result}`);
    AddResult(result);
    getResult();

}



let sonuc;
const data = localStorage.getItem("sonuc");
if (data) {
    sonuc = JSON.parse(data);
} else {
    sonuc = { win: 0, tie: 0, lose: 0 };
}

function AddResult(result) {
    if (result === "Kazandın") {
        sonuc.win += 1;
    } else if (result === "Berabere") {
        sonuc.tie += 1;
    } else {
        sonuc.lose += 1;
    }
    updateScoreElement()
    localStorage.setItem("sonuc", JSON.stringify(sonuc));
}

function getResult() {
    const data = localStorage.getItem("sonuc");
    if (data) {
        const parsed = JSON.parse(data);
        console.log("Skor:", parsed);
        return parsed;
    } else {
        console.log("Henüz sonuç yok.");
        return null;
    }
}

function updateScoreElement() {
    document.querySelector('.showResult')
        .innerHTML = `Kazandın: ${sonuc.win} , Kaybettin: ${sonuc.lose} , Berabere: ${sonuc.tie} `;
}

