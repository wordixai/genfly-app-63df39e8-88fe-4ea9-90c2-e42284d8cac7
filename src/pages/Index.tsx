import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroSection } from "@/components/HeroSection";
import { SearchBar } from "@/components/SearchBar";
import { KnowledgeCard } from "@/components/KnowledgeCard";
import { StatsOverview } from "@/components/StatsOverview";

// Mock data
const mockKnowledgeItems = [
  {
    id: "1",
    title: "Deep Learning Fundamentals",
    content: "Comprehensive guide to neural networks, backpropagation, and gradient descent. Covers the mathematical foundations and practical implementations of deep learning algorithms.",
    type: "note" as const,
    tags: ["machine-learning", "deep-learning", "neural-networks"],
    createdAt: "2024-01-15",
  },
  {
    id: "2", 
    title: "The Future of AI by Andrej Karpathy",
    content: "Insightful article about the trajectory of artificial intelligence, discussing large language models, multimodal AI, and the path toward AGI.",
    type: "bookmark" as const,
    tags: ["ai", "future-tech", "research"],
    createdAt: "2024-01-12",
    url: "https://karpathy.ai/future-of-ai",
  },
  {
    id: "3",
    title: "React Server Components Architecture",
    content: "Revolutionary approach to building React applications with server-side rendering capabilities. Reduces bundle size and improves performance significantly.",
    type: "article" as const,
    tags: ["react", "web-development", "performance"],
    createdAt: "2024-01-10",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
  },
  {
    id: "4",
    title: "Biomimetic Design Principles",
    content: "Nature-inspired design patterns that solve complex engineering problems through elegant biological solutions. From shark skin to lotus leaves.",
    type: "inspiration" as const,
    tags: ["design", "biomimetics", "nature"],
    createdAt: "2024-01-08",
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400",
  },
  {
    id: "5",
    title: "Quantum Computing Breakthroughs",
    content: "Recent advances in quantum error correction and the race to achieve quantum supremacy in practical applications beyond cryptography.",
    type: "note" as const,
    tags: ["quantum-computing", "physics", "technology"],
    createdAt: "2024-01-05",
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    mockKnowledgeItems.forEach(item => {
      item.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, []);

  // Filter knowledge items
  const filteredItems = useMemo(() => {
    return mockKnowledgeItems.filter(item => {
      const matchesSearch = searchQuery === "" || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => item.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [searchQuery, selectedTags]);

  // Calculate stats
  const stats = useMemo(() => {
    const itemsByType = filteredItems.reduce((acc, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalItems: filteredItems.length,
      itemsByType
    };
  }, [filteredItems]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search Bar */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
          availableTags={allTags}
        />

        {/* Stats Overview */}
        <StatsOverview 
          totalItems={stats.totalItems}
          itemsByType={stats.itemsByType}
        />

        {/* Knowledge Grid */}
        <motion.div layout className="space-y-6">
          {/* Results Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              Your Knowledge Network
            </h2>
            <span className="text-sm text-muted-foreground">
              {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          {/* Knowledge Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.map(item => (
                <KnowledgeCard key={item.id} {...item} />
              ))}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold mb-2">No knowledge found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filters, or add some new knowledge to get started.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Index;