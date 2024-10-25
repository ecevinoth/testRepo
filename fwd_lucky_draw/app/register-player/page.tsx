import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function RegisterPlayer() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Register for Lucky Draw</h1>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <form className="flex flex-col gap-4">
          <label className="text-sm font-medium text-gray-700">
            Email Address
            <Input type="email" placeholder="Enter your email" required className="mt-1" />
          </label>
          <Button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-5 rounded shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}
