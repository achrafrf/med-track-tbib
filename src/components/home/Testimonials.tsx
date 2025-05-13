
export function Testimonials() {
  const testimonials = [
    {
      quote: "Tbib360 has transformed how we manage our clinic. The appointment system alone has saved us countless hours of administrative work.",
      name: "Dr. Sofia Benali",
      title: "Family Physician",
      image: "https://i.pravatar.cc/150?img=32",
    },
    {
      quote: "The electronic prescription feature has significantly reduced medication errors and improved patient satisfaction in our practice.",
      name: "Dr. Karim Alaoui",
      title: "Cardiologist",
      image: "https://i.pravatar.cc/150?img=11",
    },
    {
      quote: "Being able to access patient records instantly has made our consultations more effective and improved our overall quality of care.",
      name: "Dr. Leila Chraibi",
      title: "Pediatrician",
      image: "https://i.pravatar.cc/150?img=23",
    },
  ];

  return (
    <div id="testimonials" className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Healthcare professionals around the country trust Tbib360 to manage their clinics efficiently.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg p-6 border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-center mb-6">
                <svg className="h-8 w-8 text-tbib-300" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 8v6c0 3.314-2.686 6-6 6H4v4h4c5.523 0 10-4.477 10-10V8h-8zm18 0v6c0 3.314-2.686 6-6 6h-0v4h4c5.523 0 10-4.477 10-10V8h-8z"/>
                </svg>
              </div>
              <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
