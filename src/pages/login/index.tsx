export default function Login() {
  const handleFormSubmit = (e: any) => {
    e.preventDefault();

    let username = e.target.elements.username?.value;
    let password = e.target.elements.password?.value;

    console.log(username, password);
  };
  return (
    <div className="flex bg-gray-bg1">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-medium text-primary mt-4 mb-6">
          Logg inn
        </h1>

        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="username">Brukernavn</label>
            <input
              type="username"
              className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
              id="username"
              placeholder="Ditt brukernavn"
            />
          </div>
          <div>
            <label htmlFor="password">Passord</label>
            <input
              type="password"
              className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
              id="password"
              placeholder="Ditt passord"
            />
          </div>

          <div className="mt-1">
            <button className="bg-green py-2 px-4 text-sm text-primary rounded border border-green focus:outline-none focus:border-green-dark">
              Logg inn
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
