const btnGerarBaralho = document.getElementById('gerar-baralho')
const tirarCartasBaralho = document.getElementById('tirar-cartas')
const containerCartas = document.getElementById('imgs-container')
const cartasRestantes = document.getElementById('cartas-restantes')
let baralho

btnGerarBaralho.addEventListener('click', ()=>{
    containerCartas.innerHTML = ''
    criarBaralho()
    alert('Novo baralho gerado')
})

tirarCartasBaralho.addEventListener('click', ()=>{
    const selecaoDeQtd = document.getElementById('qtd-cartas')

    if (baralho && selecaoDeQtd.value != 0){
        mostrarCartasTiradas(selecaoDeQtd.value)
    } else if(baralho){
        alert('Selecione a quantidade de cartas')
    }else{
        alert('Você não pode tirar cartas sem gerar um bralho')
    }

})

async function criarBaralho(){
    const resposta = await fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    baralho = await resposta.json()
    cartasRestantes.innerHTML = `Cartas sobrando: 52`
}


async function tirarCartas(deck_id, deck_countValue){
    const resposta =  await fetch(`https://www.deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${deck_countValue}`)
    return await resposta.json()
}

async function mostrarCartasTiradas(selectValue){


    if(baralho.remaining == 0){
        alert('Não sobrou mais nenhuma carta. Crie um novo baralho!')
    }
    else if(baralho.remaining < selectValue){
        alert(`Tire uma quantidade menor ou igual a ${baralho.remaining}`)
    }else{

        containerCartas.innerHTML = ''

        const deckAtualizado = await tirarCartas(baralho.deck_id, selectValue)
        const cartasTiradas = deckAtualizado.cards

        for(let carta of cartasTiradas){
            containerCartas.innerHTML += `
                <div class="card-box">
                    <img src="${carta.image}" alt="carta">
                </div>
            `
        }

        baralho.remaining = baralho.remaining - selectValue
        cartasRestantes.innerHTML = `Cartas sobrando: ${baralho.remaining}`
    }

    
}