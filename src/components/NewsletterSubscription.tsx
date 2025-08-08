import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

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

const NewsletterSubscription: React.FC<NewsletterSubscriptionProps> = ({
  title = "Stay Updated",
  description = "Get the latest insights delivered straight to your inbox.",
  source = "website",
  className = ""
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
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
          title: "Success!",
          description: result.message,
          variant: "default",
        });
        
        // Reset success state after 3 seconds
        setTimeout(() => setIsSuccess(false), 3000);
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to subscribe. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Error",
        description: "Network error. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={`text-center p-8 ${className}`}>
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Thank you for subscribing!</h3>
        <p className="text-muted-foreground">
          You'll receive our latest updates and insights soon.
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
      
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <div className="flex-1 relative">
          <Input
            type="email"
            placeholder="Enter your email"
            {...register('email')}
            className={`pr-10 ${errors.email ? 'border-red-500' : ''}`}
            disabled={isSubmitting}
          />
          {errors.email && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <AlertCircle className="w-4 h-4 text-red-500" />
            </div>
          )}
        </div>
        
        <Button 
          type="submit" 
          className="px-8"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Subscribing...
            </>
          ) : (
            'Subscribe'
          )}
        </Button>
      </form>
      
      {errors.email && (
        <p className="text-red-500 text-sm mt-2">
          {errors.email.message}
        </p>
      )}
    </div>
  );
};

export default NewsletterSubscription;


