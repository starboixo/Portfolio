"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "Gaming Analytics & BI",
    role: "Data Analyst @ Ubisoft",
    desc: "Designed 10+ KPI dashboards and analyzed 15M+ row datasets to identify revenue drivers and performance gaps.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Strategic Business Simulation",
    role: "MSc Business Analytics & Management Science",
    desc: "Developed complex business models using AnyLogic simulations to test operational scenarios and assess risk.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Operational Reporting",
    role: "Data Analyst @ Kuber Enterprise",
    desc: "Implemented management dashboards tracking 8+ KPIs to effectively support data-driven strategic decisions.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "IoT Solar Tracker System",
    role: "Engineering Project",
    desc: "Designed an automated Arduino-based tracking system optimizing efficiency using a data-driven control loop.",
    image: "/projects/iot_solar.png"
  }
];

export default function Projects() {
  return (
    <section className="relative z-20 min-h-screen bg-[#0a0a0a] py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto space-y-16">
        
        <div className="space-y-4">
            <h3 className="text-sm font-bold tracking-[0.2em] text-neutral-500 uppercase">Selected Works</h3>
            <h2 className="text-4xl md:text-5xl font-semibold text-white">Experience & Projects</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((proj, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative flex flex-col gap-4"
            >
              {/* Image Container w/ Glass hover effect */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800 transition-all duration-500 group-hover:border-neutral-600">
                <img 
                  src={proj.image} 
                  alt={proj.title} 
                  className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100"
                />
                
                {/* Glow Ring Overlay */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-white/30 transition-all duration-500 pointer-events-none" />
              </div>
              
              {/* Info Container */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                    <h4 className="text-2xl font-medium text-white group-hover:text-blue-400 transition-colors duration-300">{proj.title}</h4>
                    <span className="text-xs tracking-wider text-neutral-500 uppercase">{proj.role}</span>
                </div>
                <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-sm">
                  {proj.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
