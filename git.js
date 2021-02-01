class controleGit{

    buscaUsuarios(evento){

        evento.preventDefault();
       modeloGit.buscar( this.usuarioGitHub.value);
    }
    recebeUsuario(usuarioModelo){
        this.verGit.update(usuarioModelo);
    }
    constructor(){

        this.usuarioGitHub = document.querySelector('[data-usuario-github]');
        this.verGit = new verGit();
    }
}
class modeloGit {

  static buscar(usuario) {

        const buscarUsuario = new XMLHttpRequest();
        buscarUsuario.open('GET', `https://api.github.com/users/${usuario}/repos`);
        
        const usuarioobjeto = new controleGit();
        buscarUsuario.addEventListener('load', () => {
            try {
                if (buscarUsuario.status == 200) {

                    const usuarioSTR = buscarUsuario.responseText;
                    const usuarioOBJ = JSON.parse(usuarioSTR);

                   
                    usuarioobjeto.recebeUsuario(usuarioOBJ);
                    
                } else {
                    
                    usuarioobjeto.error404();
                    throw new Error('Alguma coisa deu errada.');

                }
            } catch (e) {
                console.log(e)
            }
            
        });
        buscarUsuario.send();
    };
}
class verGit {
    update(modeloUsuario) {

        modeloUsuario.forEach((element) => {

            let div = document.createElement('div');
            div.classList.add('divLinks');
            let link = `<a href="${element.html_url}">${element.name}</a><p class="icons">${element.language}</p>`;
            div.innerHTML = link;
            this.repos.appendChild(div);

            this.reposName.textContent = `Historico do senhor o senhora ${element.owner.login}`;
            console.log(element);
        });
    }
    constructor() {
        this.repos = document.querySelector('#links');
        this.reposName = document.querySelector('.titulo');
    }
}