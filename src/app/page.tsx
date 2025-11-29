import ZStack from "@/components/layout/ZStack";

export default function Home() {
  return (
    <ZStack>
      <div className="flex flex-col items-center justify-center min-h-[300vh]">

        {/* Section 1: Paris (Start) */}
        <section className="h-screen w-full flex flex-col items-center justify-center p-8">
          <h1 className="font-serif text-6xl md:text-8xl text-vsoe-gold mb-4 text-center drop-shadow-lg">
            Project Vitesse
          </h1>
          <p className="font-sans text-xl text-vsoe-steam/80 max-w-2xl text-center tracking-wide">
            A journey beyond the ordinary. Scroll to depart.
          </p>
        </section>

        {/* Section 2: The Alps (Middle) */}
        <section className="h-screen w-full flex flex-col items-center justify-center p-8">
          <h2 className="font-serif text-5xl md:text-7xl text-vsoe-gold mb-4 text-center">
            The Alps
          </h2>
          <p className="font-sans text-lg text-vsoe-steam/80 max-w-xl text-center">
            Crossing the roof of Europe in the golden hour.
          </p>
        </section>

        {/* Section 3: Venice (End) */}
        <section className="h-screen w-full flex flex-col items-center justify-center p-8">
          <h2 className="font-serif text-5xl md:text-7xl text-vsoe-gold mb-4 text-center">
            Venice
          </h2>
          <p className="font-sans text-lg text-vsoe-steam/80 max-w-xl text-center">
            Arriving at the floating city under the cover of night.
          </p>
        </section>

      </div>
    </ZStack>
  );
}
