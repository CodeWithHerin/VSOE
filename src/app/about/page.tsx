'use client';

import StandardPageLayout from '@/components/layout/StandardPageLayout';

export default function AboutPage() {
    return (
        <StandardPageLayout
            title="Our Story"
            subtitle="A Legend Reborn"
            heroImage="https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2657&auto=format&fit=crop"
        >
            <h3>The Golden Age of Travel</h3>
            <p>
                The Venice Simplon-Orient-Express is not merely a train; it is a work of art in motion. An icon of Art Deco design and an enduring symbol of luxury, it traverses the landscape of Europe, connecting its most captivating cities.
            </p>
            <p>
                Our story begins in the Roaring Twenties, an era of glamour and optimism. The sleeping cars, with their intricate marquetry and polished brass, were the stage for diplomats, royalty, and spies. Today, these historic carriages have been lovingly restored to their former glory, ensuring that the legacy of the original Orient Express lives on.
            </p>
            
            <h3>Craftsmanship & Heritage</h3>
            <p>
                Every detail on board has a story. The 'Etoile du Nord' dining car features exquisite marquetry, while the 'Côte d’Azur' showcases intricate Lalique glass panels. Our stewards, dressed in their signature blue uniforms, uphold a tradition of service that has remained unchanged for nearly a century.
            </p>

            <blockquote>
                "To step aboard is to step back in time, to an era where the journey was as important as the destination."
            </blockquote>

            <h3>The Experience</h3>
            <p>
                Life on board is a rhythm of slow travel. Mornings begin with coffee served in your cabin, watching the Alps glide by. Evenings are an occasion, with black-tie dinners, live jazz in Bar Car '3674', and the promise of a peaceful night's sleep in our vintage cabins.
            </p>
        </StandardPageLayout>
    );
}
