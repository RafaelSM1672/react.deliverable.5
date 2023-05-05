import { compose } from '@reduxjs/toolkit'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../components/pokedex/Header'

const PokemonId = () => {
    const [pokemon, setPokemon] = useState()

    const {id} = useParams()

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

    const backgroundTypeId = {
        grass: "bg-[#B1DBBC]",
        fire: "bg-[#E35825]",
        water: "bg-[#83B9FF]", 
        bug: "bg-[#4AB648]",
        normal: "bg-[#735259]",
        poison: "bg-[#5B3184]",
        electric: "bg-[#E6901E]",
        ground: "bg-[#654008]",
        fairy: "bg-[#971B45]",
        fighting: "bg-[#96402A]",
        psychic: "bg-[#5B4984]",
        rock: "bg-[#7E7E7E]",
        ghost: "bg-[#323569]",
        steel: "bg-[#5E736C]",
        ice: "bg-[#6FBEDF]",
        dragon: "bg-[#478A93]",
        dark: "bg-[#0B0E0D]",
    }

    useEffect(() => {
        const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`

        axios.get(URL)
          .then((res) => setPokemon(res.data))
          .catch((err) => console.log(err))
    },[])

    const getPercentStatBar = (stat_base) => {
        const percentBarProgres = Math.floor((stat_base * 100)/255)
        return `${percentBarProgres}%`
    }

    return (
        <section>
            <Header />

            <section className="px-2 py-14">
                <article className="max-w-[768px] mx-auto shadow-xl p-2">
                    {/* Sección superior */}

                    <section className={`bg-gradient-to-b ${backgroundByType[pokemon?.types[0].type.name]} relative h-[150px]`}>
                        <div className="w-[200px] mx-auto absolute left-1/2 -translate-x-1/2 -top-14"> 
                            <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
                        </div>
                    </section>

                    {/* Información General */}

                    <section className="grid grid-rows-7 gap-5">
                        <div className="row-span-1 grid justify-center mt-[20px]">
                            <h3 className="font-['roboto'] text-[#416460] text-[30px]">#{pokemon?.id}</h3>
                        </div>
                        <div className="row-span-1 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                            <hr className="border-[1px] border-[#9F9F9F]" />
                            <h2 className="font-['roboto'] capitalize font-bold text-[30px] mb-[10px]">{pokemon?.name}</h2>
                            <hr className="border-[1px] border-[#9F9F9F]" />
                        </div>
                        <div className="row-span-1 flex justify-center gap-6 text-center mb-[15px]">
                            <div>
                                <h5 className="font-['roboto'] text-[16px]">Weight</h5>
                                <span className="font-['roboto'] text-[25px] font-bold">{pokemon?.weight}</span>
                            </div>
                            <div>
                                <h5 className="font-['roboto'] text-[16px]">Height</h5>
                                <span className="font-['roboto'] text-[25px] font-bold">{pokemon?.height}</span>
                            </div>
                        </div>

                        <section className="row-span-4 grid grid-rows-4 sm:grid-cols-2 gap-4 mb-[60px]">
                            {/* Tipos */}
                            <section className="row-span-2 text-center">
                                <h3 className="font-['roboto'] text-[20px] font-bold">Types</h3>
                                <section className="grid grid-cols-2 gap-4 mt-4 items-center">
                                    {
                                        pokemon?.types.map(type => <article className={`font-['roboto'] text-[16px] text-white font-bold p-2 px-6 border-[1px] ${backgroundTypeId[type.type.name]} border-gray-300 capitalize`} key={type.type.name}>{type.type.name}</article>)
                                    }
                                </section>
                            </section>

                            {/* Habilidades  */}
                            <section className="row-span-2 text-center">
                                <h3 className="font-['roboto'] text-[20px] font-bold">Abilities</h3>
                                <section className="grid grid-cols-2 gap-4 mt-4">
                                    {
                                        pokemon?.abilities.map(ability => <article className="font-['roboto'] p-2 px-6 border-[1px] border-gray-300 capitalize my-auto" key={ability.ability.name}>{ability.ability.name}</article>)
                                    }
                                </section>
                            </section>
                        </section>

                    </section>

                    {/* Sección de stats */}

                    <section className="sm:mt-[-100px]">
                        <h3 className="font-['roboto'] text-[25px] text-[#302F2F] font-bold mb-[25px]">Stats</h3>
                        
                        <section>
                            {
                                pokemon?.stats.map(stat => ( 
                                    <article key={stat.stat.name}>
                                        <section className="flex justify-between">
                                            <h5 className="font-['roboto'] text-[15px] text-[#302F2F] font-bold capitalize">{stat.stat.name}</h5>
                                            <span className="font-['roboto'] text-[15px] text-[#302F2F] font-bold">{stat.base_stat}/255</span>
                                        </section>
                                        <div style={{"width": getPercentStatBar(stat.base_stat)}} className="bg-gray-600 h-6 rounded-sm mb-[10px]">
                                            <div className={`h-full bg-gradient-to-r from-yellow-300 to-yellow-500`}></div>
                                        </div>
                                    </article>
                                ))
                            }
                        </section>
                    </section>
                </article>
            </section>
        </section>
    )
}

export default PokemonId
