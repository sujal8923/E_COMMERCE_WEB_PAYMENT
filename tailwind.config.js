import flowbite from 'flowbite-react/tailwind';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // React content path
    flowbite.content(),  // Add Flowbite content path
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite.plugin(),  // Add Flowbite plugin
  ],
};
