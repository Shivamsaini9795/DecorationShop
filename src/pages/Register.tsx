import { useState } from "react";
import { X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  openLogin: () => void;
}

const Register = ({ isOpen, onClose, openLogin }: Props) => {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  if (!isOpen) return null;

  const handleRegister = async (e:any)=>{
    e.preventDefault();

    try{

      const response = await fetch("https://flower-yzko.onrender.com/api/register",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          name,
          email,
          password
        })
      });

      const data = await response.json();
      console.log(data);

      alert("Registration Successful");

      // reset form
      setName("");
      setEmail("");
      setPassword("");

      // close modal
      onClose();

    }catch(error){
      console.error(error);
      alert("Registration Failed");
    }
  }

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div className="bg-black border border-pink-900/30 rounded-xl p-8 w-[420px] relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-pink-400"
        >
          <X/>
        </button>

        <h2 className="text-2xl font-bold text-pink-400 mb-6 text-center">
          Register
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            className="w-full bg-black border border-pink-900/40 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500"
            onChange={(e)=>setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            className="w-full bg-black border border-pink-900/40 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500"
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            className="w-full bg-black border border-pink-900/40 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-pink-500"
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg">
            Register
          </button>

        </form>

        {/* Switch to Login */}
        <p className="text-gray-400 text-sm text-center mt-4">
          Already have an account?
          <button
            onClick={() => {
              onClose();
              openLogin();
            }}
            className="text-pink-400 ml-1"
          >
            Login
          </button>
        </p>

      </div>

    </div>
  )
}

export default Register;