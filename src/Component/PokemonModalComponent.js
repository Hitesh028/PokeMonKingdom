import PokemonCardComponent from "./PokemonCardComponent";
import style from "./PokemonModalComponent.module.css"
import CardStyle from "./PokemonCardComponent.module.css"
function PokemonModalComponent(prop)
{
    const { pokemon,onClose } = prop;
    // console.log(onClose,"onclose");
    const { height, weight, stats = [], id, name, type, image } = pokemon;
    //console.log(prop,"card");

    return(
        <>
        {/* {popup-component} */}
        <div className={`${style.popupcomponent} ${CardStyle[type]}`}>
            
            {/* {cross-sign} */}
            <div className={`${style.crosssign}`} 
            onClick={() => {
                console.log("close this Popup");
                onClose();
            }}>X</div>

            {/* {left-container} */}
            <div className={`${style.leftcontainer}`}>
                <img className={`${style.leftcontainerImage}`} src={image} alt={name} />
                 <h4 className={style.nametext}>{name}</h4> 
            </div>
            {/* {right-container} */}
            <div className={`${style.rightcontainer}`}>
                <div>
                    <p><span>Height </span>: {height}</p>
                    <p><span>Weight </span>: {weight}</p>
                </div>

                <div>
                    {Array.from(stats).map((statObj, index) =>{
                        const { stat } = statObj;
                        const name = stat.name;
                        return (
                            <>
                            <p><span>Stat{index + 1}</span> : {name}</p>
                            </>
                        );
                    })}
                </div>
                <div>
                    {Array.from(stats).map((statObj, index) =>{
                        const { base_stat } = statObj;
                        return (
                            <>
                            <p><span>Bs{index + 1}</span> : {base_stat}</p>
                            </>
                        );
                    })}
                </div>

            </div>

        </div>
        </>
    );

}
export default PokemonModalComponent;