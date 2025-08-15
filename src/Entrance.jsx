import { useAuth } from "./AuthContext";

/** Users can enter their name to receive a token from the API. */
export default function Entrance() {
  const { signUp, setUsername } = useAuth();
  const submit = (FormData) => {
    const inputObj = { username: FormData.get("name") };
    setUsername(FormData.get("name")); //set username to compare with authenticate API return
    signUp(inputObj);
  };

  return (
    <>
      <h1>Cave Entrance</h1>
      <p>Your journey has brought you to the base of a rocky mountain.</p>
      <p>
        The quickest path forward is through the mountain's winding tunnels, but
        a sturdy metal gate sits closed before you.
      </p>
      <p>
        Two giant badgers stand guard on either side of the gate, their eyes
        fixed on you. The one on the left opens its mouth, and with a deep,
        rumbling voice, it asks, "Who approaches? Speak your name."
      </p>
      <form action={submit}>
        <label>
          Name
          <input name="name" />
        </label>
        <button>Respond</button>
      </form>
    </>
  );
}
