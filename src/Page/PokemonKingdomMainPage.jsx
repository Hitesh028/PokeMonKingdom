import { useEffect ,useState} from "react";
import PokemonCardComponent from "../Component/PokemonCardComponent";
import styles from "./PokemonKingdomMainPage.module.css";


function PokemonKingdomMainPage(props)
{
    const url = "https://content.newtonschool.co/v1/pr/64ccef982071a9ad01d36ff6/pokemonspages1";
    const [nexturl, setNextUrl] = useState(url);
    const [loading, setLoading] = useState(false);
    const [PokemonData,setPokemonData] = useState([]);
    
    

    async function fetchPokemonData()
    {
            setLoading(true);
            const response = await fetch(nexturl);
            let data = await response.json();
            data = data[0];

            setNextUrl(data.next);
            
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
            setPokemonData((oldData) => [...oldData,...ListOfAllPokemon]);
            // console.log(ListOfAllPokemon);
            setLoading(false);
    } 

    useEffect(() => {

        fetchPokemonData();
        },[]);

    return(
        <>
        {loading ? (
          <h1>LOADING........</h1>
        ) : (
          <>
            <h1 className={styles.Heading}>Pokemon Kingdom Welcome</h1>
            <div className={styles["app-container"]}>
                <div className={styles["pokemon-container"]}>
                    {PokemonData.map((pokemon) => {
                        const {id} = pokemon;
                        // console.log(pokemon,"mainpage")

                        return(
                            <div key={id} >
                            <PokemonCardComponent pokemon = {pokemon}/>
                            </div>
                        );   
                    })}

                </div>
                <button
                onClick={() => {
                    console.log("Need to load More pokemons");
                    fetchPokemonData();
                }}
                className={styles.loadmore}
                >
                Load More
                </button>

            </div>
  
          </>
        )}
      </>
    );

}
export default PokemonKingdomMainPage;