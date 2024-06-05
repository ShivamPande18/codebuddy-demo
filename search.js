const urlParams = new URLSearchParams(window.location.search);
const intialData = urlParams.get('data');
const ROOT = "https://codesbuddy.netlify.app/";

var scrollCont = document.getElementsByClassName("cardRow")[0];
var sideNavLis = document.getElementsByClassName("sideNavLi");
var cardMainCont = document.getElementsByClassName("cardMainCont")[0];
var cardMainCardCont = document.getElementsByClassName("cardMainCardCont")[0];

var sideInd = 0;
var filterTags = [];

var tagList = ["","ai","app","appdev","backend","business","career","chrome","code","course","game","gamedev","github","misc","ml","money","movie","project","tools","tutorial","vscode","webdev","website"];
var emojiList = ["","👾","📱","🔧","💾","💸","🧑‍🎓","🌐","🧑🏻‍💻","🧑‍🏫","🎮","🕹️","⌨️","📟","🤖","💰","🍿","🎞️","⚙️","📹","📃","🖇️"]

var isMobile = false;

var cardImg = document.getElementById("cardImg");
var cardDesc = document.getElementById("cardDesc");
var cardTags = document.getElementById("cardTags");
var cardTitle = document.getElementById("cardTitle");
var sideNavUl = document.getElementsByClassName("sideNavUl")[0];
var cardDisp = document.getElementsByClassName("cardDispCont")[0];
var cardNavCont = document.getElementsByClassName("cardNavCont")[0];
var cardMainTagCont = document.getElementsByClassName("cardMainTagCont")[0];

var signUps = document.getElementsByClassName("signUpBar");
var signedUps = document.getElementsByClassName("signedUpBar");
var signUpInputs = document.getElementsByClassName("signUpInput");
var signUpError = document.getElementsByClassName("signUpError");
var subBtns = document.getElementsByClassName("subBtn");

signedUps[0].style.display = "none";    

subBtns[0].addEventListener("click", (e) => { OnSignUp(0, e) })

var searchFilter="";

async function OnSignUp(ind,e){
    e.preventDefault();
    var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    var email = signUpInputs[ind].value;
    
    if(regex.test(email)){
        signUps[0].style.display = "none";  
        signedUps[0].style.display = "flex";

        signUpError[ind].innerHTML = "";

        const docRef = await addDoc(collection(db, "emails"), {
            email: email
        });
    }
    else{
        signUpError[ind].innerHTML = "*Enter a valid email";
        // signUpError[ind].style
    }
}

function copyLink(){
    navigator.clipboard.writeText(`${ROOT}search.html?data=${dataInd}`)
    alert("Link copied");
}


var cardsJson = JSON.parse(`{
    "cards":[
        {
            "id": "0",
            "title": "title",
            "shortDesc": "loLorem ipsum dolor sit amet consectetur adipisicing elit. Quidem voluptas quam deserunt sequi voluptates quod ut possimus esse quas qui nobis itaque quis",
            "desc": "<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem voluptas quam deserunt sequi voluptates quod ut possimus esse quas qui nobis itaque quis assumenda asperiores, minima explicabo veritatis omnis consequuntur!</p> <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem voluptas quam deserunt sequi voluptates quod ut possimus esse quas qui nobis itaque quis assumenda asperiores, minima explicabo veritatis omnis consequuntur!</p> <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem voluptas quam deserunt sequi voluptates quod ut possimus esse quas qui nobis itaque quis assumenda asperiores, minima explicabo veritatis omnis consequuntur!</p>",
            "img": "Images/placeholder.png",
            "tags": "vscode code",
            "link": "#"
        }
    ]
}`);

var cardsData = cardsJson["cards"];
var dataInd = parseInt(intialData);

var tagTemp;

for (let i = 0; i < tagList.length; i++) {
    let name = tagList[i];
    if(i==0){
        tagTemp = elementFromHtml(
            `<li class="sideNavLi activeSideNav" onclick="onSideNav(0)">all🪐</li>`
        );
    }
    else{
        tagTemp = elementFromHtml(
            `<li class="sideNavLi" onclick="onSideNav(${i})">${name}${emojiList[i]}</li>`
        );
    }
    sideNavUl.appendChild(tagTemp);
}

cardDisp.style.display = "none";

showCards();

function goToLink(){
    open(cardsData[dataInd]["link"]);
}


function showCardDisp(ind){
    var curCard = cardsData[ind];
    cardDesc.innerHTML = curCard["desc"];
    cardImg.src = curCard["img"];
    const tags = curCard["tags"].split(" ")
    let str = "";
    tags.forEach(tag => {
        str += "<div>" + tag + "</div> ";
    });
    cardTags.innerHTML = str;
    cardDisp.style.display = "block";
}

function cardDispExit() {
    cardDisp.style.display = "none";
}

function cardDispExitChild(e) {
    e.stopPropagation();
}


function onScroll(dir){
    console.log("page");
    scrollCont.scrollBy(dir * 600,0)
}

function elementFromHtml(html) {
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content.firstElementChild;
}

function sendLink(ind){
    showCardDisp(ind);
    dataInd = ind;
    // open(`http://127.0.0.1:5501/search.html?data=${ind}`, target = "_parent")
}

function showCards(){
    let child = cardMainCardCont.lastElementChild;
    while (child) {
        cardMainCardCont.removeChild(child);
        child = cardMainCardCont.lastElementChild;
    }

    // cardMainCardCont.appendChild(elementFromHtml(`<div class="multiTagCont">tags</div>`))
    for(let i=0; i<30; i++){
        var curCard = cardsData[0];
        const tags = curCard["tags"].split(" ")
        let str = "";
        tags.forEach(tag => {
            str += "<div>" + tag + "</div> ";
        });

        if (curCard["title"].toLowerCase().includes(searchFilter)){
            var cardTempStr = `
            <div class="card" onclick = "sendLink(${i})">
                <div class="cardHeader">
                    <p>${curCard["shortDesc"]}</p>
                    <div class="tagCont">
                        ${str}
                    </div>
                </div>
                <div class="cardFooter">
                    <img src=${curCard["img"]} alt=""srcset="">
                </div>
            </div>
            `;
            var cardTemp; 
            cardTemp = elementFromHtml(cardTempStr);
            cardMainCardCont.appendChild(cardTemp);

            if(filterTags.length == 0){
                cardTemp = elementFromHtml(cardTempStr);
                cardMainCardCont.appendChild(cardTemp);
            }
        }
    }
}


function showSideMenu(){
    isMobile = true;
    cardNavCont.style.display = "block";
}