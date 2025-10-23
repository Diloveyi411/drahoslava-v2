import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Mail, CheckCircle } from 'lucide-react';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = (data: ContactFormData) => {
    console.log('Contact form submitted:', data);
    setIsSubmitted(true);
    toast({
      title: 'Message sent!',
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    form.reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-card">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-4"
            data-testid="text-contact-title"
          >
            Get in Touch
          </h2>
          <p className="text-lg text-muted-foreground" data-testid="text-contact-subtitle">
            Ready to begin your creative healing journey? Send me a message and let's connect.
          </p>
        </div>

        {isSubmitted ? (
          <div className="text-center p-12 bg-background rounded-2xl" data-testid="message-success">
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-foreground mb-2">Thank You!</h3>
            <p className="text-muted-foreground">
              Your message has been received. I'll respond within 24-48 hours.
            </p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          {...field}
                          data-testid="input-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          {...field}
                          data-testid="input-email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-subject">
                          <SelectValue placeholder="What would you like to discuss?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="painting-meditation">Painting Meditations</SelectItem>
                        <SelectItem value="one-on-one">1-on-1 Session</SelectItem>
                        <SelectItem value="workshop">Workshop Inquiry</SelectItem>
                        <SelectItem value="commission">Commission Request</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell me about what brings you here..."
                        className="min-h-[150px] resize-none"
                        {...field}
                        data-testid="input-message"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={form.formState.isSubmitting}
                data-testid="button-submit"
              >
                {form.formState.isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </Form>
        )}
      </div>
    </section>
  );
}
