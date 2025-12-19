<?

$sorteo=[];
$contador=array_fill_keys($simbolosLista,0);
$simbolosLista=['circulo', 'cruz', 'cuadrado','estrella', 'ondas'];

while(count($sorteo)<25){
    $max=4;
    $min=0;

    #numero aleatorio
    $i= random_int($min,$max);
    $symbol=$simbolosLista[$i];

    if($contador[$symbol<5]){

        $sorteo[]=$symbol;
        $contador[$symbol]++;

    }
}

shuffle([$sorteo]);
?>
