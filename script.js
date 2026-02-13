const DISCORD_WEBHOOK = "COLE_SEU_WEBHOOK_AQUI";

function gerarID(){
return "REL-"+Date.now();
}

function agora(){
return new Date().toLocaleString("pt-BR");
}

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

const div=document.getElementById("crimesContainer");

categorias.forEach((cat,ci)=>{
let html=`<div class="categoria"><h3>${cat.titulo}</h3>`;
cat.dados.forEach((c,i)=>{
html+=`<div class="crime">
<input type="checkbox" onchange="calcular()" data-cat="${ci}" data-i="${i}">
${c.num} - ${c.nome} (${c.meses} meses)
</div>`;
});
html+="</div>";
div.innerHTML+=html;
});

function unico(el){
document.getElementsByName(el.name).forEach(x=>{if(x!=el)x.checked=false});
}

function calcular(){

let meses=0,multa=0,fianca=0;

document.querySelectorAll('#crimesContainer input:checked').forEach(el=>{
let c=categorias[el.dataset.cat].dados[el.dataset.i];
meses+=c.meses;
multa+=c.multa;
fianca+=c.fianca;
});

let red=0;

if(document.querySelector('[name=reu][value=sim]')?.checked) red+=0.05;
if(document.querySelector('[name=bom][value=sim]')?.checked) red+=0.10;
if(document.querySelector('[name=ficha][value=sim]')?.checked) red+=0.05;

meses=Math.round(meses-(meses*red));

document.getElementById("meses").innerText=meses;
document.getElementById("multa").innerText=multa;
document.getElementById("fianca").innerText=fianca;
document.getElementById("total").innerText=multa+fianca;

}
