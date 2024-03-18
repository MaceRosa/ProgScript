const { createApp } = Vue

createApp({
    data() {
        return {
            display: '0',
            numeroAtual: null,
            numeroAnterior: null,
            operador: null,
        }
    },
    methods: {
        lidarBotao(botao) {
            switch (botao) {
                case "+":
                case "-":
                case "*":
                case "/":
                    this.lidarOperador(botao)
                    break
                case ".":
                    this.lidarDecimal()
                    break
                case "=":
                    this.lidarIgual()
                    break
                case "AC":
                    this.lidarClear()
                    break
                default:
                    this.lidarNumero(botao)
            }
        },
        lidarOperador(operador) {
            this.operador = operador
            this.numeroAnterior = parseFloat(this.display) //converter string em decimal
            this.display= ' ' //limpa o display dps de escolher o operador
        },
        lidarDecimal() {
            if (this.display.indexOf(".") === -1){
                this.display += "."
            }/*indexOf retorna o índice de primeira ocorrência de um valor X de uma string, se não ele retorna -1
                ent aqui o indexOF vai procurar '.' caso não ache ele vai add o '.' ao final da string
             */
        },
        lidarIgual() {
            this.numeroAtual = parseFloat(this.display)
            if (this.operador == '/') {
                if (this.numeroAtual !== 0) {
                    this.display = this.numeroAnterior / this.numeroAtual
                } else {
                    this.display ="Erro: Divisão por zero"
                }
            } else if (this.operador == '-') {
                this.display = this.numeroAnterior - this.numeroAtual
            } else if (this.operador == '+') {
                this.display = this.numeroAnterior + this.numeroAtual
            }else if (this.operador == '*'){
                this.display = this.numeroAnterior * this.numeroAtual
            }
            this.destaque = { backgroundColor: 'green' }//usado como lembrete para limpar o display antes da prox operação
        },
        lidarClear() {
            this.display = '0'
            this.numeroAtual =null
            this.numeroAnterior = null
            this.operador = null
            this.destaque = null
        },
        lidarNumero(num) {
            if (this.display === '0'){
                this.display = num
            }else{
                this.display += num
            }
        }
    }
}).mount("#app")