import { getCSS, tickConfig } from "./common.js";

async function quantidadeUsuariosPorRede() {
    const url = 'https://raw.githubusercontent.com/guilhermeonrails/api/main/numero-usuarios.json';
    
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Erro ao buscar dados: ${res.statusText}`);
        }

        const dados = await res.json();
        const nomeDasRedes = Object.keys(dados);
        const quantidadeDeUsuarios = Object.values(dados);

        const data = [{
            x: nomeDasRedes,
            y: quantidadeDeUsuarios,
            type: 'bar',
            marker: {
                color: getCSS('--primary-color'),
            },
        }];

        const layout = {
            plot_bgcolor: getCSS('--bg-color'),
            paper_bgcolor: getCSS('--bg-color'),
            title: {
                text: 'Redes Sociais com Mais Usuários',
                x: 0,
                font: {
                    color: getCSS('--primary-color'),
                    size: 30,
                    family: getCSS('--font'),
                },
            },
            xaxis: {
                tickfont: tickConfig,
                title: {
                    text: 'Nome das Redes',
                    font: {
                        color: getCSS('--secondary-color'),
                    },
                },
            },
            yaxis: {
                tickfont: tickConfig,
                title: {
                    text: 'Bilhões de Usuários Ativos',
                    font: {
                        color: getCSS('--secondary-color'),
                    },
                },
            },
        };

        const grafico = document.createElement('div');
        grafico.className = 'grafico';
        document.getElementById('graficos-container').appendChild(grafico);
        Plotly.newPlot(grafico, data, layout);
    } catch (error) {
        console.error('Erro ao gerar o gráfico:', error);
        const erroMensagem = document.createElement('div');
        erroMensagem.textContent = 'Erro ao carregar os dados do gráfico. Tente novamente mais tarde.';
        erroMensagem.style.color = getCSS('--secondary-color');
        erroMensagem.style.textAlign = 'center';
        document.getElementById('graficos-container').appendChild(erroMensagem);
    }
}

quantidadeUsuariosPorRede();