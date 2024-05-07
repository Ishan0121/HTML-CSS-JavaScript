let input = document.getElementById('inputBox');
let output = document.getElementById('outputBox');
let buttons = document.querySelectorAll('button');
let string = "";
let string2="";
let arr = Array.from(buttons);
arr.forEach(button => {
    button.addEventListener('click', (e) =>{
        if(e.target.innerHTML == '='){
            string2 = eval(string);
            if(string2==null){
                output.value="ERROR";
            }else{
                output.value = string2;
            }
        }else if(e.target.innerHTML == 'AC'){
            string = "";
            input.value = string;
            output.value = string;
        }
        else if(e.target.innerHTML == 'DEL'){
            string = string.substring(0, string.length-1);
            input.value = string;
        }
        else{
            string += e.target.innerHTML;
            input.value = string;
        }
    })
})
