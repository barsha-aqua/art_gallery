import artistPortrait from "../assets/artist_portrait.jpg";

export default function About() {
  return (
    <div className="w-full pt-12 md:pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-24 flex flex-col md:flex-row items-center gap-12 lg:gap-24">
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="rounded-2xl overflow-hidden shadow-lg w-full max-w-md">
            <img
              src={artistPortrait}
              alt="Barsha Yadav, artist"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col">
          <h1 className="font-serif text-4xl md:text-5xl text-stone-800 leading-tight mb-8">
            Logic and feelings.
          </h1>
          <div className="text-stone-600 space-y-6 text-sm leading-relaxed mb-10">
            <p>
              I paint what I cannot say, write what I cannot explain, take
              photos of myself that I have not yet figured out. And my art comes
              in different forms, ranging from paintings to poetry to
              self-portraits, often inspired by quiet moments, fleeting
              emotions, imperfect details, and beauty in the ordinary things. It
              seems nice to make something without always having to understand
              it. One brush stroke doesn’t have to be sure. The poem doesn’t
              need to end up perfect. A photograph will always give a glimpse of
              who I am in ways words never could.
            </p>
            <p>
              This place is my gallery of things I make while trying to figure
              myself out. one painting, one poem, and one frame at a time.
            </p>
          </div>
          <div>
            <button className="bg-stone-200 hover:bg-stone-300 text-stone-700 font-medium px-8 py-3 rounded text-xs tracking-widest uppercase transition-colors">
              Barsha Yadav
            </button>
          </div>
        </div>
      </div>

      <div className="w-full py-24 text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-stone-800 mb-12">
          Get in Touch
        </h2>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          <a
            href="mailto:123barsha4@gmail.com"
            className="text-xs font-bold text-stone-600 tracking-[0.2em] uppercase hover:text-terracotta transition-colors"
          >
            Email Inquiries
          </a>
          <a
            href="https://www.facebook.com/barsha0.0yadav/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-stone-600 tracking-[0.2em] uppercase hover:text-terracotta transition-colors"
          >
            Facebook
          </a>
          <a
            href="https://pin.it/2xQUXSNeG"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-stone-600 tracking-[0.2em] uppercase hover:text-terracotta transition-colors"
          >
            Pinterest
          </a>
          <a
            href="https://www.linkedin.com/in/barsha-yadav-9772b22a4/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-stone-600 tracking-[0.2em] uppercase hover:text-terracotta transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
