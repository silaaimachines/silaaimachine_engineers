'use client'; // This tells Next.js that this is a Client Component

import React from 'react';

const SignIn = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row justify-start items-center gap-4 md:gap-8">
      <div className="flex-1 bg-[#cbe4e8] rounded-tr rounded-br flex justify-center items-center">
        <img
          className="w-full h-auto max-w-md md:max-w-lg"
          src="https://silaaimachines.com/wp-content/uploads/2024/09/03-with-bg.png"
          alt="Sign In"
        />
      </div>
      <div className="flex-1 flex flex-col justify-start items-start gap-8 p-4 md:p-8">
        <div className="flex flex-col justify-start items-start gap-4">
          <div className="text-black text-3xl md:text-4xl font-medium leading-tight tracking-wide">
            Create an account
          </div>
          <div className="text-black text-base font-normal">
            Enter your details below
          </div>
        </div>
        <form className="flex flex-col justify-start items-center gap-6">
          {/* Input Fields */}
          <div className="flex flex-col justify-start items-start gap-2 w-full max-w-md">
            <label className="opacity-80 text-black text-base font-normal">Name</label>
            <input
              type="text"
              className="w-full p-2 border border-black rounded"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="flex flex-col justify-start items-start gap-2 w-full max-w-md">
            <label className="opacity-80 text-black text-base font-normal">Email or Phone Number</label>
            <input
              type="email"
              className="w-full p-2 border border-black rounded"
              placeholder="Enter your email or phone"
              required
            />
          </div>
          <div className="flex flex-col justify-start items-start gap-2 w-full max-w-md">
            <label className="opacity-80 text-black text-base font-normal">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-black rounded"
              placeholder="Enter your password"
              required
            />
          </div>
          {/* Create Account Button */}
          <button className="px-4 py-2 bg-[#db4444] rounded text-white font-medium w-full max-w-md">
            Create Account
          </button>
        </form>
        <div className="flex flex-col justify-start items-center gap-4 w-full max-w-md">
          <div className="border border-black/40 rounded w-full flex justify-center items-center p-2">
            <div className="text-black text-base font-normal">Sign up with Google</div>
          </div>
          <div className="flex justify-between w-full">
            <div className="opacity-70 text-black text-base font-normal">Already have an account?</div>
            <a href="#" className="text-black text-base font-medium">Log in</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
