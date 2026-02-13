/* ===========================
   CONFIGURAÇÕES
=========================== */
const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1471684006901842001/vQFiUpag8t2xCAR7pzx0Al_gepXby2ZrY3p1jeVDSAhUynfXwxOE36l7guhsYwO1g0yc";

/* ===========================
   FUNÇÕES AUXILIARES
=========================== */
function gerarID() {
    return "REL-" + Date.now();
}

function agora() {
    return new Date().toLocaleString("pt-BR");
}

/* ===========================
   CATEGORIAS DE CRIMES
=========================== */
const categorias = [
    {
        titulo:"ITENS ILEGAIS – ART. 2º",
        dados:[
            {num:"2.2", nome:"Drogas uso próprio", meses:0, multa:6250, fianca:0},
            {num:"2.3", nome:"Dinheiro sujo < 100k", meses:0, multa:6250, fianca:0},
            {num:"2.4", nome:"Algemas/capuz/keycard", meses:6, multa:6250, fianca:6250},
            {num:"2.5", nome:"Masterpick/lockpick", meses:6, multa:6250, fianca:6250},
            {num:"2.6", nome:"Colete balístico", meses:13, multa:12500, fianca:12500},
            {num:"2.7", nome:"Veículo clonado", meses:13, multa:12500, fianca:12500},
            {num:"2.8", nome:"Dinheiro sujo ≥100k", meses:13, multa:12500, fianca:12500},
            {num:"2.9", nome:"Itens ilegais", meses:19, multa:18750, fianca:18750},
            {num:"2.10", nome:"Tráfico de drogas", meses:19, multa:18750, fianca:18750},
            {num:"2.11", nome:"Munição ilegal", meses:19, multa:18750, fianca:18750}
        ]
    },
    {
        titulo:"CRIMES DE TRÂNSITO – ART. 1º",
        dados:[
            {num:"1.1", nome:"Alta velocidade", meses:0, multa:3125, fianca:0},
            {num:"1.2", nome:"Estacionar proibido", meses:0, multa:12500, fianca:0},
            {num:"1.3", nome:"Abandono veículo", meses:0, multa:12500, fianca:0},
            {num:"1.4", nome:"Fila dupla", meses:0, multa:12500, fianca:0},
            {num:"1.5", nome:"Som alto", meses:0, multa:12500, fianca:0},
            {num:"1.6", nome:"Bloquear via", meses:0, multa:12500, fianca:0},
            {num:"1.7", nome:"Manobras perigosas", meses:6, multa:12500, fianca:12500},
            {num:"1.8", nome:"Direção perigosa", meses:6, multa:12500, fianca:12500},
            {num:"1.9", nome:"Dirigir sob efeito", meses:6, multa:12500, fianca:12500}
        ]
    },
    {
        titulo:"CRIMES INAFIANÇÁVEIS – ART. 4º",
        dados:[
            {num:"4.1", nome:"Sequestro", meses:50, multa:50000, fianca:50000},
            {num:"4.2", nome:"Porte arma alto calibre", meses:50, multa:50000, fianca:50000},
            {num:"4.3", nome:"Tráfico de armas", meses:50, multa:50000, fianca:50000},
            {num:"4.4", nome:"Tráfico de munições", meses:50, multa:50000, fianca:50000},
            {num:"4.5", nome:"Desacato servidor público", meses:50, multa:50000, fianca:50000},
            {num:"4.6", nome:"Abuso de poder", meses:63, multa:62500, fianca:62500},
            {num:"4.7", nome:"Assalto banco/joalheria", meses:75, multa:75000, fianca:75000},
            {num:"4.8", nome:"Corrupção passiva", meses:75, multa:75000, fianca:75000},
            {num:"4.9", nome:"Latrocínio", meses:75, multa:75000, fianca:75000},
            {num:"4.10", nome:"Homicídio doloso", meses:75, multa:75000, fianca:75000}
        ]
    }
];

/* ===========================
   GERAR CHECKBOXES
=========================== */
const div = document.getElementById("crimesContainer");
categorias.forEach((cat, ci) => {
    let html = `<div class="categoria"><h3>${cat.titulo}</h3>`;
    cat.dados.forEach((c,i) => {
        html += `<div class="crime">
            <input type="checkbox" onchange="calcular()" data-cat="${ci}" data-i="${i}">
            ${c.num} - ${c.nome} (${c.meses} meses)
        </div>`;
    });
    html += "</div>";
    div.innerHTML += html;
});

/* ===========================
   FUNÇÃO UNICO CHECKBOX
=========================== */
function unico(el){
    document.getElementsByName(el.name).forEach(x=>{if(x!=el)x.checked=false});
}

