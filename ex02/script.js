const app = Vue.createApp({
    data() {
        return {
            inputs: {
                capitalInicial: { label: "Capital inicial (em reais):", value: 1000, placeholder: "Ex: 1000" },
                aporte: { label: "Aporte periódico:", value: 200, placeholder: "Ex: 200" },
                tempo: { label: "Tempo de aplicação (em meses):", value: 24, placeholder: "Ex: 24" },
                taxaAplicacao: { label: "Taxa de aplicação (dada em porcentagem):", value: 5, placeholder: "Ex: 5" },
                ipca: { label: "Taxa estimada para o IPCA:", value: 3, placeholder: "Ex: 3" }
            },
            montanteFinalAplicacao: 0,
            montanteFinalInflacao: 0,
            lucroFinal: 0,
            chart: null,
        };
    },
    methods: {
        calcularInvestimento() {
            const { capitalInicial, aporte, tempo, taxaAplicacao, ipca } = this.inputs;
    
            const initialCapital = capitalInicial.value;
            const periodicAporte = aporte.value;
            const duration = tempo.value;
            const rateAplicacao = taxaAplicacao.value / 100;
            const inflationRate = ipca.value / 100;
    
            let montanteComAplicacao = [initialCapital];
            let montanteComInflacao = [initialCapital];
            let labels = [];
    
            for (let i = 1; i <= duration; i++) {
                labels.push(`Mês ${i}`);
    
                const novoMontanteAplicacao = montanteComAplicacao[i - 1] * (1 + rateAplicacao / 12) + periodicAporte;
                montanteComAplicacao.push(novoMontanteAplicacao);
    
                const novoMontanteInflacao = montanteComInflacao[i - 1] * (1 + inflationRate / 12) + periodicAporte;
                montanteComInflacao.push(novoMontanteInflacao);
            }
    
            this.montanteFinalAplicacao = montanteComAplicacao[montanteComAplicacao.length - 1].toFixed(2);
            this.montanteFinalInflacao = montanteComInflacao[montanteComInflacao.length - 1].toFixed(2);
            this.lucroFinal = (this.montanteFinalAplicacao - initialCapital - (periodicAporte * duration)).toFixed(2);
    
            this.renderChart(labels, montanteComAplicacao, montanteComInflacao);
        },
        renderChart(labels, montanteComAplicacao, montanteComInflacao) {
            const ctx = document.getElementById('investmentChart').getContext('2d');

            if (this.chart) {
                this.chart.destroy();
            }

            this.chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Montante com Taxa de Aplicação',
                            data: montanteComAplicacao,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            fill: false,
                        },
                        {
                            label: 'Montante com IPCA',
                            data: montanteComInflacao,
                            borderColor: 'rgba(255, 99, 132, 1)',
                            fill: false,
                        }
                    ]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Tempo (Meses)'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Montante (R$)'
                            },
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }
});

app.mount('#app');