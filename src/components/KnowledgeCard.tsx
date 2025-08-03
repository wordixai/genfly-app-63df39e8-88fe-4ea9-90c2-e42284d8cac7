import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, ExternalLink, Tag, Calendar, Brain, Zap, Bookmark } from "lucide-react";
import { motion } from "framer-motion";

interface KnowledgeCardProps {
  id: string;
  title: string;
  content: string;
  type: 'note' | 'bookmark' | 'article' | 'inspiration' | 'image';
  tags: string[];
  createdAt: string;
  url?: string;
  imageUrl?: string;
}

const typeIcons = {
  note: BookOpen,
  bookmark: Bookmark,
  article: ExternalLink,
  inspiration: Zap,
  image: Brain
};

const typeColors = {
  note: "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300",
  bookmark: "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300",
  article: "bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300",
  inspiration: "bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300",
  image: "bg-pink-50 text-pink-700 dark:bg-pink-900/20 dark:text-pink-300"
};

export const KnowledgeCard = ({ title, content, type, tags, createdAt, url, imageUrl }: KnowledgeCardProps) => {
  const IconComponent = typeIcons[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="neural-card group cursor-pointer h-full overflow-hidden">
        {imageUrl && (
          <div className="aspect-video w-full overflow-hidden">
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
            <Badge className={`${typeColors[type]} shrink-0`}>
              <IconComponent className="w-3 h-3 mr-1" />
              {type}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pt-0 space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {content}
          </p>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  <Tag className="w-2.5 h-2.5 mr-1" />
                  {tag}
                </Badge>
              ))}
              {tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="w-3 h-3 mr-1" />
              {createdAt}
            </div>
            
            {url && (
              <Button 
                size="sm" 
                variant="ghost" 
                className="opacity-0 group-hover:opacity-100 transition-opacity h-7 px-2"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(url, '_blank');
                }}
              >
                <ExternalLink className="w-3 h-3" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};