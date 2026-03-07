'use client';

export default function AtAGlance() {
  const stats = [
    { label: "Core Expertise", value: "Enterprise Software, Generative AI, Cloud Infrastructure, and Business Intelligence." },
    { label: "Project Impact", value: "Delivered 50+ successful deployments with an average 3x conversion boost for AI projects." },
    { label: "Global Reach", value: "Headquartered in Haridwar, India, serving enterprises across USA, Europe, and Asia." },
    { label: "Established", value: "Founded in 2022 to deliver world-class digital experiences and scalable systems." }
  ];

  return (
    <section className="py-24 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left side: Heading */}
          <div className="lg:w-1/3">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-8 bg-emerald-500"></div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-emerald-500 font-medium">Quick Stats</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-black leading-tight mb-8">
              TheCraftsync <br />
              <span className="text-black">In Numbers.</span>
            </h2>
            <p className="text-zinc-700 font-descriptive font-light leading-relaxed max-w-sm">
              A high-performance technology studio bridging the gap between strategic design and technical precision.
            </p>
          </div>
          
          {/* Right side: Facts Grid */}
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-y-12 gap-x-12">
            {stats.map((item, i) => (
              <div key={i} className="group">
                <div className="h-px w-4 bg-zinc-800 group-hover:w-8 group-hover:bg-emerald-500 transition-all duration-500 mb-4"></div>
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold mb-3 group-hover:text-emerald-500 transition-colors">
                  {item.label}
                </h3>
                <p className="text-zinc-700 font-descriptive font-light text-base md:text-lg leading-tight">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
