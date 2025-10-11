function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <h1 className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
        TailwindCSS is Working 🎉
      </h1>
      <p className="text-lg text-white opacity-80">
        You can now design your wallpaper site beautifully!
      </p>
      <button className="mt-6 px-6 py-3 bg-white text-indigo-600 rounded-full font-semibold hover:bg-indigo-100 transition">
        Test Button
      </button>
    </div>
  );
}

export default App;
