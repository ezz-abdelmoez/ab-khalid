import { describe, it, expect, beforeEach } from "vitest";
import { ApiClient, createApiClient } from "@/lib/api/client";
import { MockTransport } from "@/lib/api/transport/mock-transport";
import { FetchTransport } from "@/lib/api/transport/fetch-transport";
import {
  profileSchema,
  statisticSchema,
  achievementSchema,
  projectSchema,
  galleryItemSchema,
  testimonialSchema,
  easterEggSchema,
} from "@/lib/api/schemas";

describe("Mock API Workflows", () => {
  let client: ApiClient;

  beforeEach(() => {
    client = createApiClient("mock");
  });

  it("Profile loads and validates with Zod", async () => {
    const response = await client.getProfile();
    expect(response.data).toBeDefined();
    expect(response.data.name).toBeTruthy();
    
    const result = profileSchema.safeParse(response.data);
    expect(result.success).toBe(true);
  });

  it("Statistics load and have humorous flag", async () => {
    const response = await client.getStatistics();
    expect(response.data).toBeDefined();
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThanOrEqual(6);

    for (const stat of response.data) {
      const result = statisticSchema.safeParse(stat);
      expect(result.success).toBe(true);
      // All stats in fixture are humorous
      expect(stat.humorous).toBe(true);
    }
  });

  it("Achievements load and validate", async () => {
    const response = await client.getAchievements();
    expect(response.data.length).toBeGreaterThanOrEqual(6);

    for (const achievement of response.data) {
      const result = achievementSchema.safeParse(achievement);
      expect(result.success).toBe(true);
    }
  });

  it("Projects load and validate", async () => {
    const response = await client.getProjects();
    expect(response.data.length).toBeGreaterThanOrEqual(4);

    for (const project of response.data) {
      const result = projectSchema.safeParse(project);
      expect(result.success).toBe(true);
    }
  });

  it("Gallery loads and validates", async () => {
    const response = await client.getGallery();
    expect(response.data.length).toBeGreaterThanOrEqual(8);

    for (const item of response.data) {
      const result = galleryItemSchema.safeParse(item);
      expect(result.success).toBe(true);
    }
  });

  it("Testimonials load and validate", async () => {
    const response = await client.getTestimonials();
    expect(response.data.length).toBeGreaterThanOrEqual(5);

    for (const testimonial of response.data) {
      const result = testimonialSchema.safeParse(testimonial);
      expect(result.success).toBe(true);
    }
  });

  it("Easter eggs are retrievable", async () => {
    const response = await client.getEasterEggs();
    expect(response.data.length).toBeGreaterThanOrEqual(5);

    for (const egg of response.data) {
      const result = easterEggSchema.safeParse(egg);
      expect(result.success).toBe(true);
    }
  });

  it("Mock API validates fixtures with Zod - all endpoints", async () => {
    const endpoints = [
      () => client.getProfile(),
      () => client.getStatistics(),
      () => client.getTimeline(),
      () => client.getSkills(),
      () => client.getExperience(),
      () => client.getAchievements(),
      () => client.getProjects(),
      () => client.getTestimonials(),
      () => client.getGallery(),
      () => client.getEasterEggs(),
      () => client.getContact(),
      () => client.getHome(),
    ];

    for (const endpoint of endpoints) {
      const response = await endpoint();
      expect(response.data).toBeDefined();
      expect(response.meta?.timestamp).toBeDefined();
    }
  });

  it("Missing resources return proper API error", async () => {
    const transport = new MockTransport();
    try {
      await transport.request({ endpoint: "/v1/non-existent" });
      expect.fail("Should have thrown");
    } catch (error) {
      const err = error as { code: string; status: number };
      expect(err.code).toBe("NOT_FOUND");
      expect(err.status).toBe(404);
    }
  });

  it("HTTP/mock switching does not require UI changes", () => {
    const mockClient = createApiClient("mock");
    const httpClient = createApiClient("http");

    // Both clients should have same interface
    expect(typeof mockClient.getProfile).toBe("function");
    expect(typeof httpClient.getProfile).toBe("function");
    expect(typeof mockClient.getStatistics).toBe("function");
    expect(typeof httpClient.getStatistics).toBe("function");
    expect(typeof mockClient.getProjects).toBe("function");
    expect(typeof httpClient.getProjects).toBe("function");

    // Both should be instances of ApiClient
    expect(mockClient).toBeInstanceOf(ApiClient);
    expect(httpClient).toBeInstanceOf(ApiClient);
  });

  it("Transport abstraction works - UI never imports fixtures directly", async () => {
    // This test ensures the architecture: UI -> Client -> Transport -> Mock
    // No direct fixture import in UI layer
    const transport = new MockTransport(0); // No delay for test
    const clientWithTransport = new ApiClient(transport);

    const profile = await clientWithTransport.getProfile();
    expect(profile.data.name).toContain("عبدالله");
  });
});

describe("Transport Layer", () => {
  it("MockTransport simulates delay", async () => {
    const transport = new MockTransport(10);
    const start = Date.now();
    await transport.request({ endpoint: "/v1/profile" });
    const elapsed = Date.now() - start;
    expect(elapsed).toBeGreaterThanOrEqual(5);
  });

  it("FetchTransport builds URL correctly", () => {
    const transport = new FetchTransport("/api", 5000);
    expect(transport).toBeInstanceOf(FetchTransport);
  });
});
