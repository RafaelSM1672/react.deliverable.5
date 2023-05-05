import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Header from '../components/pokedex/Header'
import PokemonCard from '../components/pokedex/PokemonCard'

const Pokedex = () => {
    const [pokemons, setPokemons] = useState([])
    const [pokemonName, setPokemonName] = useState("")
    const [types, setTypes] = useState([])
    const [currentType, setCurrentType] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    
    const nameTrainer =  useSelector(store => store.nameTrainer)

    const handleSubmit = (e) => {
        e.preventDefault()
        setPokemonName(e.target.pokemonName.value)
    }

    const pokemonsByName = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(pokemonName.toLowerCase()))

    const paginationLogic = () => {
        //Cantidad de pokemons por página
        const POKEMONS_PER_PAGE = 12

        //Pokemons que se van a mostrar en la página actual
        const sliceStart = (currentPage - 1) * POKEMONS_PER_PAGE
        const sliceEnd = sliceStart + POKEMONS_PER_PAGE
        const pokemonInPage = pokemonsByName.slice(sliceStart, sliceEnd)

        //Última página
        const lastPage = Math.ceil(pokemonsByName.length / POKEMONS_PER_PAGE) || 1

        //Bloque actual
        const PAGES_PER_BLOCK = 5
        const actualBlock = Math.ceil(currentPage / PAGES_PER_BLOCK)

        //Páginas que se van a mostrar en el bloque actual
        const pagesInBlock = []
        const minPage = (actualBlock - 1) * PAGES_PER_BLOCK + 1
        const maxPage = actualBlock * PAGES_PER_BLOCK
        for(let i = minPage; i <= maxPage; i++){
            if(i <= lastPage){
                pagesInBlock.push(i)
            }
        }

        return {pokemonInPage, lastPage, pagesInBlock}
    }

    const {lastPage, pagesInBlock, pokemonInPage} = paginationLogic()

    const handleClickPreviusPage = () => {
        const newCurrentPage = currentPage - 1
        if(newCurrentPage >= 1){
            setCurrentPage(newCurrentPage)
        }
    }

    const handleClickNextPage = () => {
        const newCurrentPage = currentPage + 1
        if(newCurrentPage <= lastPage){
            setCurrentPage(newCurrentPage)
        }
    }
    
    useEffect(() => {
        if(!currentType){
            const URL = "https://pokeapi.co/api/v2/pokemon?limit=1281"

            axios.get(URL)
             .then((res) => setPokemons(res.data.results))
             .catch((err) => console.log(err))
        }      
    },[currentType])

    useEffect(() => {
        const URL = "https://pokeapi.co/api/v2/type"
        
        axios.get(URL)
          .then((res) => {
              const newTypes = res.data.results.map(type => type.name)
              setTypes(newTypes)
            })
          .catch((err) => console.log(err))
    },[])

    useEffect(() => {
        if(currentType){
            const URL = `https://pokeapi.co/api/v2/type/${currentType}/`

            axios.get(URL)
              .then((res) => {
                  const pokemonsByType = res.data.pokemon.map(pokemon => pokemon.pokemon)
                  setPokemons(pokemonsByType)
                })
              .catch((err) => console.log(err))
        }
    },[currentType])

    useEffect(() => {
        setCurrentPage(1)
    }, [pokemonName, currentType])

    return (
        <section className="min-h-screen">
            <Header />

            {/* Seccion de filtros y saludo */}

            <section className="pt-10 px-2">
                <h3 className="font-['inter'] text-[#333333] text-[20px] mb-[30px]"><span className="font-['inter'] text-[#FE1936] font-bold">Welcome {nameTrainer}</span>, here you can find your favorite pokemon.</h3>
                <form onSubmit={handleSubmit} className="grid md:grid grid-rows-2 md:grid-cols-3  gap-4 justify-center">
                    <div className="row-span-1 md:col-span-2 flex items-center w-[300px] xl:w-[500px] h-[50px] mx-auto">
                        <input className="font-['roboto'] border-[2px] border-[#302F2F] h-[40px] w-[190px] lg:w-[280px] xl:w-[350px] pl-[10px]" id="pokemonName" type="text" placeholder="Search your pokemon ..." />
                        <button className="font-['roboto'] bg-[#D93F3F] text-[18px] text-[#FFFFFF] h-[40px] w-[80px] lg:w-[120px] xl:w-[120px]">Search</button>
                    </div>
                    <select onChange={(e) => setCurrentType(e.target.value)} className="row-span-1 md:col-span-1 font-['roboto'] border-[2px] border-[#302F2F] h-[40px] w-[190px] lg:w-[220px] xl:lg:w-[250px] pl-[10px] capitalize text-[16px]">
                        <option value="">All</option>
                        {types.map((type) => (
                            <option className="capitalize" value={type} key={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </form>
            </section>

            {/* Paginación */}
            <ul className="flex gap-3 justify-center py-4 px-2 flex-wrap">

                {/* Primera página */}
                <li onClick={() => setCurrentPage(1)} className="p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer">{"<<"}</li>

                {/* Página anterior */}
                <li onClick={handleClickPreviusPage} className="p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer">{"<"}</li>

                {/* lista de páginas */}
                {
                    pagesInBlock.map(numberPage => <li onClick={() => setCurrentPage(numberPage)} className={`p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer ${numberPage == currentPage && "bg-red-900"}`} key={numberPage}>{numberPage}</li>)
                }

                {/* Página siguiente */}
                <li onClick={handleClickNextPage} className="p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer">{">"}</li>

                {/* Última página */}
                <li onClick={() => setCurrentPage(lastPage)} className="p-3 bg-red-600 font-bold text-white rounded-md cursor-pointer">{">>"}</li>
            </ul>

            {/* Seccion lista pokemons */}

            <section className="px-2 grid gap-10 auto-rows-auto grid-cols-[repeat(auto-fill,_250px)] justify-center my-[20px]">
                {
                    pokemonInPage.map(pokemon => <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />)
                }

            </section>
        </section>
    )
}

export default Pokedex
