
script.js:window.addEventListener('scroll', function() {
    let scrollPosition = window.scrollY;
    let word1 = document.getElementById('word1');
    let word2 = document.getElementById('word2');
    let word3 = document.getElementById('word3');

    // Adjust the scroll factor to control how fast the words spread apart
    let scrollFactor = scrollPosition / 5;

    // Move the words horizontally based on the scroll position
    word1.style.transform = translateX(-${scrollFactor}px);
    word2.style.transform = translateY(${scrollFactor}px); // optional: add some vertical movement to the middle word
    word3.style.transform = translateX(${scrollFactor}px);
}); 
