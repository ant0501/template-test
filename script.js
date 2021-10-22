const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

//Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide loading
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

//show new quote
function newQuote() {
    loading();
    //Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // check author is blank replace it with 'unknown'
    if (!quote.author) {
        authorText.textContent = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }
    // check quote length to determine styling
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    //set quote, hide loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes from API

async function getQuotes() {
    loading();
    const apiUrl = "https://type.fit/api/quotes";
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) { }
}

//Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//on load
getQuotes();
// newQuote();

