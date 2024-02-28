class CalcController {
    constructor() {
        // Seleciona os elementos HTML com os IDs específicos
        this._operation = [];
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        // Inicializa a data atual e o local
        this._currentData = new Date();
        this._locale = 'pt-BR'; // Defina o local aqui
        // Inicializa a aplicação
        this.initialize();
    }

    // Getter para acessar o valor do display
    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }

    // Setter para definir o valor do display
    set displayCalc(value) {
        this._displayCalcEl.innerHTML = value;
    }

    // Getter para acessar a data atual
    get currentData() {
        return new Date();
    }

    // Setter para definir o valor da data atual
    set currentData(value) {
        this._currentData = value;
    }

    // Getter para acessar o valor do elemento de tempo (hora)
    get displayTime() {
        return this._timeEl.innerHTML;
    }

    // Setter para definir o valor do elemento de tempo (hora)
    set displayTime(value) {
        this._timeEl.innerHTML = value;
    }

    // Getter para acessar o valor do elemento de data
    get displayDate() {
        return this._dateEl.innerHTML;
    }

    // Setter para definir o valor do elemento de data
    set displayDate(value) {
        this._dateEl.innerHTML = value;
    }

    clearAll() {
        this._operation = [];
    }

    clearEntry() {
        this._operation.pop();
    }

    setError() {
        this.displayCalc = "Error";
    }

     getLestOperation(){
       return this._operation[this._operation.length-1];

     }
     isoperator(value){

        return (['+','-','*','%','/'].indexOf(value) > -1);
          
     }
     addOperator(value) {
        if (isNaN(this.getLestOperation())) {
            // Se a última operação for uma string (um operador)
            if (this.isoperator(value)) {
                // Se o valor atual também for um operador, substitua o último operador
                this._operation[this._operation.length - 1] = value;
            } else {
                // Se o valor atual não for um número nem um operador, imprima-o para depuração
                console.log(value);
            }
        } else {
            // Se a última operação for um número, concatene o valor atual com o último número
            let newValue = this.getLestOperation().toString() + value.toString();
            this._operation[this._operation.length - 1] = newValue;
        }
        console.log(this._operation);
    }

    execBtn(value) {
        switch (value) {
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'porcento':
                // Adicione a lógica para porcentagem aqui
                this.addOperator('%');
                break;
            case 'soma':
                // Adicione a lógica para soma aqui
                this.addOperator('+');
                break;
            case 'subitracao':
                // Adicione a lógica para subtração aqui
                this.addOperator('-');
                break;
            case 'divisao':
                // Adicione a lógica para divisão aqui
                this.addOperator('/');
                break;
            case 'multiplicacao':
                // Adicione a lógica para multiplicação aqui
                this.addOperator('*');
                break;
            case 'igual':
                // Adicione a lógica para igual aqui
               
                break;           
            case 'ponto':
                // Adicione a lógica para Ponto aqui
             
                break;
            //condiçoes para numeros dentro deo arrey
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperator(parseInt(value));
                break;         
                        
            default:
                this.setError();
                break;
        }
    }

    // Método para inicializar elementos HTML
    initialize() {
        setInterval(() => {
            // Método para chamar a hora em tempo real e a data atual 
            this.setDisplayDateTime();
        }, 1000);
        // Seleciona todos os botões e adiciona eventos a eles
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");
        // Adiciona eventos de clique e arrasto a cada botão
        buttons.forEach((btn, index) => {
            this.addEventListenerAll(btn, 'click drag', e => {
                let textBtn = btn.className.baseVal.replace("btn-", "");
                this.execBtn(textBtn); // Chama execBtn com o texto do botão
            });
        });
    }

    // Método para atualizar a data e hora no display
    setDisplayDateTime() {
        // Define a data no formato local específico
        this.displayDate = this.currentData.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentData.toLocaleTimeString(this._locale);
    }

    // Método para adicionar múltiplos eventos a um elemento
    addEventListenerAll(element, events, fn) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        });

        element.style.cursor = "pointer"; // Defina o cursor aqui, se necessário
    }
}
