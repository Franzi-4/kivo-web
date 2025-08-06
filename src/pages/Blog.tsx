import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock, User, ArrowRight, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const blogPosts = [
  {
    id: 1,
    title: "Dynamic Pricing in Mobile Games: What Works",
    excerpt: "Explore proven strategies and pitfalls in AI-powered in-game pricing to maximize LTV without hurting player experience.",
    author: "Franzi Harzheim",
    date: "2025-07-20",
    readTime: "6 min read",
    category: "Monetization",
    image: "/placeholder.svg",
    tags: ["pricing", "AI", "LTV"]
  },
  {
    id: 2,
    title: "How AI Personalization Drives Retention",
    excerpt: "A deep dive into how personalized offers and player behavior segmentation increase engagement in mobile games.",
    author: "Oscar Nilsson",
    date: "2025-07-15",
    readTime: "5 min read",
    category: "Retention",
    image: "/placeholder.svg",
    tags: ["personalization", "retention", "segments"]
  },
  {
    id: 3,
    title: "From Downloads to Dollars: Monetizing Early Users",
    excerpt: "Your first 1000 players matter most. Here's how to optimize monetization early using behavioral signals.",
    author: "Kivo Team",
    date: "2025-07-12",
    readTime: "7 min read",
    category: "Early Stage",
    image: "/placeholder.svg",
    tags: ["early access", "monetization", "startup"]
  },
  {
    id: 4,
    title: "Choosing the Right Pricing Model for Your Game",
    excerpt: "Freemium, subscription, battle pass, or hybrid? We break down which monetization models work best and why.",
    author: "Franzi Harzheim",
    date: "2025-07-09",
    readTime: "8 min read",
    category: "Strategy",
    image: "/placeholder.svg",
    tags: ["pricing models", "strategy", "F2P"]
  },
  {
    id: 5,
    title: "Why Most A/B Tests in Games Fail",
    excerpt: "Learn how to design statistically sound experiments that actually help improve monetization decisions.",
    author: "Oscar Nilsson",
    date: "2025-07-07",
    readTime: "6 min read",
    category: "Data",
    image: "/placeholder.svg",
    tags: ["experimentation", "A/B testing", "metrics"]
  },
  {
    id: 6,
    title: "What Studios Get Wrong About Paywalls",
    excerpt: "Common mistakes studios make when designing paywalls—and how AI can help fix them.",
    author: "Kivo Team",
    date: "2025-07-03",
    readTime: "5 min read",
    category: "UX",
    image: "/placeholder.svg",
    tags: ["paywalls", "UX", "monetization"]
  }
];

const categories = ["All", "Monetization", "Retention", "Strategy", "Data", "UX", "Early Stage"];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-6 md:px-12 cosmic-gradient cosmic-grid">
          <div className="max-w-4xl mx-auto text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>

            <h1 className="text-4xl md:text-6xl mb-6 text-balance font-medium">
              Game Monetization
              <span className="block text-primary font-medium">Insights & Tactics</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Stay ahead of the curve with expert insights on dynamic pricing, AI personalization, and growing your game revenue.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 px-6 md:px-12 border-b border-border">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="cosmic-card hover:scale-105 transition-transform duration-300 group">
                  <CardHeader className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="rounded-full">
                        {post.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock size={12} />
                        {post.readTime}
                      </div>
                    </div>

                    <CardTitle className="text-xl leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User size={14} />
                        <span>{post.author}</span>
                      </div>

                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <CalendarDays size={14} />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs rounded-full">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <Button variant="ghost" className="w-full group/btn mt-4">
                      Read More
                      <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="py-16 px-6 md:px-12 bg-card">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Get the Latest from Kivo</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Subscribe for actionable insights on AI-driven monetization, dynamic pricing, and studio growth strategies—delivered monthly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button className="px-8">Subscribe</Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;