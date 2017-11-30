import React from 'react'
import { selectPlanetAndUpdateResources } from '../actions'

const Planets = ({planets, dispatch }) => {
  return (
    <div className="planets-div">
      {  planets.map((planet, index) =>
        <div id={"planet"+index} className={"planet"} key={"planet"+index}>
          <a onClick={() => dispatch(selectPlanetAndUpdateResources({id: planet.id}))}>{planet.name}</a>
          <p>Metal: {Math.floor(planet.metal)}</p>
          <p>Crystal: {Math.floor(planet.crystal)}</p>
          <p>Metal: {Math.floor(planet.metal)}</p>
        </div>
      )}
    </div>
  )
}

export default Planets
