function entra(){
    window.document.getElementById("login").style.display = "block";
    window.document.getElementById("cadastro").style.display = "none";
}
function cadastra(){
    window.document.getElementById("cadastro").style.display = "block";
    window.document.getElementById("login").style.display = "none";
}
function mostratermo(){
    window.document.getElementById("termo").style.display = "block";
    window.document.getElementById("cadastro").style.display = "none";
}
function escondetermo(){
    window.document.getElementById("cadastro").style.display = "block";
    window.document.getElementById("termo").style.display = "none";
}
function nav(){
    let nav = window.document.getElementById('nav').style;
    let img = window.document.getElementById('imgnav').style;
    if (nav.transform == "translateY(35vw)"){
        nav.transition = "all 0.75s";
        nav.transform = "translateY(-80%)"
        img.transition = "all 0.75s";
        img.transform = "rotate(0turn)"
    } else {
        nav.transition = "all 0.75s";
        nav.transform = "translateY(35vw)";
        img.transition = "all 0.75s";
        img.transform = "rotate(0turn)"
    }
}

function proximo(){
    window.document.querySelector('#cadastracurso section:nth-child(1)').style.display = "none";
    window.document.querySelector('#cadastracurso section:nth-child(2)').style.display = "grid";
}
function anterior(){
    window.document.querySelector('#cadastracurso section:nth-child(1)').style.display = "grid";
    window.document.querySelector('#cadastracurso section:nth-child(2)').style.display = "none";
}

function prepara(){
    window.document.getElementById("est1").addEventListener("click", rat1);
    window.document.getElementById("est2").addEventListener("click", rat2);
    window.document.getElementById("est3").addEventListener("click", rat3);
    window.document.getElementById("est4").addEventListener("click", rat4);
    window.document.getElementById("est5").addEventListener("click", rat5);
}

function rat1(){
    window.document.getElementById("est1").src = "imagens/estrela.svg";
    window.document.getElementById("est2").src = "imagens/estrelavaz.svg";
    window.document.getElementById("est3").src = "imagens/estrelavaz.svg";
    window.document.getElementById("est4").src = "imagens/estrelavaz.svg";
    window.document.getElementById("est5").src = "imagens/estrelavaz.svg";
}
function rat2(){
    window.document.getElementById("est1").src = "imagens/estrela.svg";
    window.document.getElementById("est2").src = "imagens/estrela.svg";
    window.document.getElementById("est3").src = "imagens/estrelavaz.svg";
    window.document.getElementById("est4").src = "imagens/estrelavaz.svg";
    window.document.getElementById("est5").src = "imagens/estrelavaz.svg";
}
function rat3(){
    window.document.getElementById("est1").src = "imagens/estrela.svg";
    window.document.getElementById("est2").src = "imagens/estrela.svg";
    window.document.getElementById("est3").src = "imagens/estrela.svg";
    window.document.getElementById("est4").src = "imagens/estrelavaz.svg";
    window.document.getElementById("est5").src = "imagens/estrelavaz.svg";
}
function rat4(){
    window.document.getElementById("est1").src = "imagens/estrela.svg";
    window.document.getElementById("est2").src = "imagens/estrela.svg";
    window.document.getElementById("est3").src = "imagens/estrela.svg";
    window.document.getElementById("est4").src = "imagens/estrela.svg";
    window.document.getElementById("est5").src = "imagens/estrelavaz.svg";
}
function rat5(){
    window.document.getElementById("est1").src = "imagens/estrela.svg";
    window.document.getElementById("est2").src = "imagens/estrela.svg";
    window.document.getElementById("est3").src = "imagens/estrela.svg";
    window.document.getElementById("est4").src = "imagens/estrela.svg";
    window.document.getElementById("est5").src = "imagens/estrela.svg";
}

function mult5(numero){
    numero = numero*5
    return numero
}

function loadImg(){
    $('#preview').attr('src', URL.createObjectURL(event.target.files[0]));
}

function notify(titulo, texto, tipo, posicao) {
    new Notify({
        status: tipo,
        title: titulo,
        text:texto ,
        effect: 'fade',
        speed: 300,
        showIcon: true,
        showCloseButton: true,
        autoclose: true,
        autotimeout: 3000,
        gap: 20,
        distance: 20,
        type: 1,
        position:posicao 
    })
}

// function deleta(){
//     console.log("1");
//     conexao.query(
//         "DELETE * FROM usuario WHERE id_usuario != 0;",
//         function (error, results, fields){
//             if(error) throw error;
//         }
        
//     );
//     console.log("2");
// }