import React, { useState } from 'react'
import styles from './App.module.css'
import poweredImage from './assets/powered.png'
import { levels, calculaImc, Level} from './helpers/imc'
import leftArrowImage from './assets/leftarrow.png'
import { GridItem } from './components/Griditem'



const App = () => {
  const [heightField, setHeightField ] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0)
  const [toShow, setToShow] = useState<Level | null>(null);
  const handleCalculateButton = () => {
    if(heightField && weightField) {
   setToShow(calculaImc(heightField, weightField));
   
    } else {
      alert("Digite todos os campos!")
    }
  }
  const handleBackButton = () => {
    setToShow(null);
    setHeightField(0);
    setWeightField(0)
  }
  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="" width={150}/>
        </div>
      </header>

      <div className={styles.container}>
          <div className={styles.leftSide}>
            <h1>Calcule o seu IMC.</h1>
            <p>IMC é a sigla para Índice de Massa Corporal. É uma medida utilizada para avaliar se uma pessoa está com peso adequado em relação à sua altura. O IMC é calculado dividindo o peso da pessoa pela altura ao quadrado.</p>
            <input type='number' value={heightField > 0 ? heightField : ''} onChange={ e => setHeightField(parseFloat(e.target.value))} disabled={toShow ? true : false} placeholder='Digite a sua altura. Ex 1.75 (em métros).'/>

            <input type='number' value={weightField > 0 ? weightField : ''} disabled={toShow ? true : false} onChange={ e => setWeightField(parseFloat(e.target.value))} placeholder='Digite o seu peso. Ex 80kg (em kg).'/>

            <button onClick={handleCalculateButton} disabled={toShow ? true : false}>Calcular</button>
          </div>
          <div className={styles.rightSide} >
            {!toShow && 
            <div className={styles.grid}>
               {levels.map((item, key) =>(
               <GridItem key={key} item={item} />
               ))}
            </div>
}
{toShow && 
 <div className={styles.rightBig}>
  <div className={styles.rightArrow} onClick={handleBackButton}>
    <img src={leftArrowImage} alt="" width={25}/>
  </div>
  <GridItem item={toShow}/>
 </div>
}
          </div>
      </div>
    </div>
  )
}

export default App
