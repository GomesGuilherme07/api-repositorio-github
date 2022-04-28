import fetch from "node-fetch";
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

class RepositorioController{
    
    static searchRepositorios = async (req, res) => {

        try{

            const baseURL = 'https://api.github.com/orgs/takenet/repos';

            const response = await fetch(baseURL);
            
            let data = await response.json();                        


            data = this.filtrarLinguagem(data);
            
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
            
            let respositorios = list.slice(0, 5);
            
            console.log(respositorios);
            res.status(200).send(respositorios);
    
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

    // static mapearObjetoRetorno(data){
        
    // }
    
}

export default RepositorioController;