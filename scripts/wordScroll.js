let softwareWords = [
    'software',
    'apps',
    'websites',
    'frontends',
    'backends',
    'programs',
    'cool things'
]

let wordScroll = document.querySelector("#wordScroll")
let wordsPos = 0

let wordsScroll = function() {
    wordsPos += 1
    if(wordsPos >= softwareWords.length){
        wordsPos = 0
    }
    wordScroll.innerHTML = softwareWords[wordsPos]
}