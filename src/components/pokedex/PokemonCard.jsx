import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const bordersByType = {
    grass: "border-[#B1DBBC]",
    fire: "border-[#E35825]",
    water: "border-[#83B9FF]", 
    bug: "border-[#4AB648]",
    normal: "border-[#735259]",
    poison: "border-[#5B3184]",
    electric: "border-[#E6901E]",
    ground: "border-[#654008]",
    fairy: "border-[#971B45]",
    fighting: "border-[#96402A]",
    psychic: "border-[#5B4984]",
    rock: "border-[#7E7E7E]",
    ghost: "border-[#323569]",
    steel: "border-[#5E736C]",
    ice: "border-[#6FBEDF]",
    dragon: "border-[#478A93]",
    dark: "border-[#0B0E0D]",
}

const backgroundByType = {
    grass: "from-[#7EC6C5] via-[#ABDAC6] to-[#CAE099]",
    fire: "from-[#F96D6F] via-[#E35825] to-[#E8AE1B]",
    water: "from-[#133258] via-[#1479FB] to-[#82B2F1]", 
    bug: "from-[#62DB60] via-[#3BB039] to-[#AAFFA8]",
    normal: "from-[#735259] via-[#BC6B7C] to-[#7C3F4C]",
    poison: "from-[#5B3184] via-[#A564E3] to-[#CE9BFF]",
    electric: "from-[#E6901E] to-[#FCD676]",
    ground: "from-[#654008] via-[#895C1A] to-[#D69638]",
    fairy: "from-[#971B45] via-[#C23867] to-[#CD7D98]",
    fighting: "from-[#96402A] via-[#F1613C] to-[#CB735D]",
    psychic: "from-[#5B4984] to-[#CEBBFF]",
    rock: "from-[#7E7E7E] via-[#8D8D94] to-[#D3D3D3]",
    ghost: "from-[#323569] via-[#454AA8] to-[#787DDA]",
    steel: "from-[#5E736C] via-[#728881] to-[#A8A8A8]",
    ice: "from-[#6FBEDF] via-[#64CBF5] to-[#BDEBFE]",
    dragon: "from-[#478A93] via-[#56A4AE] to-[#A2BEC1]",
    dark: "from-[#030706] via-[#0D1211] to-[#5A5E5D]"
}

const NameByPokemon = {
    grass: "text-[#B1DBBC]",
    fire: "text-[#E35825]",
    water: "text-[#83B9FF]", 
    bug: "text-[#4AB648]",
    normal: "text-[#735259]",
    poison: "text-[#5B3184]",
    electric: "text-[#E6901E]",
    ground: "text-[#654008]",
    fairy: "text-[#971B45]",
    fighting: "text-[#96402A]",
    psychic: "text-[#5B4984]",
    rock: "text-[#7E7E7E]",
    ghost: "text-[#323569]",
    steel: "text-[#5E736C]",
    ice: "text-[#6FBEDF]",
    dragon: "text-[#478A93]",
    dark: "text-[#0B0E0D]",
}

const PokemonCard = ({ pokemonUrl }) => {
    const [pokemon, setPokemon] = useState()

    const types = pokemon?.types.slice(0, 2).map(type => type.type.name).join(" / ")

    useEffect(() => {
        axios.get(pokemonUrl)
          .then((res) => setPokemon(res.data))
          .catch((err) => console.log(err))

    },[])

    return (
        <Link to={`/pokedex/${pokemon?.id}`} className={`text-center border-8 rounded-md ${bordersByType[pokemon?.types[0].type.name]}`}>
            { /* Seccion superior*/ }
            <section className={`bg-gradient-to-b ${backgroundByType[pokemon?.types[0].type.name]} relative h-[150px]`}>
                <div className="absolute -bottom-12 w-[200px] left-1/2 -translate-x-1/2">
                    <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
                </div>
            </section>

            { /* Seccion inferior*/ }
            <section>
                <h3 className={`font-['roboto'] font-bold text-[24px] mt-10 ${NameByPokemon[pokemon?.types[0].type.name]} mb-[2px] capitalize`}>{pokemon?.name}</h3>
                <h4 className="font-['roboto'] text-[16px] capitalize">{types}</h4>
                <span className="font-['roboto'] text-[10px]">Type</span>

                <hr />

                <section className="grid grid-cols-3 gap-2 p-2">
                    {
                        pokemon?.stats.map((stat) => (
                            <div key={stat.stat.name}>
                                <h5 className="font-['roboto'] text-[12px] uppercase">{stat.stat.name}</h5>
                                <span className={`font-['roboto'] font-bold text-[20px] ${NameByPokemon[pokemon?.types[0].type.name]}`}>{stat.base_stat}</span>
                            </div>
                        ))
                    }
                </section>
            </section>
        </Link>
    )
}

export default PokemonCard
