// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAaUVpZ2D4n6hZfisw20GfSFCksZtTD-1s",
    authDomain: "luminosidade2.firebaseapp.com",
    databaseURL: "https://luminosidade2-default-rtdb.firebaseio.com",
    projectId: "luminosidade2",
    storageBucket: "luminosidade2.appspot.com",
    messagingSenderId: "285333604111",
    appId: "1:285333604111:web:13b6f0b25e392d5000a07a"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const sensorDataRef = ref(database, 'UsersData/LbrlvsMV4Cdic3doE8ORNoSvnFn1/readings'); // Altere para o seu caminho no Firebase

// Elementos da interface
const body = document.body;
const lampada = document.getElementById("lampada");

// Função para atualizar a interface com base na luminosidade
function atualizarInterface(luminosidade) {
    console.log(`Luminosidade atual: ${luminosidade}`); // Exibe o valor no console

    // Alterar o fundo e a imagem da lâmpada com base no valor da luminosidade
    if (luminosidade > 1000) {
        console.log("Luminosidade alta: alterando para paisagem clara.");
        body.style.backgroundImage = "url('imagens/paisagem_clara.webp')";
        lampada.src = "imagens/desligada.png"; // Lâmpada para luminosidade alta
    } else {
        console.log("Luminosidade baixa: alterando para paisagem escura.");
        body.style.backgroundImage = "url('imagens/paisagem_escura.jpg')"; // Fundo para luminosidade baixa
        lampada.src = "imagens/ligada.png"; // Lâmpada para luminosidade baixa
    }
}

// Ler dados do Firebase
onValue(sensorDataRef, (snapshot) => {
    const data = snapshot.val();

    if (data) {
        // Obter o último valor de luminosidade
        const lastTimestamp = Object.keys(data).pop(); // Pega a última chave (timestamp)
        const lastReading = data[lastTimestamp].luminosity; // Pega o último valor de luminosidade

        // Atualizar a interface com o último valor
        atualizarInterface(parseFloat(lastReading));
    } else {
        console.log("Nenhum dado encontrado no Firebase.");
    }
});