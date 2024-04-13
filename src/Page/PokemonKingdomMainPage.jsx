import { useEffect ,useState} from "react";
import PokemonCardComponent from "../Component/PokemonCardComponent";
import styles from "./PokemonKingdomMainPage.module.css";


function PokemonKingdomMainPage(props)
{
    const [loading, setLoading] = useState(false);
    const [PokemonData,setPokemonData] = useState([]);

    useEffect(() => {

        const url = "https://content.newtonschool.co/v1/pr/64ccef982071a9ad01d36ff6/pokemonspages1";
        async function fetchPokemonData()
        {
            setLoading(true);
            const response = await fetch(url);
            let data = await response.json();
            data = data[0];
            
            const {results = [],next,count} = data;
            // console.log(results);


            const ListOfAllPokemon = [];

            for(let i = 0; i<results.length;i++)
            {
                const pokemonobj = results[i];
                const {url:detailurl,name} = pokemonobj;
                // console.log(name, pokemonobj);

                const response2 = await fetch(detailurl);
                let data2 = await response2.json();
                data2 = data2[0];

                ListOfAllPokemon.push(data2);
            }
            setPokemonData(ListOfAllPokemon);
            // console.log(ListOfAllPokemon);
            setLoading(false);
        } 
        fetchPokemonData();
        },[]);

    return(
        <>
        {loading ? (
          <h1>LOADING........</h1>
        ) : (
          <>
            <h1>Pokemon Kingdom Welcome</h1>
            <div className="app-container">
                <div className={styles["pokemon-container"]}>
                    {PokemonData.map((pokemon) => {
                        const {id,name,type,image} = pokemon;

                        return(
                            <PokemonCardComponent
                                id = {id}
                                name = {name}
                                type = {type}
                                image = {image}
                            />
                        );   
                    })}

                </div>

            </div>
  
          </>
        )}
      </>
    );

}
export default PokemonKingdomMainPage;