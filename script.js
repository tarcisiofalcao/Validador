let $validate = {
    handleSubmit:(event)=>{
        event.preventDefault();

        let send = true;

        let inputs = $form.querySelectorAll('input');

        $validate.clearErrors(inputs);

        for(let i=0; i < inputs.length; i++){
            let input = inputs[i]
            let check = $validate.checkInput(input);
            if(check !== true){
                send = false;
                $validate.showError(input, check);
                
            }
        }
        
        if(send){
            $form.submit();
        }
    },
    checkInput:(input)=>{
        let rules = input.getAttribute('data-rules');

        if(rules !== null){
            rules = rules.split('|');
            for(let i in rules){
                let details = rules[i].split('=');
                switch(details[0]){
                    case 'required':
                        if(input.value == ''){
                            return 'Este campo é obrigatório';
                            
                        }
                    break;
                    case 'min':
                        if(input.value.length < details[1]){
                            return `Campo deve ter pelo menos ${details[1]} caracteres.`
                        }
                    break;
                }
            }
        }
        return true;
    },
    showError: (input, error) => {
        input.style.border = '1px solid #FF0000';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },
    clearErrors: (inputs) => {
        let errorElements = document.querySelectorAll('.error');
        for(let i = 0;i < inputs.length;i++){
            inputs[i].style = '';
        }
        for(let i = 0;i < errorElements.length; i++){
            errorElements[i].remove();
        }
        
    }
};

let $form = document.querySelector('.validate');
$form.addEventListener('submit', $validate.handleSubmit);
