import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setNameTrainer } from '../store/slices/nameTrainer.slice'
import Footer from '../components/Footer'

const Home = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(setNameTrainer(e.target.nameTrainer.value))
        navigate("/pokedex")
    }

    return (
        <section className="min-h-screen grid grid-rows-[1fr_auto]">
            {/* Parte superior */}
            <section className="p-2">
                <article>
                    <div className="grid justify-center">
                        <img src="/images/pokedex.png" alt="" />
                    </div>
                    <h2 className="font-['inter'] text-[#FE1936] text-[44px] font-bold mt-[70px] mb-[60px] w-[300px] h-[50px] mx-auto ">Hello trainer!</h2>
                    <p className="font-['inter'] text-[#302F2F] text-[20px] w-[300px] h-[30px] mx-auto mb-[60px]">Give me your name to start: </p>
                    <form onSubmit={handleSubmit} className="flex items-center w-[300px] h-[50px] mx-auto">
                        <input className="font-['roboto'] border-[2px] border-[#302F2F] h-[40px] w-[190px] pl-[10px]" id="nameTrainer" type="text" placeholder="Your name ..." />
                        <button className="font-['roboto'] bg-[#D93F3F] text-[18px] text-[#FFFFFF] h-[40px] w-[80px]">Start</button>
                    </form>
                </article>
            </section>
            {/* Footer */}
            <Footer />
        </section>
    )
}

export default Home
