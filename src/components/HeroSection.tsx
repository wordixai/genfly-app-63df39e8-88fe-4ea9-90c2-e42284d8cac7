import { motion } from "framer-motion";
import { Brain, Sparkles, Search, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12 px-4 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Floating Brain Icon */}
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="inline-block mb-6"
        >
          <div className="relative">
            <Brain className="w-16 h-16 text-primary mx-auto animate-glow" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute -top-2 -right-2"
            >
              <Sparkles className="w-6 h-6 text-yellow-500" />
            </motion.div>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
        >
          Your Personal{" "}
          <span className="text-gradient">AI Engine</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          All your notes, bookmarks, inspirations, articles and images in one single, 
          <span className="text-primary font-semibold"> private second brain</span>, 
          accessible anywhere, anytime.
        </motion.p>

        {/* Feature Pills */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {[
            { icon: Search, text: "AI-Powered Search" },
            { icon: Zap, text: "Lightning Fast" },
            { icon: Brain, text: "Smart Organization" }
          ].map((feature, index) => (
            <motion.div
              key={feature.text}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-2 neural-card text-sm"
            >
              <feature.icon className="w-4 h-4 text-primary" />
              <span>{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Brain className="w-5 h-5 mr-2" />
            Start Building Your Second Brain
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};