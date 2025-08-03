import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Bookmark, Lightbulb, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface StatsOverviewProps {
  totalItems: number;
  itemsByType: Record<string, number>;
}

export const StatsOverview = ({ totalItems, itemsByType }: StatsOverviewProps) => {
  const stats = [
    {
      label: "Total Knowledge",
      value: totalItems,
      icon: TrendingUp,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      label: "Notes",
      value: itemsByType.note || 0,
      icon: BookOpen,
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-900/20"
    },
    {
      label: "Bookmarks",
      value: itemsByType.bookmark || 0,
      icon: Bookmark,
      color: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-50 dark:bg-orange-900/20"
    },
    {
      label: "Inspirations",
      value: itemsByType.inspiration || 0,
      icon: Lightbulb,
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-900/20"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="neural-card">
            <CardContent className="p-4 flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};