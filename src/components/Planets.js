import React from 'react'
import { updateResources } from '../actions'

const Planets = ({planets, dispatch }) => {
  return (
    <div className="planets-div">
      {  planets.map((planet, index) =>
        <div className={"planet"+index}>
          <a onClick={() => dispatch(updateResources({id: planet.id}))}>{planet.name}</a>
        </div>
      )}
    </div>
  )
}

export default Planets
