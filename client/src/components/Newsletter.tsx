import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Mail } from 'lucide-react';
import { insertNewsletterSubscriptionSchema } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';

const newsletterSchema = insertNewsletterSubscriptionSchema;

type NewsletterFormData = typeof newsletterSchema._type;

export default function Newsletter() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const form = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: NewsletterFormData) => {
      return await apiRequest('POST', '/api/newsletter', data);
    },
    onSuccess: () => {
      setIsSubscribed(true);
      toast({
        title: 'Subscribed!',
        description: 'Thank you for joining our community.',
      });
      form.reset();
    },
    onError: (error: any) => {
      const message = error.message?.includes('already subscribed') 
        ? 'This email is already subscribed.'
        : 'Failed to subscribe. Please try again.';
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: NewsletterFormData) => {
    mutation.mutate(data);
  };

  return (
    <section className="py-20 bg-primary/5">
      <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
        <Mail className="h-10 w-10 text-primary mx-auto mb-4" />
        <h2
          className="font-serif text-3xl md:text-4xl font-light text-foreground mb-3"
          data-testid="text-newsletter-title"
        >
          Stay Connected
        </h2>
        <p className="text-muted-foreground mb-8" data-testid="text-newsletter-description">
          Receive updates on new workshops, art releases, and insights on creative healing. No spam, just good vibes.
        </p>

        {isSubscribed ? (
          <div className="p-6 bg-background rounded-lg" data-testid="message-subscribed">
            <p className="text-foreground font-medium">Thank you for subscribing! 🎨</p>
            <p className="text-sm text-muted-foreground mt-1">Check your inbox for a welcome message.</p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                        data-testid="input-newsletter-email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={mutation.isPending} data-testid="button-subscribe">
                {mutation.isPending ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </Form>
        )}
      </div>
    </section>
  );
}
