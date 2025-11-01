import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema, insertNewsletterSubscriptionSchema } from "@shared/schema";
import { getArticles, getArticleBySlug, getArticlesByCategory } from "./lib/notion";
import { getUncachableResendClient } from "./lib/resend-client";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      
      // Send email notification via Resend
      try {
        console.log('Attempting to send email via Resend...');
        const { client, fromEmail } = await getUncachableResendClient();
        console.log('Resend client initialized, from email:', fromEmail);
        
        // Sanitize text to prevent control characters and header injection
        const sanitizeText = (text: string) => {
          return text.replace(/[\r\n\t\0\x0B\x0C]/g, ' ').trim();
        };
        
        // Escape HTML to prevent injection
        const escapeHtml = (text: string) => {
          return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
        };
        
        const safeName = escapeHtml(validatedData.name);
        const safeEmail = escapeHtml(validatedData.email);
        const safeSubject = escapeHtml(validatedData.subject);
        const safeMessage = escapeHtml(validatedData.message).replace(/\n/g, '<br>');
        
        // Sanitize subject for email header (remove control characters)
        const emailSubject = sanitizeText(`New Contact Form Message: ${validatedData.subject}`);
        
        console.log('Sending email to: info@drahoslava.com');
        const result = await client.emails.send({
          from: fromEmail,
          to: 'info@drahoslava.com',
          subject: emailSubject,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Subject:</strong> ${safeSubject}</p>
            <p><strong>Message:</strong></p>
            <p>${safeMessage}</p>
          `,
          text: `
New Contact Form Submission

From: ${sanitizeText(validatedData.name)}
Email: ${sanitizeText(validatedData.email)}
Subject: ${sanitizeText(validatedData.subject)}

Message:
${validatedData.message}
          `
        });
        console.log('Email sent successfully via Resend:', result);
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        console.error('Email error details:', JSON.stringify(emailError, null, 2));
        // Don't fail the request if email fails
      }
      
      res.json(message);
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  app.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = insertNewsletterSubscriptionSchema.parse(req.body);
      
      const existingSubscription = await storage.getNewsletterSubscriptionByEmail(validatedData.email);
      if (existingSubscription) {
        return res.status(409).json({ error: "Email already subscribed" });
      }

      const subscription = await storage.createNewsletterSubscription(validatedData);
      res.json(subscription);
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  app.get("/api/newsletter/articles", async (req, res) => {
    try {
      const articles = await getArticles();
      res.json(articles);
    } catch (error) {
      console.error('Error fetching articles:', error);
      const message = error instanceof Error ? error.message : "Failed to fetch articles";
      res.status(502).json({ error: message });
    }
  });

  app.get("/api/newsletter/articles/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const article = await getArticleBySlug(slug);
      
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }
      
      res.json(article);
    } catch (error) {
      console.error('Error fetching article:', error);
      const message = error instanceof Error ? error.message : "Failed to fetch article";
      res.status(502).json({ error: message });
    }
  });

  app.get("/api/newsletter/articles/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const articles = await getArticlesByCategory(category);
      res.json(articles);
    } catch (error) {
      console.error('Error fetching articles by category:', error);
      const message = error instanceof Error ? error.message : "Failed to fetch articles";
      res.status(502).json({ error: message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
