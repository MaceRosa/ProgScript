const { createApp } = Vue;

createApp({
    data() {
        return {
            heroi: { vida: 100 },
            vilao: { vida: 100 },
            heroiDefende: false,
            vilaoDefende: false,
            eventos:[]
        };
    },
    methods: {
        addEvento(evento){
            this.eventos.push(evento)
            this.$nextTick(() =>{ //chama a func dentro de nextTick, onde nextTick é um metodo q permite executar um func apos a prox att do DOM(Modelo de Objeto de Documento)
                this.$refs.eventosLog.scrollTop = this.$refs.eventosLog.scrollHeight // coloca o scroll em baico automaticamente
            })
            
        },
        limparLog(){
            this.eventos = []
        },
        atacar(isHeroi) {
             if (isHeroi && this.heroi.vida > 0 && this.vilao.vida > 0) {
                if(!this.vilaoDefende) { //vilao  n defende
                    this.vilao.vida -= 10
                    this.addEvento("Obito atacou, Rock tomou 10 de dano!")
                } else { // vilao  defende
                    this.vilao.vida -= 2
                    this.vilaoDefende = false
                    this.addEvento("Obito atacou, Rock tomou 2 de dano!")
                }
                this.acaoVilao();
                if (this.vilao.vida <= 0) {
                    alert("Obito VENCEU!!! Rock virou brita")
                    this.limparLog()
                    this.vilao.vida = 100
                    this.heroi.vida = 100           
                }
            } else if (this.heroi.vida > 0 && this.vilao.vida > 0) {
                if(!this.heroiDefende) {// heroi n defende 
                    this.heroi.vida -= 20;
                    this.addEvento("The Rock atacou, Obito tomou 20 de dano!")
                } else {
                    this.heroi.vida -= 5; //heroi defende
                    this.heroiDefende = false
                    this.addEvento("Rock atacou, Obito tomou 5 de dano!")
                }
                if (this.heroi.vida <= 0) {
                    alert("Rock VENCEU!!! Obito foi esmagado")
                    this.limparLog()
                    this.vilao.vida = 100
                    this.heroi.vida = 100
                }
            }
        },
        defender(isHeroi) {// OBS: defender heroi defende dano do turno, do vilao defende dano do prox atq
            if (isHeroi && this.heroi.vida > 0 && this.vilao.vida > 0) {
                this.heroiDefende = true
                this.vilaoDefende = false
                this.acaoVilao()
                this.addEvento("Obito defendeu!")
            } else if (!isHeroi && this.heroi.vida > 0 && this.vilao.vida > 0) {
                this.vilaoDefende = true;
                this.heroiDefende = false
                this.addEvento("Rock defendeu!")
                
            }
        },
        pocao(isHeroi) {
            if (isHeroi &&  this.heroi.vida < 100 && this.heroi.vida > 0 && this.vilao.vida > 0) {
                const vidaAntes = this.heroi.vida
                const vidaRecuperada = (vidaAntes / 100) * 20
                this.heroi.vida += vidaRecuperada
                this.heroi.vida = Math.min(100, this.heroi.vida) // limita a vida a 100
                this.heroi.vida = Math.floor(this.heroi.vida) // arredonda a vida pra visualizar
                this.acaoVilao();
                this.addEvento(`Obito se curou, recuperando ${parseInt(vidaRecuperada)} de vida!`)
                this.heroiDefende = false
                this.vilaoDefende = false
            } else if (this.vilao.vida < 100 && this.heroi.vida > 0 && this.vilao.vida > 0) {
                const vidaAntes = this.vilao.vida
                const vidaRecuperada = (vidaAntes / 100) * 10
                this.vilao.vida += vidaRecuperada
                this.vilao.vida = Math.min(100, this.vilao.vida)
                this.vilao.vida = Math.floor(this.vilao.vida)
                this.addEvento(`Rock se curou, recuperando ${parseInt(vidaRecuperada)} de vida!`)
                this.heroiDefende = false
                this.vilaoDefende = false
            }
            if (isHeroi && this.heroi.vida >= 100){ // msg de vida full
                    this.addEvento('Obito está com vida máxima.')
                    this.acaoVilao()
            }else if (this.vilao.vida >= 100){
                    this.addEvento('Rock está com vida máxima.')
                }
        },
        correr(isHeroi) {
            const chanceDeFuga = Math.random()
            if (isHeroi && this.heroi.vida > 0 && this.vilao.vida > 0 && chanceDeFuga < 0.8) {
                this.heroi.vida = 100
                this.vilao.vida = 100
                alert("Obito correu da luta")
                this.limparLog()
            } else if (!isHeroi && this.heroi.vida > 0 && this.vilao.vida > 0 && chanceDeFuga < 0.2) {
                this.vilao.vida = 100
                this.heroi.vida = 100
                alert("Rock fugiu da batalha")
                this.limparLog()
            }
            if(isHeroi && this.heroi.vida > 0 && this.vilao.vida > 0 && chanceDeFuga > 0.8){
                this.addEvento("COVARDE!!! Obito tentou correr")
                this.acaoVilao()
            }else if (!isHeroi && this.heroi.vida > 0 && this.vilao.vida > 0 && chanceDeFuga > 0.2) {
                this.addEvento("COVARDE!!! Rock tentou correr")
            }
           
        },
        acaoVilao() {
            const acoes = ['atacar', 'defender', 'pocao', 'correr'];
            const acaoAleatoria = acoes[Math.floor(Math.random() * acoes.length)];
            this[acaoAleatoria](false);
        }
    }
}).mount("#app");

