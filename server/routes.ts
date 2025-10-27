import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema, insertNewsletterSubscriptionSchema } from "@shared/schema";
import { getArticles, getArticleBySlug, getArticlesByCategory } from "./lib/notion";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
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
      res.status(500).json({ error: "Failed to fetch article" });
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
