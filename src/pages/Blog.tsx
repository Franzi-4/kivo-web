import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock, User, ArrowRight, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsletterSubscription from '@/components/NewsletterSubscription';
import { getAllBlogPosts, getCategories, getBlogPostsByCategory } from '@/lib/blog';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredPosts = getBlogPostsByCategory(selectedCategory);
  const categories = getCategories();

  // Update document meta tags for SEO
  useEffect(() => {
    // Update document title
    document.title = "Game Monetization Insights & Tactics | Kivo Games Blog";
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Stay ahead of the curve with expert insights on dynamic pricing, AI personalization, and growing your game revenue. Expert tips from mobile gaming professionals.');
    
    // Update Open Graph tags
    updateMetaTag('og:title', 'Game Monetization Insights & Tactics | Kivo Games Blog');
    updateMetaTag('og:description', 'Stay ahead of the curve with expert insights on dynamic pricing, AI personalization, and growing your game revenue.');
    updateMetaTag('og:type', 'website');
    updateMetaTag('og:url', `${window.location.origin}/blog`);
    updateMetaTag('og:site_name', 'Kivo Games');
    
    // Update Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', 'Game Monetization Insights & Tactics | Kivo Games Blog');
    updateMetaTag('twitter:description', 'Stay ahead of the curve with expert insights on dynamic pricing, AI personalization, and growing your game revenue.');
    
    // Update keywords
    updateMetaTag('keywords', 'mobile game monetization, dynamic pricing, AI personalization, game revenue, player retention, mobile gaming');
  }, []);

  const updateMetaTag = (property: string, content: string) => {
    let metaTag = document.querySelector(`meta[property="${property}"]`) || 
                  document.querySelector(`meta[name="${property}"]`);
    
    if (!metaTag) {
      metaTag = document.createElement('meta');
      if (property.startsWith('og:')) {
        metaTag.setAttribute('property', property);
      } else if (property.startsWith('twitter:')) {
        metaTag.setAttribute('name', property);
      } else {
        metaTag.setAttribute('name', property);
      }
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', content);
  };

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

                    <Button 
                      variant="ghost" 
                      className="w-full group/btn mt-4"
                      asChild
                    >
                      <Link to={`/blog/${post.slug}`}>
                        Read More
                        <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="py-16 px-6 md:px-12 bg-card">
          <div className="max-w-4xl mx-auto">
            <NewsletterSubscription
              title="Get the Latest from Kivo"
              description="Subscribe for actionable insights on AI-driven monetization, dynamic pricing, and studio growth strategies—delivered monthly."
              source="blog"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;