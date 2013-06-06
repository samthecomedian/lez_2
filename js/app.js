
//controllo applicazione
function todoCtrl($scope) {
    //colleghiamo l'array al nostro tr centrale. così, quando aumenta l'array, la tab aumenta di righe
    
    //sorgente e dati
    //$scope.oggetti = [];
        //push funziona solo sugli array, quindi avevo bisogno di un elemento vuopto
        
   function avvio(){
    var inizio;
    if (localStorage.getItem("todoMohole")) {
        inizio = JSON.parse(
            localStorage.getItem("todoMohole")
        );
    } else {
        inizio = [];
    }
    
    $scope.oggetti = inizio;
    }
    avvio();
   
    
    $scope.memorizza = function(){ 
        //Converto l'array in stringa
        var stringa = JSON.stringify($scope.oggetti);//crea una stringa con dentro tutti i dati dell'array
        //imposto il localstorage
        localStorage.setItem("todoMohole",stringa);
    }
    //$scope.oggetti = [
    //    {"testo": "prima prova"},
    //    {"testo": "seconda prova"}
    //]; //questo era prima. per vedere i dati
    
    //aggiungi elementi
    $scope.aggiungi = function(){
        console.log(this);
        $scope.oggetti.push(
            {"testo": this.nuovoOgg}
                            );
        
        $scope.nuovoOgg = "";/*barbatrucco per evitare che mi rimetta quello che ho scritto prima con input vuoto. PERO' posso toglierlo, visto che ho messo il required*/
        //resetto la form
    document.querySelector("form").reset();
    
    $scope.memorizza();//voglio memorizare i miei dati
    navigator.notification.beep(3);
            
    }
    
    //elimina il singolo e l'elemento
    $scope.elimina = function(){
       // console.log(this.$index);
        var elem = this.$index;
        
        navigator.notification.confirm(
            'Operazione irreversibile', //messaggio
            function (btn) {
               if (btn == 1) {
                $scope.oggetti.splice(elem,1);
                $scope.memorizza();
               }
            }, //callback
            'Elimina elemento', //title
            'Zi,Nu' //buttonlabels
        );
        //tolgo questo elemento dall'array  
    }
    
    //cancella tutte le note
    $scope.svuota = function(){
        $scope.oggetti = [];
        localStorage.clear();
        $scope.memorizza();
        navigator.notification.vibrate(1000);

    }
      
}

            
    