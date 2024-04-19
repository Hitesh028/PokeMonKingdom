import styles from './PokemonCardComponent.module.css'; 
import { useState } from 'react';
import PokemonModalComponent from './PokemonModalComponent';
import BackDrop from './BackDrop';


function PokemonCardComponent(props)
{
  const { pokemon } = props;
  const { id, name, type, image } = pokemon;
  // console.log(id,name,type,image);
  
  const [modal,setModal] = useState(false);

  return(
        <>
             <div className={`${styles["card-container"]} ${styles[type]} `}>
                <div className={styles.number}>#{id}</div>
                <img className={styles.image} src={image} alt="Pokemon" />
                <div className="detail-wrapper">
                    <h3>{name}</h3>
                    <p>Type: {type}</p>
                </div>
                <div  onClick={() => { setModal((old) => !old);}} className={styles.knowmore}>Know More</div>
            </div>

            {/* {modal && <PokemonModalComponent pokemon = {pokemon}/>} */}
            {modal && (
              <BackDrop onClose={() => setModal(false)}>
                {" "}
                  <PokemonModalComponent pokemon = {pokemon} onClose = {() => setModal(false)} />
                {" "}
              </BackDrop>
            )}
        </>
  );
}
export default PokemonCardComponent;