/* ===========================
   CALCULO PENA
=========================== */
function calcular() {
    let meses=0, multa=0, fianca=0;

    document.querySelectorAll('#crimesContainer input:checked').forEach(el => {
        let c = categorias[el.dataset.cat].dados[el.dataset.i];
        meses += c.meses;
        multa += c.multa;
        fianca += c.fianca;
    });

    let red=0;
    if(document.querySelector('[name=reu][value=sim]')?.checked) red+=0.05;
    if(document.querySelector('[name=bom][value=sim]')?.checked) red+=0.10;
    if(document.querySelector('[name=ficha][value=sim]')?.checked) red+=0.05;

    meses = Math.round(meses - (meses * red));

    document.getElementById("meses").innerText = meses;
    document.getElementById("multa").innerText = multa;
    document.getElementById("fianca").innerText = fianca;
    document.getElementById("total").innerText = multa+fianca;
}

/* ===========================
   GERAR RELATÓRIO + ENVIAR + DOWNLOAD
=========================== */
function gerarRelatorio(){
    const botao = document.getElementById("btnAplicar");
    if(botao.disabled) return;
    botao.disabled=true;
    botao.innerText="PROCESSANDO...";

    const idRelatorio = gerarID();

    const lista = Array.from(document.querySelectorAll('#crimesContainer input:checked'))
        .map(el => {
            const c = categorias[el.dataset.cat].dados[el.dataset.i];
            return `${c.num} - ${c.nome}`;
        }).join("\n");

    // Dados do relatório
    const policial = document.getElementById("policial").value;
    const idpolicial = document.getElementById("idpolicial").value;
    const suspeito = document.getElementById("suspeito").value;
    const idsuspeito = document.getElementById("idsuspeito").value;
    const organizacao = document.getElementById("organizacao").value;
    const observacao = document.getElementById("obs").value || "Sem observações.";

    document.getElementById("listaCrimes").innerText = lista || "Nenhuma infração registrada.";

    document.getElementById("dados").innerHTML = `
        <div class="linha"><b>ID:</b> ${idRelatorio}</div>
        <div class="linha"><b>Data/Hora:</b> ${agora()}</div>
        <div class="linha"><b>Policial:</b> ${policial} (${idpolicial})</div>
        <div class="linha"><b>Organização:</b> ${organizacao}</div>
        <div class="linha"><b>Infrator:</b> ${suspeito} (${idsuspeito})</div>
        <div class="linha totalBox"><b>Meses Totais:</b> ${document.getElementById("meses").innerText}</div>
        <div class="linha totalBox"><b>Total Financeiro:</b> $${document.getElementById("total").innerText}</div>
        <div class="linha selo" style="margin-top:10px; font-weight:bold; color:#facc15;">🔹 Protocolo Oficial: ${idRelatorio}</div>
    `;

    document.getElementById("observacaoFinal").innerText = observacao;
    document.getElementById("resultadoFinal").style.display="block";

    // Renderiza e envia para Discord antes do download
    html2canvas(document.getElementById("resultadoFinal"), {scale:2}).then(canvas=>{
        canvas.toBlob(function(blob){
            // Envio Discord
            const formData = new FormData();
            formData.append("file", blob, "relatorio.png");
            formData.append("payload_json", JSON.stringify({
                username:"Sistema Penal",
                embeds:[{
                    title:"🚨 RELATÓRIO PENAL",
                    color:16711680,
                    fields:[
                        {name:"ID",value:idRelatorio,inline:true},
                        {name:"Data/Hora",value:agora(),inline:true},
                        {name:"Policial",value:`${policial} (${idpolicial})`,inline:true},
                        {name:"Organização",value:organizacao,inline:true},
                        {name:"Infrator",value:`${suspeito} (${idsuspeito})`},
                        {name:"Infrações",value:lista||"Nenhuma"},
                        {name:"Meses",value:document.getElementById("meses").innerText,inline:true},
                        {name:"Total",value:"$"+document.getElementById("total").innerText,inline:true}
                    ]
                }]
            }));
            fetch(DISCORD_WEBHOOK,{method:"POST",body:formData});
        });

        // Download automático
        const link = document.createElement("a");
        link.download = `${suspeito || "INDIVIDUO"}_${idsuspeito || "ID"}_relatorio.png`;
        link.href = canvas.toDataURL("image/png");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Botão EFETUADO
        botao.innerText="EFETUADO";
        botao.style.background="#28a745";
        botao.disabled=false;
    });
}
