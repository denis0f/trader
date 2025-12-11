import { Link } from "react-router-dom"
import "./../../App.css"
import logo from "./../../assets/images/logo.jpg"

export default function Nav_bar(){



    return (
        <>
            <div className="nav_bar">
                <div className="logo">
                    <img src={logo} alt="Image of the log"/>
                    <h2>Trade It</h2>

                </div>
                <div className="links">
                    <nav>
                        <ul>
                            <li className="nav_link">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="nav_link">
                                <Link to="/journal">Journal</Link>
                            </li>
                            <li className="nav_link">
                                <Link to="/bots">Bots</Link>
                            </li>
                            <li className="nav_link">
                                <Link to="/ai_insights">AI Insights</Link>
                            </li>
                            <li className="nav_link">
                                <Link to="/charts">Charts</Link>
                            </li>
                        </ul>
                    </nav>

                </div>
            </div>
        
        
        </>
    )
}