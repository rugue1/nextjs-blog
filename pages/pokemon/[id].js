export default function PokemonPage({ pokemonData }) {
        return (
          <>
            <p>Your Pokemon <b>{pokemonData.name}</b> turned shiny</p>
            <img src={pokemonData.sprites.front_shiny}/>
          </>
        )
}

export async function getServerSideProps(context) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${context.params.id}`)
    const pokemonData = await res.json()
  
    return {
      props: {pokemonData}, // will be passed to the page component as props
    }
}