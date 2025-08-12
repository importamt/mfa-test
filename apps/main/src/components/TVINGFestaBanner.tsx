export function TVINGFestaBanner() {
  return (
    <section className="bg-black py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative bg-gradient-to-r from-purple-900 via-blue-800 to-purple-900 rounded-xl overflow-hidden h-32">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-4 left-8 w-8 h-8 bg-yellow-400 rounded rotate-12"></div>
            <div className="absolute top-8 right-16 w-6 h-6 bg-green-400 rounded-full"></div>
            <div className="absolute bottom-6 left-24 w-4 h-4 bg-pink-400 rounded"></div>
            <div className="absolute bottom-4 right-8 w-10 h-3 bg-orange-400 rounded-full"></div>
            <div className="absolute top-6 left-1/3 w-5 h-5 bg-red-400 rotate-45"></div>
            <div className="absolute bottom-8 right-1/3 w-7 h-7 bg-blue-400 rounded-full"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-white text-4xl font-bold mb-2">
                TVING <span className="inline-flex items-center">📺🎬</span> FESTA
              </h2>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2 text-6xl opacity-30">
            🎪
          </div>
        </div>
      </div>
    </section>
  );
}