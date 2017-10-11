class JsBtnSlider{
    constructor(sliderInpElements){
        this.DOM = this.setDomSelectors(); //pole DOM - zawierające selektory elementów

        // selekcja obiektu slidera:
        this.slider = document.querySelector(this.DOM.slider);

        // lista ul zawierająca elementy (buttony) slidera: 
        this.sliderElementsUl = document.querySelector(this.DOM.sliderElementsUl);

        this.generateSlider(sliderInpElements);
    }

    // metoda ustawiająca selektory elementów 
    setDomSelectors(){

        return {
            // konfiguracja - selektory elementów 
            slider: '#jsBtnSlider', //selektor całego kontenera slidera
            sliderElementsUl: '.jsBtnSlider__contentUl', //lista zawierająca elementy slidera
            btn: '.jsBtnSlider__btn',//każdy przycisk w sliderze
            contentBtn: '.jsBtnSlider__btn--content',//przycisk content (zawartości) w sliderze (tzw. content - nie dotyczy przycisków tzw funkcyjnych jak next i previous) 
        };
    }

    generateSlider(sliderInpElements){
    // metoda generująca zawartość slidera (na podstawie sliderInpElements) w liście sliderElementsUl

        // iteracja po wszystkich zdefiniowanych buttonach do dodania i tworzenie li, a w nim buttona
        sliderInpElements.forEach( elem => {
            const newLi = document.createElement("li");

            const newSliderElem = document.createElement("button");
            newSliderElem.innerText = elem.btnContent; //treść buttona pobierana z pola btnContent

            // dodanie klas przyciskowi
            newSliderElem.classList.add('jsBtnSlider__btn'); //POPRAWIĆ! - na razie nadanie klasy "z ręki"
            newSliderElem.classList.add('jsBtnSlider__btn--content'); //POPRAWIĆ! - na razie nadanie klasy "z ręki"
            
            //dodanie obsługi kliknięcia w przycisk
            newSliderElem.addEventListener('click', elem.btnCallback);

            this.sliderElementsUl.appendChild(newLi).appendChild(newSliderElem);
        });
    }
}

const jsBtnSlider = new JsBtnSlider(
    [   //tablica przycisków generowanych przez slider
        {   btnContent: 'Biały', //treść przycisku
            btnCallback: () => console.log('Biały') //akcja wykonywana na kliknięcie w przycisk
        },
        {   btnContent: 'Czerwony',
            btnCallback: () => console.log('Czerwony')
        },
        {   btnContent: 'Żółty',
            btnCallback: () => console.log('Żółty')
        },
        {   btnContent: 'Niebieski',
            // btnCallback: ''
        },
        {   btnContent: 'Zielony',
            // btnCallback: ''
        },
    ]
);

