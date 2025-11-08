import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
  return (
    <div>
      <div className=" h-screen w-screen  flex flex-col justify-center items-center gap-5">
        <nav className="w-screen justify-between fixed top-0 flex px-30 py-15">
          <h1 className="font-bold text-4xl">
            Quake <span className="text-orange-400">Tracker</span>
          </h1>
         <Link to='/' className="text-black hover:scale-120 transition-all cursor-pointer">
            Back to Home{" "}
            <img
              src="https://img.icons8.com/?size=100&id=7849&format=png&color=000000"
              alt="Back arrow"
              className="inline w-5 h-5 "
            />
          </Link>
        </nav>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
