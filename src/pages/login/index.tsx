import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FormEventHandler, useRef, useState } from "react";
import toast from "react-hot-toast";

interface FormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  password: HTMLInputElement;
}

interface UsernameFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("test");
  const [password, setPassword] = useState("test");

  const handleFormSubmit = async (e: React.FormEvent<UsernameFormElement>) => {
    e.preventDefault();

    const response = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    switch (response?.status) {
      case 401:
        toast.error("Feil brukernavn eller passord");
        break;
      case 200:
        toast.success("Du er nå logget inn!");
        router.push("/admin");

        break;
      default:
        toast.error("Noe gikk galt, prøv igjen.");
    }
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
              id="username"
              type="username"
              className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ditt brukernavn"
            />
          </div>
          <div>
            <label htmlFor="password">Passord</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
              placeholder="Ditt passord"
            />
          </div>

          <div className="mt-1">
            <button
              disabled={!username || !password}
              className="flex bg-green py-2 px-4 text-sm text-primary rounded border border-green focus:outline-none focus:border-green-dark enabled:hover:bg-blue-900 enabled:hover:text-white disabled:opacity-50"
            >
              Logg inn
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
