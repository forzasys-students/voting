import { signIn } from "next-auth/react";
import { FormEventHandler } from "react";

interface FormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  password: HTMLInputElement;
}

interface UsernameFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function Login() {
  const handleFormSubmit = async (e: React.FormEvent<UsernameFormElement>) => {
    e.preventDefault();

    let username = e.currentTarget.elements.username.value;
    let password = e.currentTarget.password.value;

    console.log(username, password);

    const response = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    console.log(response);
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
              defaultValue="test"
            />
          </div>
          <div>
            <label htmlFor="password">Passord</label>
            <input
              type="password"
              className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
              id="password"
              placeholder="Ditt passord"
              defaultValue="test"
            />
          </div>

          <div className="mt-1">
            <button className="bg-green py-2 px-4 text-sm text-primary rounded border border-green focus:outline-none focus:border-green-dark hover:bg-blue-900 hover:text-white">
              Logg inn
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
