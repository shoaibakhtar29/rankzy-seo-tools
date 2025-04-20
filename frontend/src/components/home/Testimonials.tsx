
const testimonials = [
  {
    id: 1,
    content: "These tools have saved me countless hours of work and helped me improve my website's SEO dramatically. I use them daily!",
    author: "Sarah Johnson",
    role: "Content Marketer",
    company: "Digital Growth"
  },
  {
    id: 2,
    content: "As a small business owner, I needed affordable SEO solutions. These free tools are exactly what I needed to compete with bigger companies.",
    author: "Michael Chen",
    role: "E-commerce Entrepreneur",
    company: "StyleHub"
  },
  {
    id: 3,
    content: "The meta tag generator and keyword density tools have been invaluable for optimizing our blog content. Highly recommended!",
    author: "Emma Rodriguez",
    role: "SEO Specialist",
    company: "TechNova"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied users who use our tools to improve their website performance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex items-center mb-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              
              <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
              
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-gray-500 text-sm">{testimonial.role}, {testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
