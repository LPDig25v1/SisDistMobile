<?php

    header("Content-type: application/json");

    $local = "localhost";
    $user = "root";
    $senha = "";
    $banco = "loja";

    if(isset( $_REQUEST["buscar"])){
        try{
            $conn = mysqli_connect($local, $user, $senha, $banco);

        if($conn) {
            $query = "SELECT * FROM produto ORDER BY nome";
            $result = mysqli_query($conn, $query);
            $linhas = array();
            while($row = mysqli_fetch_assoc($result)){
                $linhas[] = $row;
            }
            mysqli_close($conn);
            echo '{"produto" : ' . json_encode($linhas) . '}';
            } else {
                echo '{"resposta" : "Erro ao conectar com o banco de dados" }';
            }
        }catch( \Throwable $th){
            echo '{"resposta" : "Erro no servidor"}';
        }
    }
?>