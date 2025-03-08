// Conectar ao broker MQTT
const broker = "wss://broker.hivemq.com:8884/mqtt";  // Broker público
const topic = "UFCAT/GRUPO1/sensor";  // Tópico a ser assinado

const client = mqtt.connect(broker);

// Quando conectar ao broker
client.on("connect", () => {
    console.log("Conectado ao MQTT!");
    client.subscribe(topic, (err) => {
        if (!err) {
            console.log(`Inscrito no tópico: ${topic}`);
        }
    });
});

// Dados do gráfico
const labels = [];
const dados = [];

const ctx = document.getElementById("grafico").getContext("2d");
const grafico = new Chart(ctx, {
    type: "line",
    data: {
        labels: labels,
        datasets: [{
            label: "Luminosidade",
            borderColor: "blue",
            backgroundColor: "rgba(0,0,255,0.2)",
            data: dados
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: { display: true, title: { display: true, text: "Tempo" } },
            y: { display: true, title: { display: true, text: "Luminosidade" } }
        }
    }
});

// Quando receber uma mensagem MQTT
client.on("message", (topic, message) => {
    console.log(`Recebido: ${message.toString()}`);

    const valor = parseFloat(message.toString());  // Converter para número
    if (!isNaN(valor)) {
        labels.push(new Date().toLocaleTimeString());
        dados.push(valor);

        if (labels.length > 10) {  // Manter apenas 10 valores no gráfico
            labels.shift();
            dados.shift();
        }

        grafico.update();  // Atualizar gráfico
    }
});
