document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const lampada = document.getElementById("lampada");

    // Função para gerar valores aleatórios de luminosidade e alterar os elementos
    function gerarLuminosidade() {
        const valor = Math.floor(Math.random() * 1024); // Gera valor entre 0 e 1024
        console.log(`Luminosidade atual: ${valor}`); // Exibe o valor gerado no console

        // Alterar o fundo e a imagem da lâmpada com base no valor da luminosidade
        if (valor > 1000) {
            console.log("Luminosidade alta: alterando para paisagem clara.");
            body.style.backgroundImage = "url('imagens/paisagem_clara.webp')"; // Fundo para luminosidade alta
            lampada.src = "imagens/lampada1.png"; // Lâmpada para luminosidade alta
        } else {
            console.log("Luminosidade baixa: alterando para paisagem escura.");
            body.style.backgroundImage = "url('imagens/paisagem_escura.jpg')"; // Fundo para luminosidade baixa
            lampada.src = "imagens/lampada2.png"; // Lâmpada para luminosidade baixa
        }
    }

    // Gerar valores a cada 5 segundos
    setInterval(gerarLuminosidade, 5000);
    gerarLuminosidade();
});
