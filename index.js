//index.js





document.addEventListener('DOMContentLoaded',()=>{
    //variables
    let totalCartas= 25;
    let index=0;

    //sonidos y captura de elementos
    const soundShuffle= document.getElementById('shuffle');
    const soundFlip= document.getElementById('flip');

    const shuffleButton= document.getElementById('barajar');
    const cardTraveller= document.getElementById('cardTraveller');

    const barajar=  document.getElementById('divBarajar');
    const adivinar=  document.getElementById('divAdivinar');
    const descartar=  document.getElementById('divDescarte');
    
    const cardUrl= "img/reverso.png";
    const cartas=[cardUrl,cardUrl,cardUrl,cardUrl];
    

    //para identificar zonas
    
    

    //funciones

    function moveCard(origen, destino, imagenSrc, callback){
            
            //identifico carta
            cardUrl.src=imagenSrc;

            //para saber datos zonas
            
            
            cardTraveller.style.left='50%';

        cardTraveller.addEventListener('transitionend',() => {
            if (typeof callback === 'function'){
                callback()
            };            
        },{ once: true });
    }

    //precarga sonidos
    soundShuffle.load();
    soundFlip.load();

    shuffleButton.addEventListener('click',()=>{
        shuffleButton.style.display= "none";
        soundShuffle.play();
    });
    
    soundShuffle.addEventListener('ended',function ended(){
        soundFlip.play();
        moveCard(
            barajar, 
            adivinar,
            cardUrl,
            ()=>console.log("carta en adivinar") 
        );
    },{ once: true });
    
});

