import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import regionsData from "../assets/Regions.json";
import provincesData from "../assets/Provinces.json";
import municitiesData from "../assets/MuniCities.json";
import barangaysData from "../assets/Barangays.json";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const [regionSelected, setRegionSelected] = useState("");
  const [provinceSelected, setProvinceSelected] = useState("");
  const [citySelected, setCitySelected] = useState("");
  const [barangaySelected, setBarangaySelected] = useState("");

  let regionOption = [];
  const [provinceOption, setProvinceOption] = useState([]);

  const locationFiller = () => {
    console.log(provincesData);
    console.log(regionOption)
    regionsData.features.map((region) => {
      regionOption.push(region.properties.REGION);

    });

    regionSelected &&
      provincesData.features.map((province) => {
        if (province.properties.REGION === regionSelected) {
          console.log(province);
        }
      });
  };

  useEffect(() => {
    locationFiller();
  }, []);

  const formSubmit = (data) => {
    // for (regions in barangaysData.features) {
    //   const data = `${regions.properties.NAME_0}, ${regions.properties.NAME_1}, ${regions.properties.NAME_2},  ${regions.properties.NAME_3}`
    // }
    // console.log(barangaysData)
  };
  // features.properties.REGION
  // features.properties.PROVINCE
  // features.properties.NAME_2
  // features.properties.NAME_3

  return (
    <form
      onSubmit={handleSubmit(formSubmit)}
      className="bg-white shadow-xl flex flex-col items-center gap-5 py-10 px-20 rounded-3xl"
    >
      <div className="text-center">
        <h1 className="font-bold text-2xl mb-2">SIGN UP</h1>
        <p>Be a part of Quake Tracker in order to view recent earthquakes.</p>
      </div>

      <div className="w-full">
        <h1>Username</h1>
        <input
          type="text"
          {...register("username", { required: "Username is required." })}
          placeholder={`${
            errors.username ? errors.username?.message : "Username"
          }`}
          className={`w-full bg-gray-100 px-5 py-3 rounded-lg border  shadow-md focus:outline-none focus:scale-110 transition-all ${
            errors.username ? "border-red-400 text-red-500" : "border-gray-400"
          }`}
        />
      </div>

      <div className="w-full">
        <h1>Password</h1>
        <input
          type="password"
          {...register("password", { required: "Password is required." })}
          placeholder={`${
            errors.password ? errors.password?.message : "Password"
          }`}
          className={`w-full bg-gray-100 px-5 py-3 rounded-lg border  shadow-md focus:outline-none focus:scale-110 transition-all ${
            errors.password ? "border-red-400 text-red-500" : "border-gray-400"
          }`}
        />
      </div>

      <div className="w-full flex flex-row gap-4">
        <div className="w-full">
          <h1>Region</h1>
          <select
            className={`w-full bg-gray-100 px-5 py-3 rounded-lg border shadow-md focus:outline-none focus:scale-110 transition-all ${
              errors.region ? "border-red-400 text-red-300" : "border-gray-300"
            }`}
            defaultValue=""
            name="region"
            {...register("region", { required: "Region is required." })}
          >
            <option value="" disabled>
              {errors.region ? errors.region?.message : "Select your Region"}
            </option>
            {regionOption.map((region) => {
              <option value={region}>{region}</option>;
            })}
          </select>
        </div>

        <div className="w-full">
          <h1>Province</h1>
          <select
            className={`w-full bg-gray-100 px-5 py-3 rounded-lg border shadow-md focus:outline-none focus:scale-110 transition-all ${
              errors.province
                ? "border-red-400 text-red-300"
                : "border-gray-300"
            }`}
            defaultValue=""
            name="province"
            {...register("province", { required: "Province is required." })}
          >
            <option value="" disabled>
              {errors.province
                ? errors.province?.message
                : "Select your Province"}
            </option>
            <option value="1">Blue</option>
            <option value="2">Red</option>
          </select>
        </div>
      </div>

      <div className="w-full flex flex-row gap-4">
        <div className="w-full">
          <h1>Municipality</h1>
          <select
            className={`w-full bg-gray-100 px-5 py-3 rounded-lg border shadow-md focus:outline-none focus:scale-110 transition-all ${
              errors.city
                ? "border-red-400 text-red-300 text-sm"
                : "border-gray-300"
            }`}
            defaultValue=""
            name="city"
            {...register("city", { required: "Municipality is required." })}
          >
            <option value="" disabled>
              {errors.city ? errors.city?.message : "Select your Municipality"}
            </option>
            <option value="1">Blue</option>
            <option value="2">Red</option>
          </select>
        </div>

        <div className="w-full">
          <h1>Barangay</h1>
          <select
            className={`w-full bg-gray-100 px-5 py-3 rounded-lg border shadow-md focus:outline-none focus:scale-110 transition-all ${
              errors.barangay
                ? "border-red-400 text-red-300"
                : "border-gray-300"
            }`}
            defaultValue=""
            name="barangay"
            {...register("barangay", { required: "Barangay is required." })}
          >
            <option value="" disabled>
              {errors.barangay
                ? errors.barangay?.message
                : "Select your Barangay"}
            </option>
            <option value="1">Blue</option>
            <option value="2">Red</option>
          </select>
        </div>
      </div>

      <button
        className="btn text-2xl font-bold w-full hover:scale-110 transition-all cursor-pointer py-6"
        type="submit"
      >
        {isSubmitting ? <span className="loading"></span> : "SUBMIT"}
      </button>

      {errors.root && (
        <p className="text-red-600 text-xs mb-5">
          <img
            src="https://img.icons8.com/?size=100&id=60673&format=png&color=FA5252"
            className="inline mr-1 w-4 h-4"
          ></img>
          {errors.root?.message}
        </p>
      )}

      <h1>
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 cursor-pointer">
          Click here to sign in.
        </Link>
      </h1>
    </form>
  );
};

export default RegisterForm;
