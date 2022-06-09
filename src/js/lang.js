
let currentLanguage = localStorage.getItem('language') || "en";

const dictionary = {
    en: {
        'no-match': "Your search - %s - did not match any documents.",
        'remove': "Remove",
        'search': "Search",
        'search-x': "Search X",
        'suggestions': "Suggestions",
        'suggestions-options': "Make sure that all words are spelled correctly.\nTry different keywords.\nTry more general keywords.\nTry fewer keywords."
    },
    
    he: {
        'no-match': "Your search - %s - did not match any documents.",
        'remove': "מחיקה",
        'search': "חיפוש",
        'search-x': "Search X",
        'suggestions': "הצעות"
    }
};

function translate(word) {
    return dictionary[currentLanguage][word] || word;
}

function getCurrentLanguage() {
    return currentLanguage;
 }

export { translate }