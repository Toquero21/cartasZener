//index.js

document.addEventListener('DOMContentLoaded',()=>{
    
    //--Variables Estado Lógico
    const simbolos= ["circulo", 'cruz', 'cuadrado', 'estrella', 'ondas'];
    let mazo=[]    
    let elecciones=[];
    let aciertos=0;

    //--Estado de la interfaz de usuario

    let totalCartas= 25;
    let cartaActiva=null;
    
   
    //--Elementos
    const soundShuffle= document.getElementById('shuffle');
    const soundFlip= document.getElementById('flip');
    const shuffleButton= document.getElementById('barajar');
    const barajarZona=  document.getElementById('divBarajar');
    const descarteZona= document.getElementById('divDescarte');
    const controles= document.getElementById('controles');
    const contador= document.getElementById('contador');

    const botonCierre=document.getElementById("cerrarResultado");
    const resultadoCapa= document.getElementById("resultadoFinal");
    const resultadoTexto= document.getElementById("resultadoTexto");
    
    //--Funciones de acciones

    function crearMazo(){

        //creo un array provisional del mazo
        const mazoProvisional=[];

        for( const simbolo of simbolos){
            for ( let i = 0; i<5; i++){
                mazoProvisional.push(simbolo)
            }
        }

        //Ahora relleno la tirada real barajada de cartas 
        for (let i = mazoProvisional.length-1; i>0 ; i--) {
            const j= Math.floor(Math.random()* (i+1));

            [mazoProvisional[i],mazoProvisional[j]]=[mazoProvisional[j],mazoProvisional[i]];
        }

        return mazoProvisional;

    }

    function actualizarContador(){
        contador.textContent=mazo.length;
    }

    function crearCartaDOM(){
        const img= document.createElement("img");
        img.src="img/reverso.png";
        img.classList.add("carta");
        img.draggable=false;
        barajarZona.appendChild(img);

        return img;
    }

    //---Flujo principal

    function sacarCartaAlCentro(){

        //Si ya no quedan cartas finalizamos el experimento

        if(mazo.length===0){

            finalizarBien();
            return;
        }
    
        //--crear carta activa
        cartaActiva= crearCartaDOM();
        cartaActiva.offsetHeight;

        //--sonido de reparto cuando la carta va al centro
        soundFlip.currentTime=0;
        soundFlip.play();

        //movimiento de carta al centro por clase
        cartaActiva.classList.add("enCentro");
        

        //cuando llegue al centro mostramos controles
        cartaActiva.addEventListener('transitionend',()=>{
            controles.style.display="flex"
        },{once:true});

    }


    function descartarCartaActual(){
        if(!cartaActiva) return;

        controles.style.display= "none";

        //Rotación aleatoria

        const rotar= Math.random()*30-15;
        cartaActiva.style.transform=`translate(-50%, -50%) rotate(${rotar}deg)`;

        // Mover a la zona de descarte
        cartaActiva.classList.add("enDescarte");

        //Al terminar el movimiento la dejamos fija en el descarte
        cartaActiva.addEventListener('transitionend', ()=>{

            cartaActiva= null;

            //sacamos la siguiente carta
            sacarCartaAlCentro()
        },{once:true});
    }


    //---En este paso lo que hago es guardar el sorteo inicial para compararlo

    let sorteoInicial=[];

    function iniciarConSorteo(){

        mazo=crearMazo();
        sorteoInicial=[...mazo];
        elecciones=[];
        aciertos=0;
        controles.style.display="none";
        resultadoCapa.style.display="none";
        shuffleButton.style.display="block";
        actualizarContador();

        if(cartaActiva){
            cartaActiva.remove();
            cartaActiva=null;
        }
    }


    function finalizarBien(){

        aciertos=0;
        for (let i = 0; i < sorteoInicial.length; i++) {
            
            if(sorteoInicial[i]=== elecciones[i]) aciertos++;
            
        }

        const porcentajeAcierto= Math.round((aciertos /25)*100);
        resultadoTexto.textContent=`Has acertado ${aciertos} de 25 cartas. Eso es un ${porcentajeAcierto}% .`
        resultadoCapa.style.display="flex"
    }

    //---Eventos

    shuffleButton.addEventListener('click', ()=>{

        shuffleButton.style.display="none";
        soundShuffle.currentTime=0;
        soundShuffle.play();
    });

    soundShuffle.addEventListener('ended', ()=>{

        sacarCartaAlCentro();
    });

    controles.addEventListener('click', (ev)=>{

        const btn= ev.target.closest("button.boton");
        if(!btn) return;

        //si no hay carta activa se ignora
        if(!cartaActiva) return;

        //Guardamos la elección en la posición actual
        const posicion= elecciones.length;
        elecciones.push(btn.dataset.simbolo);

        //consumimos una carta lógica del mazo
        mazo.shift();
        actualizarContador();

        //si era la ultima la descartamos y mostramos los resultados

        if(mazo.length=== 0){

            controles.style.display="none";
            const rotar= Math.random()*30 -15;

            cartaActiva.style.transform=`translate(-50%, -50%) rotate(${rotar}deg)`;
            cartaActiva.classList.add("enDescarte");

            cartaActiva.addEventListener('transitionend', ()=>{

                cartaActiva= null;
                finalizarBien();
            },{ once:true});

            return;
        }

        //Si no es la ultima la descartamos

        descartarCartaActual();
    })


    botonCierre.addEventListener('click',()=>{

        resultadoCapa.style.display="none";
    })

    //---Arranque del programa

    iniciarConSorteo();
});     
