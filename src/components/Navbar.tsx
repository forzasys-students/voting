export default function Navbar() {
  return (
    <header className="bg-blue-900 h-36 mb-5">
      <div className="float-right mr-40">
        <div>
          <p className="text-right mb-2 p-2 text-lg hover:bg-white hover:text-black float-right font-medium" onClick={() => alert("Chnage to login page")}>Login</p>
          <p className="text-right mb-2 p-2 text-lg hover:bg-white hover:text-black float-right font-medium" onClick={() => alert("Change to overview page of old votes")}>Bytt til tidligere avstemmninger</p>
        </div>
        
        <p className="bg-sky-400 text-white font-bold py-2 px-4 float-right border-4 text-3xl" onClick={() => alert("Chnage to overview page")}>ALLE AVSTEMMNINGER</p>
      </div>
      <h1 className="pt-12 ml-40 w-24 text-3xl font-semibold">EliteSerien</h1>
    </header>
  );
}
