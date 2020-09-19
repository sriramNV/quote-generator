// dom containers
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
var numOfError = 0;

function startLoadingAnimation(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}


function stopLoadingFunction(){
    if(!loader.hidden){
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

// Get Quote from API
async function getQuote(){
    startLoadingAnimation();
    
    const proxy = 'https://protected-temple-56390.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    
    try{
        const res = await fetch(proxy + apiUrl);
        const data = await res.json();
       
        // if author field returned is blank
        if(data.quoteAuthor == ''){
            authorText.innerText = 'Unknown';
        } else{
        authorText.innerText = data.quoteAuthor;
        }
        
        if(data.quoteText.length > 120){
            quoteText.classList.add('long-quote');
        } else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        
        stopLoadingFunction();
        
        // Uncomment below line only for testing purposes.
        //throw new Error('oops');
    }
    catch(error){
        numOfError++;
        if(numOfError<=10){
            getQuote();
            
        }
        else{
            quoteText.innerText = 'Sorry Server is Busy Or down';
            authorText = '!';
        }
    }
}

// twitter function 

function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twiterUrl = `https://twitter.com/intent/tweet?text=${quote} ${author}`;
    window.open(twiterUrl, '_blank');
}

// event listeners
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();