import { Link } from 'react-router-dom'
import '../App.css';


export const Navbar = () => {
  return (
    <div>
        <nav className="bg-blue-600 text-white p-4 shadow-md fl">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="text-xl font-bold"><Link to="/">Library System</Link></div>
                    <ul className="flex space-x-6 mt-3 md:mt-0">
                        <li className="animated-btn"><Link to="/books"><span className='whitespace-nowrap '>Books</span></Link></li>
                        <li className="animated-btn"><Link to="/create-book"><span className='whitespace-nowrap '>Add Books</span></Link></li>
                        <li className="animated-btn"><Link to="/borrow-summary"><span className='whitespace-nowrap '>Borrow Summary</span></Link></li>
                    </ul>

            </div>
        </nav>
    </div>
  )
}
