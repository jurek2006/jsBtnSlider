class JsBtnSlider{
    constructor(numVisibleElements, sliderInpElements){
        //PARAMETRY:
        // numVisibleElements - liczba elementów, które mają być widoczne na sliderze
        // sliderInpElements - tablica definiująca przyciski do wygenerowania i ich callbacki 

        this.numVisibleElements = numVisibleElements;

        this.DOMsel = this.setDomSelectors(); //pole DOMsel - zawierające selektory elementów

        //----------------------------------------------------

        // selekcja obiektu slidera:
        this.slider = document.querySelector(this.DOMsel.slider);

        // "okienko" slidera - pokazujące widoczną część elementów
        this.sliderVisible = document.querySelector(this.DOMsel.sliderVisible);

        // lista ul zawierająca elementy (buttony) slidera: 
        this.sliderElementsUl = document.querySelector(this.DOMsel.sliderElementsUl); 

        //---------------------------------------------------- 

        // generowanie zawartości (przycisków slidera) 
        this.generateSlider(sliderInpElements);
        // skorygowanie liczby widocznych elementów, jeśli to konieczne
        this.adjustNumVisibleElements();

        // ustawienie zmiennej przechowującej wielkość (szerokość i wysokość) elementu (przycisku)
        // wybór pierwszego elementu w sliderze na podstawie którego wyliczana jest wielkość elementu
        this.firstEl = document.querySelector(this.DOMsel.contentBtn);
        this.elSize = this.getElementSize(this.firstEl); //można użyć .width i .height

        // zainicjalizowanie slidera (ustawienie jego wielkości - widocznych elementów)
        this.init();
    }

    // metoda inicjalizująca slider (ustawiająca jego wielkości - ilość widocznych elementów)
    init(){
        // ustawienie szerokości "okna" slidera - wyświetlającego aktualne elementy
        // jest ona tak ustawiana, żeby miało ono szerokość równą szerokości zadanej liczby widocznych elementów 
        
        this.sliderVisible.style.width = (this.numVisibleElements * this.elSize.width) + 'px';
    } 

    // metoda ustawiająca selektory elementów 
    setDomSelectors(){

        return {
            // konfiguracja - selektory elementów 
            slider: '#jsBtnSlider', //selektor całego kontenera slidera
            sliderVisible: '.jsBtnSlider__visible', //widoczna część slidera ("okienko" wyświetlające elementy)
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
            console.log(this.getElementSize(newSliderElem));
        });
    }

    getNumExistingElements(){
    // metoda zwracająca faktyczną liczbę elementów (przycisków) w sliderze 
        return this.sliderElementsUl.children.length;
    }

    getElementSize(element){
    // metoda zwracająca wielkość elementu element (jako literał obiektowy)
        return {
            'width': element.offsetWidth,
            'height': element.offsetHeight
        }
    }

    adjustNumVisibleElements(){
    //metoda korygująca liczbę widocznych elementów, jeśli ogólna liczba elementów w sliderze jest mniejsza 
        const numExistingElem = this.getNumExistingElements();
        if(this.numVisibleElements > numExistingElem){
            // jeśli zadana widoczna liczba elementów jest większa niż liczba istniejących elementów
            // ustawienie widocznej liczby elementów na taką, ile istnieje elementów
            this.numVisibleElements = numExistingElem;
            // KOMUNIKAT
            console.log(`Zmniejszono ilość widocznych elementów na sliderze do ${numExistingElem}, gdyż nie istnieje więcej - JsBtnSlider.js`); 
        }
    }
}

const jsBtnSlider = new JsBtnSlider(2, 
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

