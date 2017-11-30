import React from 'react'
import { showObject } from '../actions'

const Buildings = ({planet, dispatch }) => {
  let buildings = ["Metal mine", "Crystal mine", "Hydrogen synthesizer", "Solar power plant"]
  return (
    <div className="object-div">
      {  buildings.map((building, index) =>
        <div id={building} className="object" key={"object"+index}>
          <a onClick={() => dispatch(showObject({id: planet.id, object: building.split(" ")[0].toLowerCase()}))}>{building}</a>
          <p>Lvl: {eval("planet." + building.split(" ")[0].toLowerCase() + "_lvl")}</p>
        </div>
      )}
    </div>
  )
}

export default Buildings
