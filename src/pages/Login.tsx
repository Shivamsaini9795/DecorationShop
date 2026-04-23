import { useState } from "react";
import { X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  openRegister: () => void;
}

const Login = ({ isOpen, onClose, openRegister }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {

      const response = await fetch("https://flower-yzko.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.text();

      console.log(data);

      if (data === "Login Successful") {

        localStorage.setItem("userEmail", email);

        window.dispatchEvent(new Event("userLogin"));

        onClose();
      } else {
        alert("Invalid Email or Password");
      }

    } catch (error) {
      console.error(error);
      alert("Login Failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div className="bg-black border border-pink-900/30 rounded-xl p-8 w-[400px] relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-pink-400"
        >
          <X />
        </button>

        <h2 className="text-2xl font-bold text-pink-400 mb-6 text-center">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full bg-black border border-pink-900/40 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-black border border-pink-900/40 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg"
          >
            Login
          </button>

        </form>

        <p className="text-gray-400 text-sm text-center mt-4">
          Don't have an account?
          <button
            onClick={() => {
              onClose();
              openRegister();
            }}
            className="text-pink-400 ml-1"
          >
            Register
          </button>
        </p>

      </div>
    </div>
  );
};

export default Login;