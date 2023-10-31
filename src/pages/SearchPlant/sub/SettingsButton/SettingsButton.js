import './SettingsButton.css'

export default function SettingsButton() {
    const currentLanguage="en";
    const languageWritings={
        pl:{
            mostSearched:"Najczęściej wyszukiwane",
            likesLight:"Światłolubne",
            likesShadow:"Cieniolubne",
            forBeginners:"Dla początkujących",
            forAdvanced:"Dla zaawansowanych",
            airPuryfing:"Oczyszczające powietrze",
            saveForChildren:"Bezpieczne dla dzieci",
            saveForAnimals:"Bezpieczne dla zwierząt"
        },
        en:{
            mostSearched:"Most searched",
            likesLight:"Light loving",
            likesShadow:"Shadow loving",
            forBeginners:"For beginners",
            forAdvanced:"For advanced",
            airPuryfing:"Air puryfying",
            saveForChildren:"Save for children",
            saveForAnimals:"Save for animals"
        }
    }

    return (
        <>
            <div id='settings-container'>
                <div className='option'>
                    <input type='checkbox' id='most-searched' name='most-searched'></input>
                    <label for='most-searched'>{languageWritings[currentLanguage].mostSearched}</label>
                </div>
                <div className='option'>
                    <input type='checkbox' id='likes-light' name='likes-light'></input>
                    <label for='likes-light'>{languageWritings[currentLanguage].likesLight}</label>
                </div>
                <div className='option'>
                    <input type='checkbox' id='likes-shadow' name='likes-shadow'></input>
                    <label for='likes-shadow'>{languageWritings[currentLanguage].likesShadow}</label>
                </div>
                <div className='option'>
                    <input type='checkbox' id='for-beginners' name='for-beginners'></input>
                    <label for='for-beginners'>{languageWritings[currentLanguage].forBeginners}</label>
                </div>
                <div className='option'>
                    <input type='checkbox' id='for-advanced' name='for-advanced'></input>
                    <label for='for-advanced'>{languageWritings[currentLanguage].forAdvanced}</label>
                </div>
                <div className='option'>
                    <input type='checkbox' id='air-puryfing' name='air-puryfing'></input>
                    <label for='air-puryfing'>{languageWritings[currentLanguage].airPuryfing}</label>
                </div>
                <div className='option'>
                    <input type='checkbox' id='save-for-children' name='save-for-children'></input>
                    <label for='save-for-children'>{languageWritings[currentLanguage].saveForChildren}</label>
                </div>
                <div className='option'>
                    <input type='checkbox' id='save-for-animals' name='save-for-animals'></input>
                    <label for='save-for-animals'>{languageWritings[currentLanguage].saveForAnimals}</label>
                </div>
            </div>
        </>
    )

}