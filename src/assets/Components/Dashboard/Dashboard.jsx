import './dashboard.css'
export default function Dashboard({ playerSymbol, onChoose, children }) {
    // console.log(playerSymbol)
    return (
        <div className='dashboard w-full'>
            <h1 className="mb-5">PICK A SYBMOL</h1>
            <div className="choices flex mb-5">
                <div className={`slider ${playerSymbol}`}></div>
                <button className={`w-1/2 ${playerSymbol === "X" ? "active" : ""}`} onClick={() => onChoose("X")}>X</button>
                <button className={`w-1/2 ${playerSymbol === "O" ? "active" : ""}`} onClick={() => onChoose("O")}>O</button>
            </div>
            {children}
        </div>
    )
}

