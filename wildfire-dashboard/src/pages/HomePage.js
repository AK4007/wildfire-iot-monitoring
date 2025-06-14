import React from 'react';
import AnimatedNavbar from '../components/AnimatedNavbar';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen text-white bg-black">
      <AnimatedNavbar />

      {/* Hero Section with Video Background */}
      <div className="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        >
          <source src="/wildfire.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-bold z-10"
        >
          Real-Time Wildfire Detection & Alerts
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-4 text-lg max-w-xl z-10"
        >
          Empowering communities with live wildfire updates, risk zones, and safety guidance.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-8 flex gap-4 z-10"
        >
          <Link to="/map" className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded text-white font-semibold">View Live Alerts</Link>
          <Link to="/report" className="bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded text-black font-semibold">Report Fire</Link>
        </motion.div>
      </div>

      {/* Section 2 with Scroll Animation */}
      <div className="relative w-full h-screen bg-black">
        <img
          src="/fire-data.jpg"
          alt="Secondary Background"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <motion.div
          className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="max-w-2xl text-lg">
            Our sensors detect environmental changes (smoke, flame, heat), trigger AWS IoT Core, process with Lambda, store in DynamoDB, and alert you instantly.
          </p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl">
            <motion.div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm" whileHover={{ scale: 1.05 }}>🔥 Sensor detects anomaly</motion.div>
            <motion.div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm" whileHover={{ scale: 1.05 }}>☁️ AWS IoT processes data</motion.div>
            <motion.div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm" whileHover={{ scale: 1.05 }}>📢 Alerts shown + sent</motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
