function verificar(){
    var data = new Date()
    var ano = data.getFullYear()
    var ano_nasc = window.document.getElementById('txtano').value
    var idade = ano - ano_nasc
    var sexo_nasc = window.document.getElementsByName('radsex')
    var img = window.document.getElementById('img');
    var msg = window.document.getElementById('msg');
    var genero = ''
    
    sexo_nasc[0].checked ? genero = 'Homem': genero = 'Mulher' // Nessa linha ele capiturou por posição [índex]

    if(genero == 'Homem'){

        if(idade <= 4 || idade > 120)
            alert(`Dados incorretos`)
        else if(idade < 18){
            msg.innerHTML = `Programador junior, ${idade} anos.`
            img.src = 'dev_jovem_masc.png';     
        }
        else if(idade >= 18 && idade < 60){
            msg.innerHTML = `Programador adulto, ${idade} anos.`
            img.src = 'dev_adulto_masc.png';     
        }
        else if(idade <= 120){
            msg.innerHTML = `Programador senior, ${idade} anos.`
            img.src = 'dev_senior_masc.png';      
        } 
        else{
            alert('Verifique as informações e tente novamente')
        }
    }
    else{ //Casos abaixo para perfil mulher

        if(idade <= 4 || idade > 120)
            alert(`Dados incorretos`)
        else if(idade < 18){
            msg.innerHTML = `Programadora junior, ${idade} anos.`
            img.src = 'dev_jovem_fem.png';     
        }
        else if(idade >= 18 && idade < 60){
            msg.innerHTML = `Programadora adulto, ${idade} anos.`
            img.src = 'dev_adulto_fem.png';     
        }
        else if(idade <= 120){
            msg.innerHTML = `Programadora senior, ${idade} anos.`
            img.src = 'dev_senior_fem.png';      
        } 
        else{
            alert('Verifique as informações e tente novamente')
        }
    }
    
    
    
}