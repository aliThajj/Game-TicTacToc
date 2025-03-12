export default function Logo({onReset}) {
    return (
        <button className="logo flex gap-1" onClick={onReset} >
            <span className="text-teal-600 font-extrabold">X</span>
            <span className="text-yellow-500 font-extrabold">O</span>
        </button>
    )
};
