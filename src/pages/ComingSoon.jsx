import logo from "../assets/images/logo.png"

const ComingSoon = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 border-2 border-cyan-400/30 rounded-lg rotate-45 animate-spin" style={{ animationDuration: '20s' }}></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 border-2 border-cyan-500/30 rounded-full animate-bounce"></div>
      <div className="absolute top-1/2 right-20 w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full animate-pulse"></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Logo/Brand */}
        <div className="mb-8">
            <img src={logo} alt="med games logo" className="w-20 mx-auto mb-2" />
          <h1 className="text-4xl md:text-6xl font-bold text-active  mb-4">
            Categories
          </h1>
          <p className="text-xl text-gray-300 font-medium">The Ultimate Gaming Experience</p>
        </div>

        {/* Coming Soon Text */}
        <div className="mb-8">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-4 drop-shadow-lg">
            Coming Soon
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            We're crafting something extraordinary that will revolutionize your gaming experience. 
            Get ready for the adventure of a lifetime!
          </p>
        </div>

       

       

       
       
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/50 to-transparent"></div>
    </div>
  );
};

export default ComingSoon;