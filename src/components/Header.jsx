const Header = () =>{
    return (
        <div className="mb-4 text-5xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white">
            <h3><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">오늘은</span></h3>
            <h2 className="px-2 text-black bg-yellow-300 rounded dark:bg-yellow-300">{new Date().toDateString()}</h2>    
        </div>
    );
}

export default Header;