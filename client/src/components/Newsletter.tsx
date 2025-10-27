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
import emailjs from '@emailjs/browser';

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
    onSuccess: async (_, variables) => {
      setIsSubscribed(true);
      
      // Send welcome email via EmailJS
      try {
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_SIGNUP;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        console.log('EmailJS Config Check:', {
          hasServiceId: !!serviceId,
          hasTemplateId: !!templateId,
          hasPublicKey: !!publicKey,
          serviceId: serviceId?.substring(0, 10) + '...',
          templateId: templateId?.substring(0, 10) + '...',
        });

        if (serviceId && templateId && publicKey) {
          emailjs.init(publicKey);
          
          const templateParams = {
            to_email: variables.email,
            user_email: variables.email,
          };
          
          console.log('Sending email with params:', { to_email: variables.email });
          
          const response = await emailjs.send(
            serviceId,
            templateId,
            templateParams
          );
          
          console.log('EmailJS Success:', response);
        } else {
          console.error('Missing EmailJS configuration');
        }
      } catch (emailError: any) {
        console.error('Error sending welcome email:', emailError);
        console.error('EmailJS Error Details:', {
          status: emailError.status,
          text: emailError.text,
          message: emailError.message,
        });
        // Don't show error to user since subscription was successful
      }

      toast({
        title: 'Subscribed!',
        description: 'Thank you for joining our community. Check your inbox for a welcome message.',
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
    <section id="newsletter" className="py-20 bg-primary/5">
      <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
        <Mail className="h-10 w-10 text-primary mx-auto mb-4" />
        <h2
          className="font-serif text-3xl md:text-4xl font-light text-foreground mb-3"
          data-testid="text-newsletter-title"
        >
          Stay in Touch
        </h2>
        <p className="text-muted-foreground mb-8" data-testid="text-newsletter-description">
          A thoughtful newsletter on art, psychology, and digital creation.
        </p>

        {isSubscribed ? (
          <div className="p-6 bg-background rounded-lg glass-card" data-testid="message-subscribed">
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
