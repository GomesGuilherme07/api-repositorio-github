import fetch from "node-fetch";
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

class RepositorioController{
    
    static searchRepositorios = async (req, res) => {

        try{

            const baseURL = 'https://api.github.com/orgs/takenet/repos';

            const response = await fetch(baseURL);           
            
            let data = await response.json();                     

            data = this.filtrarLinguagem(data);
            data = this.mapearObjetoRetorno(data); 
            data = this.definirTamanho(data);                      
            
            console.log(`Repositórios retornardos`);
            res.status(response.status).send(data);
    
        }catch(error){

            console.log('Error - ', error)
            res.status(500).send("Erro na requisição");

        }
            
    }

    static filtrarLinguagem(data){

        const language = resp => resp.language === 'C#';       

        let filter = data.filter(language)

        return filter;
    }

    static mapearObjetoRetorno(data){

        let list = [];
    
            for(let i in data){

                list.push(
                    [   
                        {
                            "name": data[i].name,
                            "language": data[i].language,
                            "description": data[i].description,
                            "created_at": data[i].created_at,
                            "html_url": data[i].html_url
                        }
                    ]
                );
            }  
            
            return list;
    }

    static definirTamanho(data){
        let respositorios = data.slice(0, 5);
        return respositorios;
    }
    
}

export default RepositorioController;