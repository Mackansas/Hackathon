
const options = ["Home", "Dice", "Transactions", "Test1", "Test2", "Test3"]
function NavBar() {
    return (
        <div className="nav-bar">
            <div className="pin"></div>
            {options.map((opt, i) => <div className={`option${i}`}>i</div>)}
        </div>
    )
}

export default NavBar;