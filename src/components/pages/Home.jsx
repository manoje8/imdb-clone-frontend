import Content from "./Content"
import Swiper from "./Swiper"
import "./Home.css"

const Home = () => {
    return (
        <div className="home-container">
            <Swiper />
            <Content />
        </div>
    )
}

export default Home