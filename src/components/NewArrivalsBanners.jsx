import React from "react";
import homePageMother from "../assets/home_page_mother.jpg";

const NewArrivalsBanners = () => {
  return (
    <section className="py-16">
      <div className="max-w-full mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-auto md:h-125 w-full">
          {/* Large Featured Card
           */}
          <div className="relative h-96 md:h-auto md:col-span-2 md:row-span-2 overflow-hidden shadow-lg hover:shadow-xl transition cursor-pointer group">
            <div
              className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
              style={{
                backgroundImage: `url(${homePageMother})`,
              }}
            />

            <div className="card-content absolute right-0 bottom-30">
              <h1 className="text-4xl font-bold text-stone-600 p-6"></h1>
            </div>
          </div>

          {/* Small Card 1*/}
          <div className="relative h-64 md:h-auto overflow-hidden shadow-lg hover:shadow-xl transition cursor-pointer group">
            <div
              className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&q=80')",
              }}
            />
          </div>

          {/* Small Card 2*/}
          <div className="relative h-64 md:h-auto overflow-hidden shadow-lg hover:shadow-xl transition cursor-pointer group">
            <div
              className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80')",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrivalsBanners;
