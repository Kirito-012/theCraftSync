import React from 'react';

const Blogs: React.FC = () => {
  const blogPosts = [
    {
      id: 1,
      category: 'EXPERTISE, INSPIRATION',
      title: 'Branding inspiration: design trends for 2026',
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80',
      bgColor: 'bg-black',
      textColor: 'text-white',
      roundedCorner: 'rounded-tl-[80px]' // top-left rounded
    },
    {
      id: 2,
      category: 'EXPERTISE, INSPIRATION',
      title: 'Design with guts: KOTA\'s manifesto for creative bravery',
      image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80',
      bgColor: 'bg-black',
      textColor: 'text-white',
      roundedCorner: 'rounded-tr-[80px]' // top-right rounded
    },
    {
      id: 3,
      category: 'CULTURE, OUR WORK',
      title: 'KOTA wins a Lovie award for Best Web Design – Aesthetic!',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
      bgColor: 'bg-black',
      textColor: 'text-white',
      roundedCorner: 'rounded-tl-[80px]' // top-left rounded
    }
  ];

  return (
    <section className="w-full bg-white py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-16">
          <h2 
            className="text-5xl md:text-6xl lg:text-7xl font-light text-black"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Latest articles
          </h2>
          <button className="px-8 py-3 border-2 border-black text-black rounded-full hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-2 group">
            View our blog
            <svg 
              className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className={`${post.bgColor} ${post.roundedCorner} overflow-hidden group cursor-pointer transition-all duration-500 hover:scale-[1.02]`}
            >
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Content Section */}
              <div className="p-8">
                <p 
                  className={`text-xs uppercase tracking-wider mb-4 ${post.textColor} opacity-60`}
                  style={{ fontFamily: 'var(--font-descriptive)' }}
                >
                  {post.category}
                </p>
                <h3 
                  className={`text-2xl font-medium ${post.textColor} leading-tight`}
                  style={{ fontFamily: 'var(--font-descriptive)' }}
                >
                  {post.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
