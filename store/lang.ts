import { create } from 'zustand'

interface LangState {
    lang: "EN"|"ES"
    setLang: (lang: "EN"|"ES") => void
    getLang: ()=>"EN"|"ES"
}

const STORAGE_KEY = 'noku_lang_10204';

const useLangStore = create<LangState>()((set) => ({
    lang: "EN",
    setLang: (lang) => {
        set((state) => {
            writeLocalStorage(lang)
            return { lang }
        })
    },
    getLang: () => {
        return readLocalStorage()
    }
}))


// utils 
const readLocalStorage = (): "EN"|"ES" => {
    try {
        const storedValue = localStorage.getItem(STORAGE_KEY);
        return storedValue == "EN" || storedValue == "ES" ? storedValue : "EN";
    } catch (e) {
        console.error("Could not load initial state from localStorage:", e);
        return "EN";
    }
};

// Function to save the current state to localStorage
const writeLocalStorage = (lang: "EN"|"ES") => {
    try {
        localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
        console.error("Could not save state to localStorage:", e);
    }
};

export { useLangStore }