import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Plus, Brain } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  availableTags: string[];
}

export const SearchBar = ({ 
  searchQuery, 
  onSearchChange, 
  selectedTags, 
  onTagToggle, 
  availableTags 
}: SearchBarProps) => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Main Search Bar */}
      <div className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search your neural network..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 h-12 text-base search-glow border-0 bg-card/80 backdrop-blur-sm"
            />
          </div>
          
          <Button 
            onClick={() => setShowFilters(!showFilters)}
            variant={showFilters ? "default" : "outline"}
            size="lg"
            className="px-4 neural-card border-0"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          
          <Button 
            size="lg"
            className="px-4 bg-primary hover:bg-primary/90 text-white shadow-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Knowledge
          </Button>
        </div>

        {/* AI Search Suggestion */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: searchQuery ? 1 : 0 }}
          className="absolute top-full left-0 right-0 mt-2 p-3 neural-card bg-card/95 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Brain className="w-4 h-4 text-primary animate-pulse-neural" />
            <span>AI suggests searching in <strong>Machine Learning</strong> and <strong>Data Science</strong> categories</span>
          </div>
        </motion.div>
      </div>

      {/* Filter Tags */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="w-4 h-4" />
              Filter by tags:
            </div>
            
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <motion.div
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge
                    variant={selectedTags.includes(tag) ? "default" : "secondary"}
                    className="cursor-pointer transition-all hover:shadow-md"
                    onClick={() => onTagToggle(tag)}
                  >
                    {tag}
                  </Badge>
                </motion.div>
              ))}
            </div>

            {selectedTags.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {selectedTags.map((tag) => (
                  <Badge key={tag} variant="default" className="gap-1">
                    {tag}
                    <button 
                      onClick={() => onTagToggle(tag)}
                      className="ml-1 hover:bg-primary-foreground/20 rounded-full p-0.5"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};