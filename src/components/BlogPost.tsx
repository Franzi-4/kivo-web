import React, { useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { CalendarDays, Clock, User, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getBlogPost, getRelatedPosts, getMetaDescription, getSEOKeywords } from '@/lib/blog';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsletterSubscription from '@/components/NewsletterSubscription';
import MarkdownRenderer from '@/components/MarkdownRenderer';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : undefined;

  // Update document meta tags for SEO
  useEffect(() => {
    if (post) {
      // Update document title
      document.title = `${post.title} | Kivo Games Blog`;
      
      // Update meta description with optimized content
      const optimizedDescription = getMetaDescription(post.slug);
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', optimizedDescription);
      
      // Update Open Graph tags
      updateMetaTag('og:title', post.title);
      updateMetaTag('og:description', optimizedDescription);
      updateMetaTag('og:type', 'article');
      updateMetaTag('og:url', `${window.location.origin}/blog/${post.slug}`);
      updateMetaTag('og:image', post.image);
      updateMetaTag('og:site_name', 'Kivo Games');
      
      // Update Twitter Card tags
      updateMetaTag('twitter:card', 'summary_large_image');
      updateMetaTag('twitter:title', post.title);
      updateMetaTag('twitter:description', optimizedDescription);
      updateMetaTag('twitter:image', post.image);
      
      // Update article-specific meta tags
      updateMetaTag('article:author', post.author);
      updateMetaTag('article:published_time', new Date(post.date).toISOString());
      updateMetaTag('article:section', post.category);
      
      // Update keywords with SEO-optimized keywords
      const seoKeywords = getSEOKeywords(post.slug);
      const allKeywords = [...seoKeywords, ...post.tags].join(', ');
      updateMetaTag('keywords', allKeywords);
      
      // Add structured data for better SEO
      addStructuredData(post);
    }
  }, [post]);

  const updateMetaTag = (property: string, content: string) => {
    let metaTag = document.querySelector(`meta[property="${property}"]`) || 
                  document.querySelector(`meta[name="${property}"]`);
    
    if (!metaTag) {
      metaTag = document.createElement('meta');
      if (property.startsWith('og:')) {
        metaTag.setAttribute('property', property);
      } else if (property.startsWith('twitter:')) {
        metaTag.setAttribute('name', property);
      } else if (property.startsWith('article:')) {
        metaTag.setAttribute('property', property);
      } else {
        metaTag.setAttribute('name', property);
      }
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', content);
  };

  const addStructuredData = (post: any) => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: getMetaDescription(post.slug),
      author: {
        "@type": "Person",
        name: post.author
      },
      publisher: {
        "@type": "Organization",
        name: "Kivo Games",
        logo: {
          "@type": "ImageObject",
          url: `${window.location.origin}/favicon.ico`
        }
      },
      datePublished: new Date(post.date).toISOString(),
      dateModified: new Date(post.date).toISOString(),
      url: `${window.location.origin}/blog/${post.slug}`,
      image: post.image,
      keywords: [...getSEOKeywords(post.slug), ...post.tags].join(', '),
      articleSection: post.category,
      wordCount: post.content.split(' ').length
    };

    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
  };

  if (!post) {
    return <Navigate to="/blog" replace />;
  }



  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-6 md:px-12 cosmic-gradient cosmic-grid">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              Back to Blog
            </Link>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <Badge variant="secondary" className="rounded-full">
                  {post.category}
                </Badge>
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  {post.readTime}
                </div>
                <div className="flex items-center gap-1">
                  <CalendarDays size={14} />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-medium text-balance leading-tight">
                {post.title}
              </h1>

              <p className="text-xl text-muted-foreground text-balance max-w-3xl">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-4 pt-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User size={16} />
                  <span>{post.author}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="py-16 px-6 md:px-12 bg-background">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-lg border border-border/5 shadow-sm p-8 md:p-12">
              <MarkdownRenderer content={post.content} />
            </div>

            <Separator className="my-12" />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="rounded-full">
                  #{tag}
                </Badge>
              ))}
            </div>

            {/* Author Bio */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="text-lg font-semibold mb-2">About the Author</h3>
              <p className="text-muted-foreground">

                {post.author === "Oscar Nilsson" && 
                  "Oscar is a data scientist and retention specialist who has helped dozens of studios improve their player engagement through AI personalization."
                }
                {post.author === "Oscar Kerscher" && 
                  "Oscar is an AI analytics specialist with deep expertise in behavioral segmentation and player retention optimization for mobile games."
                }
                {post.author === "Prayag Scharma" && 
                  "Prayag is a monetization strategist specializing in early-stage game revenue optimization and behavioral analytics."
                }
                {post.author === "Kivo Team" && 
                  "The Kivo team consists of industry veterans who have collectively helped over 100+ mobile game studios optimize their monetization strategies."
                }
              </p>
            </div>
          </div>
        </article>

        {/* Related Posts Section */}
        {getRelatedPosts(post.slug).length > 0 && (
          <section className="py-16 px-6 md:px-12 bg-muted/50">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-semibold mb-8 text-center">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {getRelatedPosts(post.slug, 3).map((relatedPost) => {
                  const fullPost = getBlogPost(relatedPost.slug);
                  if (!fullPost) return null;

                  return (
                    <div key={relatedPost.slug} className="cosmic-card p-6 hover:scale-105 transition-transform duration-300 group">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="rounded-full">
                            {fullPost.category}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock size={12} />
                            {fullPost.readTime}
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                          {fullPost.title}
                        </h3>

                        <p className="text-muted-foreground line-clamp-3 text-sm">
                          {fullPost.excerpt}
                        </p>

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <User size={12} />
                            <span>{fullPost.author}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(fullPost.date).toLocaleDateString()}
                          </span>
                        </div>

                        <Button 
                          variant="ghost" 
                          className="w-full group/btn mt-4 text-sm"
                          asChild
                        >
                          <Link to={`/blog/${fullPost.slug}`}>
                            Read More
                            <ArrowLeft size={14} className="ml-2 rotate-180 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Newsletter Subscription */}
        <section className="py-16 px-6 md:px-12 bg-card">
          <div className="max-w-4xl mx-auto">
            <NewsletterSubscription
              title="Get More Insights Like This"
              description="Subscribe to our newsletter for actionable tips on AI-driven monetization, dynamic pricing, and studio growth strategies."
              source="blog-post"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
