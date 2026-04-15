import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const Landing = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <img
        src={heroBg}
        alt="Restaurant kitchen"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium tracking-wide mb-6 bg-primary/20 text-primary border border-primary/30 font-body">
            Smart Restaurant Management
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-5xl md:text-7xl font-bold font-display tracking-tight mb-6"
        >
          <span className="text-primary-foreground">RestroHub</span>
          <br />
          <span className="text-gradient">Smart Restaurant</span>
          <br />
          <span className="text-primary-foreground">Management System</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-primary-foreground/70 font-body mb-10 max-w-xl mx-auto"
        >
          Manage orders, payments, and analytics seamlessly — all in one premium dashboard.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button asChild size="lg" className="text-base px-8 py-6 rounded-xl font-body font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
            <Link to="/dashboard">
              Enter Dashboard <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-base px-8 py-6 rounded-xl font-body font-semibold border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm transition-all">
            <Link to="/reports">
              <BarChart3 className="mr-2 h-5 w-5" /> View Reports
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
  );
};

export default Landing;
