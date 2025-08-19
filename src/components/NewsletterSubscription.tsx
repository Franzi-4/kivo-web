import React, { useState, useCallback, memo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';

// Validation schema
const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

interface NewsletterSubscriptionProps {
  title?: string;
  description?: string;
  source?: string;
  className?: string;
}

const NewsletterSubscription: React.FC<NewsletterSubscriptionProps> = memo(({
  title = "Stay Updated",
  description = "Get the latest insights delivered straight to your inbox.",
  source = "website",
  className = ""
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    mode: 'onChange'
  });

  const email = watch('email');
  const hasEmail = email && email.length > 0;

  const onSubmit = useCallback(async (data: NewsletterFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          source
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        reset();
        toast({
          title: "🎉 Welcome aboard!",
          description: result.message || "You're now part of our community!",
          variant: "default",
        });
        
        // Reset success state after 4 seconds
        setTimeout(() => setIsSuccess(false), 4000);
      } else {
        toast({
          title: "Oops! Something went wrong",
          description: result.message || "Failed to subscribe. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Connection Error",
        description: "Please check your internet connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [source, reset, toast]);

  if (isSuccess) {
    return (
      <div className={`text-center p-8 ${className}`}>
        <div className="relative">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-pulse" />
          <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2 animate-bounce" />
        </div>
        <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Welcome to our community! 🚀
        </h3>
        <p className="text-muted-foreground text-lg">
          You'll receive our latest insights and exclusive content soon.
        </p>
      </div>
    );
  }

  return (
    <div className={`text-center ${className}`}>
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
        {description}
      </p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
        <div className="flex-1 relative">
          <Input
            type="email"
            placeholder="Enter your email address"
            {...register('email')}
            className={`pr-10 h-12 text-base transition-all duration-200 
              ${errors.email 
                ? 'border-red-500 ring-red-200 ring-2' 
                : hasEmail && isValid 
                  ? 'border-green-500 ring-green-200 ring-2' 
                  : 'focus:ring-blue-200 focus:ring-2 border-gray-300'
              }`}
            disabled={isSubmitting}
            aria-label="Email address for newsletter subscription"
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
          )}
          {hasEmail && isValid && !errors.email && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
          )}
        </div>
        
        <Button 
          type="submit" 
          size="lg"
          className={`px-8 h-12 font-semibold text-base transition-all duration-300 transform
            bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 
            hover:from-gray-700 hover:via-gray-800 hover:to-gray-900
            hover:scale-105 hover:shadow-lg active:scale-95
            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
            focus:ring-4 focus:ring-gray-300 focus:outline-none
            relative overflow-hidden group
            ${isSubmitting ? 'cursor-not-allowed' : 'cursor-pointer'}
          `}
          disabled={isSubmitting || !isValid}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label={isSubmitting ? 'Subscribing to newsletter...' : 'Subscribe to newsletter'}
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Button content */}
          <div className="relative flex items-center justify-center">
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                <span>Subscribing...</span>
              </>
            ) : (
              <>
                <span className="mr-2">Subscribe</span>
                <ArrowRight className={`w-5 h-5 transition-transform duration-200 ${isHovered ? 'translate-x-1' : ''}`} />
              </>
            )}
          </div>
        </Button>
      </form>
      
      {errors.email && (
        <p id="email-error" className="text-red-500 text-sm mt-3 font-medium">
          {errors.email.message}
        </p>
      )}
      
      {/* Visual enhancement: subtle call-to-action below form */}
      <div className="mt-6 text-xs text-muted-foreground/80">
        🔒 Your email is safe with us. No spam, unsubscribe anytime.
      </div>
    </div>
  );
});

NewsletterSubscription.displayName = 'NewsletterSubscription';

export default NewsletterSubscription;


