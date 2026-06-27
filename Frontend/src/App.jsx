import Booking from "./Pages/Booking"
import Dashboard from "./Pages/Dashboard"
import GuideList from "./Pages/GuideList"
import GuideProfile from "./Pages/GuideProfile"
import Landing from "./Pages/Landing"
import Login from "./Pages/Login"
import Planner from "./Pages/Planner"
import Signup from "./Pages/signup"

//Work left importing external libraries and modules , reason - no internet

function App()
{
    return 
    (
        <BrowswerRouter>
        <Routes>
            <Route path = "/" element = {<Landing/>}/>
            <Route path = "/dashboard" element = {<Dashboard/>}/>
            <Route path = "/login" element = {<Login/>}/>
            <Route path = "/signup" element = {<Signup/>}/>
            <Route path = "/planner" element = {<Planner/>}/>
            <Route path = "booking/" element = {<Booking/>}/>
            <Route path = "/guides" element = {<GuideList/>}/>
            <Route path = "/guide/:id" element = {<GuideProfile/>}/>
        </Routes>
        </BrowswerRouter>
    )
}

export default App;