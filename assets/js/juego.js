/**
 * 2C = TWO OF THE CLUBS
 * 2D = TWO OF DEAMONS
 * 2H = TWO OF HEARTS
 * 2S = TWO OF SPADES
 */


 let deck = [];
 let types = ['C', 'D', 'H', 'S'];
 let letters = ['A','J','K','Q',];
 let puntosJugador = 0,
     puntosComputadora = 0;

// references of HTML 
const btnrequest = document.querySelector('#btn-request');
const btnstop = document.querySelector('#btn-stop');
const btnnew = document.querySelector('#btn-new');

const divJugadorCartas = document.querySelector('#jugador-cartas');
const divComputerCartas = document.querySelector('#computadora-cartas');
const  puntosHTML = document.querySelectorAll('small');







// This function creates a new Deck
 const createDeck = () =>{




 for (let i = 2; i <=10; i ++){
    for ( type of types) {
        deck.push( i + type)
    }
 }

 for (let letter of letters){
     for (let type of types){
         deck.push( letter + type)
     }
 }


 deck = _.shuffle( deck );


}




createDeck();


//This function will allow me to take a new card,/*  this is another shorter way to do the same than the commnented below lines lines*/

const pedirCarta = () => {
      console.log(deck);
    if( deck.length === 0){
        throw 'No hay cartas en el deck'
    }

    let carta = deck[Math.floor(Math.random()*deck.length)]; //this part takes a random card from aRRAY
    
    for( let i = 0 ; i <= deck.length; i ++){

        if(deck[i] === carta){
            deck.splice(i, 1)
           
        }
    }
    return carta;



}

   // pedirCarta();   this is a way to validate the values of the card 

   /* const valorCarta = ( carta ) =>{
      let puntos = 0
      const valor = carta.substring(0, carta.length -1);
      console.log({valor})

      if( isNaN(valor)){
       puntos = (valor === 'A') ? 11 : 10;                              //the only letter that its value is 11 is the A , the other letter value 10

      }else{
          
          puntos = valor * 1;
         
      }
    
   }
 */


 const valorCarta = ( carta ) =>{
     const valor = carta.substring(0, carta.length -1); //take out the last string of the card, example 9D, valor will value 9
      return ( isNaN( valor ) ) ?
              (valor === 'A') ? 11 : 10
            : valor * 1;
 }


 //IT is the time of the computer:

 const turnoComputer = ( puntoMinimo ) =>{
     do{
        const cartaComputer= pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta( cartaComputer )
        puntosHTML[1].innerText = puntosComputadora


        const createcard = document.createElement('img');
        createcard.src = `assets/cartas/${ cartaComputer }.png`;
        createcard.classList.add("carta");

        divComputerCartas.append(createcard);
        if( puntoMinimo > 21){
            break
        };
        
    
     }while( (puntosComputadora < puntoMinimo ) && (puntoMinimo <= 21) );
     

     setTimeout(() =>{
    
     if (puntosComputadora === puntosJugador ){
         alert('Nadie Gana :( ');
     } else if (puntoMinimo > 21){
         alert ('Te gano la computadora, intenta de nuevo');
     } else if (puntosComputadora > 21 ){
         alert ('Jugador GANA');
     }else{
         alert ('Computadora Gana')
     }
        
     
    }, 100);
     
}
 
   

 // Events:
  // This example we say that when we do "click" on btnrequest (defined above) we will triger the call back function 
 btnrequest.addEventListener('click', () =>{

    const carta = pedirCarta();

     puntosJugador = puntosJugador + valorCarta(carta);
     puntosHTML[0].innerText = puntosJugador; //[0] is the counter for "jugador"

     const createcard = document.createElement('img'); //create the img tag in HTML
     createcard.src = `assets/cartas/${ carta }.png`; //we defined the new img with its src 
     createcard.classList.add('carta');
     divJugadorCartas.append( createcard ); //we append the new card in HTML


     if (puntosJugador > 21){
         
         btnrequest.disabled = true;
         btnstop.disabled = true;
         turnoComputer ( puntosJugador );

     }else if(puntosJugador === 21 ){
         
         btnrequest.disabled = true;
         btnstop.disabled = true;
         turnoComputer ( puntosJugador );
     }



 });

 btnstop.addEventListener('click', () =>{
    btnrequest.disabled = true;
    btnstop.disabled = true;
    turnoComputer( puntosJugador );

 });
 
 btnnew.addEventListener('click', () =>{
    console.clear()
    deck = [];
    console.log(deck);
    divJugadorCartas.innerHTML = ''; // we remove the cards
    divComputerCartas.innerHTML = '';
    
    btnrequest.disabled = false; // we enable the buttom of stops and request new card
    btnstop.disabled = false;
    
    puntosJugador     = 0;
    puntosComputadora = 0;

    puntosHTML[0].innerText = 0; //we set to 0 the points of the computer and the player
    puntosHTML[1].innerText = 0;

    createDeck(); //recreate a new deck
    console.log(deck);
    


    
    
 });