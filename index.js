//index.js

document.addEventListener('DOMContentLoaded',()=>{
    //variables
    let totalCartas= 25;
    let index=0;

    //sonidos y captura de elementos
    const soundShuffle= document.getElementById('shuffle');
    const soundFlip= document.getElementById('flip');
    const shuffleButton= document.getElementById('barajar');
    const carta= document.getElementsByClassName('carta');
    const barajar=  document.getElementById('divBarajar');
    const controles= document.getElementById('controles');
    const boton= document.getElementById('boton');
    const cardUrl= "img/reverso.png";
    const contador= document.getElementById('contador');
    const botones=document.querySelectorAll('#controles #boton');
    
    //precarga sonidos
    soundShuffle.load();
    soundFlip.load();

    //funciones

    function moveCard(imagenSrc, callback){
            
        clonedCard();
        //identifico carta
        cardUrl.src=imagenSrc;

        //controles en visto 
        controles.style.display='flex';

        //para saber datos zonas
        
        carta[index].style.left='50%';

        carta[index].addEventListener('transitionend',() => {
            if (typeof callback === 'function'){
                callback()
            };            
        },{ once: true });

        index++;
    }

    function clonedCard(){
        //añado clase viajera a la carta que va a viajar
            carta[index].classList.add('cardTraveller');
        if (totalCartas>1){
            //creo un clon de carta 
            const cartaClonada=document.createElement("img");
            cartaClonada.src=cardUrl;
            cartaClonada.classList.add('carta');
            barajar.appendChild(cartaClonada);
            carta[index].classList.remove('cardTraveller');
        }
    }

    function ended(){
        if(totalCartas>0){

                soundFlip.play();
            moveCard(
                cardUrl,
                ()=>console.log("carta en adivinar") 
            );
            
            totalCartas--;
        }
        
    };

    


    //eventos 
   
    controles.addEventListener('click',function botonSeleccion(ev){
        if (totalCartas>=0){
        carta[index-1].classList.add('descarte');
        
        carta[index-1].style.left='85%';
        
        let gradosDescarte= (Math.random()*-15)*1;

        console.log(gradosDescarte);

        carta[index-1].style.transform=`translate(-50%, -50%) rotate(${gradosDescarte}deg)`;
        
        if(totalCartas<=0){
        controles.style.display='none';
        }

        ended();
        
        contador.innerHTML= totalCartas;
         
        }

    });

    shuffleButton.addEventListener('click',function barajarSound(){
        if (shuffleButton.style.display!=="none"){
            shuffleButton.style.display= "none"
        }

        soundShuffle.play();

        soundShuffle.addEventListener('ended',()=>{
            moveCard();
            soundFlip.play();
        });
        
    });

    shuffleButton.addEventListener('click', barajarSound);

    soundShuffle.addEventListener('ended', ended);
});

