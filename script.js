const caixaPerguntas = document.getElementById("caixa-perguntas");
const caixaAlternativas = document.getElementById("caixa-alternativas");
const caixaResultado = document.getElementById("caixa-resultado");
const textoResultado = document.getElementById("texto-resultado");
const badgePerfil = document.getElementById("badge-perfil");
const barraProgresso = document.getElementById("barra-progresso");
const btnReiniciar = document.getElementById("btn-reiniciar");

const autor = "Henrique Martins De Oliveira";

const perguntas = [
    {
        enunciado: "Assim que saiu da escola você se depara com uma nova tecnologia: um chat que responde todas as dúvidas, gera imagens e áudios hiper-realistas. Qual o seu primeiro pensamento?",
        alternativas: [
            {
                texto: "Isso é assustador! Pode ser perigoso se usado sem limites.",
                afirmacao: "Sua jornada começou com cautela e preocupação com os limites éticos da tecnologia.",
                pontosIA: 0
            },
            {
                texto: "Isso é maravilhoso! As possibilidades de criação são infinitas.",
                afirmacao: "Sua jornada começou com entusiasmo e abertura total para a inovação.",
                pontosIA: 1
            }           
        ]
    },
    {
        enunciado: "Sua professora de tecnologia pediu um trabalho sobre o impacto da IA na educação. Qual atitude você toma?",
        alternativas: [
            {
                texto: "Utilizo ferramentas de IA para sintetizar conceitos difíceis e organizar a estrutura da pesquisa.",
                afirmacao: "Você adotou a IA como um copiloto para otimizar sua aprendizagem e economizar tempo.",
                pontosIA: 1
            },
            {
                texto: "Escrevo com base em debates, livros e reflexões próprias para manter a originalidade intacta.",
                afirmacao: "Você priorizou o esforço autoral e o pensamento crítico tradicional.",
                pontosIA: 0
            }
        ]
    },
    {
        enunciado: "Em um debate sobre o impacto da IA nos empregos do futuro, como você defende o seu ponto de vista?",
        alternativas: [
            {
                texto: "Defendo que a automação precisa de regulamentação para proteger os trabalhadores vulneráveis.",
                afirmacao: "No debate social, focou na empatia humana e na necessidade de segurança do trabalho.",
                pontosIA: 0
            },
            {
                texto: "Defendo que a IA criará novas profissões e aumentará o potencial produtivo humano.",
                afirmacao: "No debate social, defendeu a evolução contínua do mercado e a adaptação tecnológica.",
                pontosIA: 1
            }
        ]
    },
    {
        enunciado: "Para ilustrar sua visão sobre a IA, você precisa entregar uma arte visual. Como decide produzi-la?",
        alternativas: [
            {
                texto: "Desenho e edito manualmente a imagem do zero em um software tradicional.",
                afirmacao: "Sua expressão artística permaneceu artesanal e puramente autoral.",
                pontosIA: 0
            },
            {
                texto: "Utilizo um gerador de imagens por IA ajustando comandos detalhados (prompts).",
                afirmacao: "Sua expressão artística explorou a sinergia entre prompts e inteligência gerativa.",
                pontosIA: 1
            }
        ]
    },
    {
        enunciado: "Em um trabalho em grupo de Biologia, um colega gerou todo o texto usando IA sem ao menos revisar o conteúdo. O que você faz?",
        alternativas: [
            {
                texto: "Alertamos o grupo de que a IA comete erros e precisamos revisar e reescrever com nossas palavras.",
                afirmacao: "No fim, provou que a revisão humana e o rigor crítico são indispensáveis.",
                pontosIA: 0
            },
            {
                texto: "Aceitamos o texto como está, pois dominar a escrita de comandos já é contribuição suficiente.",
                afirmacao: "No fim, optou por delegar a execução textual inteiramente à automação.",
                pontosIA: 1
            }
        ]
    }
];

let atual = 0;
let historiaFinal = [];
let pontuacaoIA = 0;

function iniciaJogo() {
    atual = 0;
    historiaFinal = [];
    pontuacaoIA = 0;
    caixaResultado.classList.add("escondido");
    caixaPerguntas.classList.remove("escondido");
    caixaAlternativas.classList.remove("escondido");
    mostraPergunta();
}

function mostraPergunta() {
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }
    
    const porcentagem = (atual / perguntas.length) * 100;
    barraProgresso.style.width = `${porcentagem}%`;

    const perguntaAtual = perguntas[atual];
    
    caixaPerguntas.classList.remove("faded-in");
    void caixaPerguntas.offsetWidth;
    caixaPerguntas.classList.add("faded-in");

    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.textContent = "";
    
    mostraAlternativas(perguntaAtual);
}

function mostraAlternativas(pergunta) {
    for (const alternativa of pergunta.alternativas) {
        const botao = document.createElement("button");
        botao.classList.add("btn-opcao", "faded-in");
        botao.textContent = alternativa.texto;
        botao.addEventListener("click", () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botao);
    }
}

function respostaSelecionada(opcao) {
    historiaFinal.push(opcao.afirmacao);
    pontuacaoIA += opcao.pontosIA;
    atual++;
    mostraPergunta();
}

function mostraResultado() {
    barraProgresso.style.width = "100%";
    caixaPerguntas.classList.add("escondido");
    caixaAlternativas.classList.add("escondido");
    caixaResultado.classList.remove("escondido");
    caixaResultado.classList.add("faded-in");

    let perfil = "";
    if (pontuacaoIA >= 4) {
        perfil = "🚀 Perfil: Entusiasta & Pioneiro Tech";
    } else if (pontuacaoIA >= 2) {
        perfil = "⚖️ Perfil: Moderado & Estratégico";
    } else {
        perfil = "🛡️ Perfil: Defensor do Humanismo Crítico";
    }

    badgePerfil.textContent = perfil;
    
    // Adiciona o seu crédito diretamente no resultado
    textoResultado.innerHTML = `
        <strong>Sua trajetória calculada pelo projeto de ${autor}:</strong><br><br>
        ${historiaFinal.join("<br><br>")}
    `;
}

btnReiniciar.addEventListener("click", iniciaJogo);

iniciaJogo();