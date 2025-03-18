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
        maintainAspectRatio: false,
        scales: {
            x: { display: true, title: { display: true, text: "Tempo" } },
            y: { 
                display: true, 
                title: { display: true, text: "Luminosidade" },
                suggestedMin: 0,
                suggestedMax: 1200
            }
        },
        plugins: {
            beforeDraw: (chart) => {
                const ctx = chart.ctx;
                const chartArea = chart.chartArea;
                ctx.save();

                // Define cor vermelha clara para área abaixo de 1000
                ctx.fillStyle = "rgba(216, 62, 62, 0.59)";
                const yThreshold = chart.scales.y.getPixelForValue(1000);
                ctx.fillRect(chartArea.left, yThreshold, chartArea.right - chartArea.left, chartArea.bottom - yThreshold);

                ctx.restore();
            }
        }
    }
});

// Função para gerar valores aleatórios de luminosidade
function gerarLuminosidade() {
    const valor = Math.floor(Math.random() * 1024);
    labels.push(new Date().toLocaleTimeString());
    dados.push(valor);

    if (labels.length > 10) {
        labels.shift();
        dados.shift();
    }

    grafico.update();
}

// Gerar valores a cada 5 segundos
setInterval(gerarLuminosidade, 5000);
gerarLuminosidade();
