class PasswordGenerator{
    constructor(){
        this.caracteres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*-_,.~";
    }

    generate(length){
        if(!length || isNaN(length) || length < 8 || length > 50){
            throw new Error("Por favor, insira um número válido para o tamanho da senha. O tamanho deve ser entre 8 e 50 caracteres.");

        }

         let password = ""

         for(let i = 0; i < length; i++){

           
            const randomIndex = Math.floor(Math.random() * this.caracteres.length)
            password += this.caracteres[randomIndex]
         }

         return password
    }
}

class ClipboardManager{
    static copyToClipboard(text){
        return navigator.clipboard.writeText(text)
    }
}

class Modal{
    constructor(){
        this.modal = document.getElementById("modal")
        this.modalMessage = document.getElementById("modal-message")
        this.btnClose = document.getElementById("modal-close")

        this.btnClose.addEventListener("click", ()=> this.close());

        window.addEventListener("click", (event)=> {
            if(event.target === this.modal){
                this.close()
            }
        })

    }

    open(message){
            this.modal.style.display = "flex"
            this.modal.classList.add("show")
            this.modalMessage.textContent = message
    }

    close(){
        this.modal.classList.remove("show")

        setTimeout(()=> {
            this.modal.style.display = "none"
        }, 300)
       
    }
}


class App{
    constructor(){
        this.passwordGenerator = new PasswordGenerator();
        this.modal = new Modal()

        this.inputLength = document.getElementById("pass-length")
        this.passwordDisplay = document.getElementById("password-display")
        this.formGenerate = document.getElementById("formGenerate")
        this.btnCopy = document.getElementById("copy-pass")

        this.formGenerate.addEventListener("submit", (e)=> {
            e.preventDefault() // interromper o envio
            this.generatePassword() // gerar a senha
        })

        this.btnCopy.addEventListener("click", ()=> this.copyPassword())
    }

    generatePassword(){
        try{
            const length = parseInt(this.inputLength.value.trim(), 10) // string para decimal b10

            const password = this.passwordGenerator.generate(length)

            this.passwordDisplay.textContent = password
            this.inputLength.value = ""
            this.btnCopy.style.display = "block"
            this.modal.open("Senha gerada com sucesso!")

        } catch(error){
            this.modal.open(error.message)
        }
    }

    copyPassword(){
        const password = this.passwordDisplay.textContent
        if(password){
            ClipboardManager.copyToClipboard(password)
            .then(() => this.modal.open("Senha copiada!"))
            .catch(() => this.modal.open("Erro ao copiar a senha!"));
        } else{
            this.modal.open("Não há uma senha para copiar!")
        }
    }

    
}


// Inicializando nosso APP

document.addEventListener("DOMContentLoaded", ()=> new App())



