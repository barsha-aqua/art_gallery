export default function About() {
  return (
    <div className="w-full pt-12 md:pt-20 min-h-screen">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-24 flex flex-col md:flex-row items-center gap-12 lg:gap-24">
        {/* Left Photo */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="rounded-2xl overflow-hidden shadow-lg w-full max-w-md">
            <img
              src="https://placehold.co/800x1200?text=Artist+Portrait"
              alt="Artist in studio"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Right Bio */}
        <div className="w-full md:w-1/2 flex flex-col">
          <h1 className="font-serif text-4xl md:text-5xl text-stone-800 leading-tight mb-8">
            Finding quiet in the chaos of texture.
          </h1>
          <div className="text-stone-600 space-y-6 text-sm leading-relaxed mb-10">
            <p>
              Based in a sunlit studio on the coast, my work explores the intersection of organic form and rigorous geometry. I believe that true elegance lies in restraint, allowing the inherent qualities of raw materials to speak over excessive ornamentation.
            </p>
            <p>
              Drawing inspiration from modernist architecture and the slow erosion of natural landscapes, each piece is an invitation to pause. The process is tactile and meditative, often involving layering and excavating surfaces to reveal hidden topographies.
            </p>
          </div>
          <div>
            <button className="bg-stone-200 hover:bg-stone-300 text-stone-700 font-medium px-8 py-3 rounded text-xs tracking-widest uppercase transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* The Journey Timeline */}
      <div className="w-full bg-[#f4eee6] py-24">
        <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-stone-800 mb-16">
            The Journey
          </h2>

          <div className="relative border-l border-stone-300 ml-4 md:mx-auto md:border-l-0 text-left md:text-center space-y-12">
            {/* Timeline Item 1 */}
            <div className="relative md:flex md:justify-center md:items-start pl-8 md:pl-0">
              <div className="absolute w-3 h-3 bg-terracotta rounded-full -left-[6px] md:left-1/2 md:-translate-x-[6px] top-1"></div>
              <div className="md:w-1/2 md:pr-12 md:text-right hidden md:block">
                <span className="text-[10px] font-bold text-terracotta tracking-widest">2014</span>
              </div>
              <div className="md:w-1/2 md:pl-12 md:text-left">
                <span className="text-[10px] font-bold text-terracotta tracking-widest block md:hidden mb-1">2014</span>
                <h3 className="font-serif text-xl text-stone-800 mb-2">Studio Founded</h3>
                <p className="text-sm text-stone-600">
                  Established the primary workspace focusing on large-scale textural canvases and exploring minimal pigments.
                </p>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative md:flex md:justify-center md:items-start pl-8 md:pl-0">
              <div className="absolute w-3 h-3 bg-terracotta rounded-full -left-[6px] md:left-1/2 md:-translate-x-[6px] top-1"></div>
              <div className="md:w-1/2 md:pr-12 md:text-right md:order-1">
                <span className="text-[10px] font-bold text-terracotta tracking-widest block md:hidden mb-1">2017</span>
                <h3 className="font-serif text-xl text-stone-800 mb-2">First Solo Exhibition</h3>
                <p className="text-sm text-stone-600">
                  'The Weight of Silence' opened at the Vanguard Gallery, showcasing a definitive shift towards architectural abstraction.
                </p>
              </div>
              <div className="md:w-1/2 md:pl-12 md:text-left hidden md:block">
                <span className="text-[10px] font-bold text-terracotta tracking-widest">2017</span>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative md:flex md:justify-center md:items-start pl-8 md:pl-0">
              <div className="absolute w-3 h-3 bg-terracotta rounded-full -left-[6px] md:left-1/2 md:-translate-x-[6px] top-1"></div>
              <div className="md:w-1/2 md:pr-12 md:text-right hidden md:block">
                <span className="text-[10px] font-bold text-terracotta tracking-widest">2021</span>
              </div>
              <div className="md:w-1/2 md:pl-12 md:text-left">
                <span className="text-[10px] font-bold text-terracotta tracking-widest block md:hidden mb-1">2021</span>
                <h3 className="font-serif text-xl text-stone-800 mb-2">Award of Excellence</h3>
                <p className="text-sm text-stone-600">
                  Recognized by the Contemporary Arts Council for contributions to minimalist physical media and structural design.
                </p>
              </div>
            </div>

            {/* Middle connecting line for desktop */}
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 border-l border-stone-300 -translate-x-1/2 z-[-1]"></div>
          </div>
        </div>
      </div>

      {/* Get in Touch */}
      <div className="w-full py-24 text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-stone-800 mb-12">
          Get in Touch
        </h2>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          <a href="#" className="text-xs font-bold text-stone-700 tracking-[0.2em] uppercase hover:text-terracotta transition-colors">
            Email Inquiries
          </a>
          <a href="#" className="text-xs font-bold text-stone-700 tracking-[0.2em] uppercase hover:text-terracotta transition-colors">
            Instagram
          </a>
          <a href="#" className="text-xs font-bold text-stone-700 tracking-[0.2em] uppercase hover:text-terracotta transition-colors">
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
