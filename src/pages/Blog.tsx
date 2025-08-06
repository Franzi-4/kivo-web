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
    title: "Maximizing Team Productivity with Modern Task Management",
    excerpt: "Discover how modern task management tools can transform your team's workflow and boost productivity by up to 40%.",
    author: "Sarah Chen",
    date: "2025-01-15",
    readTime: "5 min read",
    category: "Productivity",
    image: "/placeholder.svg",
    tags: ["productivity", "team management", "workflow"]
  },
  {
    id: 2,
    title: "The Psychology Behind Effective Task Organization",
    excerpt: "Understanding the cognitive science behind task organization can help you create systems that stick and reduce mental fatigue.",
    author: "Dr. Michael Rodriguez",
    date: "2025-01-12",
    readTime: "7 min read",
    category: "Psychology",
    image: "/placeholder.svg",
    tags: ["psychology", "organization", "cognitive science"]
  },
  {
    id: 3,
    title: "Remote Team Collaboration: Best Practices for 2025",
    excerpt: "Learn the latest strategies for managing distributed teams and maintaining high levels of collaboration across time zones.",
    author: "Emma Thompson",
    date: "2025-01-10",
    readTime: "6 min read",
    category: "Remote Work",
    image: "/placeholder.svg",
    tags: ["remote work", "collaboration", "team management"]
  },
  {
    id: 4,
    title: "Automating Repetitive Tasks: A Comprehensive Guide",
    excerpt: "Step-by-step guide to identifying and automating repetitive tasks to free up time for more strategic work.",
    author: "Alex Kim",
    date: "2025-01-08",
    readTime: "8 min read",
    category: "Automation",
    image: "/placeholder.svg",
    tags: ["automation", "efficiency", "tools"]
  },
  {
    id: 5,
    title: "Building a Culture of Accountability",
    excerpt: "How to foster a team culture where accountability drives results without creating a blame-focused environment.",
    author: "Jennifer Martinez",
    date: "2025-01-05",
    readTime: "4 min read",
    category: "Leadership",
    image: "/placeholder.svg",
    tags: ["leadership", "accountability", "culture"]
  },
  {
    id: 6,
    title: "The Future of Work: AI and Task Management",
    excerpt: "Exploring how artificial intelligence is reshaping task management and what it means for the future of work.",
    author: "David Wilson",
    date: "2025-01-03",
    readTime: "9 min read",
    category: "Technology",
    image: "/placeholder.svg",
    tags: ["AI", "future of work", "technology"]
  }
];

const categories = ["All", "Productivity", "Psychology", "Remote Work", "Automation", "Leadership", "Technology"];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  
  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

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
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Task Management
              <span className="block text-primary">Insights & Tips</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Expert insights, best practices, and the latest trends in task management and team productivity.
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
                  variant={selectedCategory === category ? "default" : "outline"}
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
                  <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
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
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get the latest insights on task management, productivity tips, and team collaboration delivered to your inbox.
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