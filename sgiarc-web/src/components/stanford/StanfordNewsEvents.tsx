import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MaskedReveal from '../animations/MaskedReveal';
import { ArrowRight } from 'lucide-react';

const StanfordNewsEvents: React.FC = () => {
  const news = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80",
      title: "Breakthrough in Biosensing Technology",
      date: "September 15, 2026",
      category: "Research"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80",
      title: "SGIARC Secures DST Grant for IoT Innovations",
      date: "September 10, 2026",
      category: "Grants"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80",
      title: "New AI Framework for Healthcare Diagnostics",
      date: "September 02, 2026",
      category: "Health"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80",
      title: "Researchers Publish High-Impact Findings in Nature",
      date: "August 28, 2026",
      category: "Publication"
    }
  ];

  const events = [
    {
      id: 1,
      day: "24",
      month: "SEP",
      title: "Annual BioMID Symposium",
      location: "Main Auditorium, SSGMCE"
    },
    {
      id: 2,
      day: "15",
      month: "OCT",
      title: "IoT Workshop for Rural Development",
      location: "Innovation Lab 2"
    },
    {
      id: 3,
      day: "10",
      month: "NOV",
      title: "National Conference on Computing",
      location: "Virtual"
    }
  ];

  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container px-4 md:px-12 lg:px-24">
        
        {/* Stanford News Grid */}
        <div className="mb-32">
          <div className="flex justify-between items-end mb-12">
            <MaskedReveal delay={0.1} duration={1}>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-stanford-black">SGIARC News</h2>
            </MaskedReveal>
            <Link to="/news" className="hidden md:inline-flex text-stanford-cardinal font-bold font-sans tracking-wide uppercase text-sm items-center hover:underline">
              More News <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <div className="w-24 h-1 bg-stanford-cardinal mb-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
            {news.map((item, idx) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group cursor-pointer flex flex-col h-full"
              >
                <div className="overflow-hidden mb-6 relative w-full aspect-[4/5] rounded-t-[10rem]">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-[0.16,1,0.3,1]"
                  />
                </div>
                <div className="text-stanford-cardinal font-bold font-sans text-xs uppercase tracking-widest mb-3">
                  {item.category}
                </div>
                <h3 className="text-xl font-serif font-bold text-stanford-black group-hover:text-stanford-cardinal transition-colors leading-snug mb-3">
                  {item.title}
                </h3>
                <p className="text-stanford-coolGrey font-sans text-sm mt-auto font-semibold">
                  {item.date}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stanford Events Grid */}
        <div>
          <div className="flex justify-between items-end mb-12">
            <MaskedReveal delay={0.1} duration={1}>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-stanford-black">Upcoming Events</h2>
            </MaskedReveal>
            <Link to="/events" className="hidden md:inline-flex text-stanford-cardinal font-bold font-sans tracking-wide uppercase text-sm items-center hover:underline">
              More Events <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <div className="w-24 h-1 bg-stanford-cardinal mb-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-gray-200">
            {events.map((event, idx) => (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group cursor-pointer pt-8 flex items-start"
              >
                <div className="flex flex-col items-center mr-6 shrink-0 text-stanford-cardinal">
                  <span className="text-4xl font-serif font-bold leading-none mb-1">{event.day}</span>
                  <span className="text-sm font-bold font-sans uppercase tracking-widest">{event.month}</span>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-stanford-black group-hover:text-stanford-cardinal transition-colors leading-snug mb-2">
                    {event.title}
                  </h3>
                  <p className="text-stanford-coolGrey font-sans text-sm">
                    {event.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default StanfordNewsEvents;
