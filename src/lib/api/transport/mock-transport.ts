import type { ApiTransport, TransportRequest, TransportResponse, TransportError } from "./types";
import profileFixture from "../mock/fixtures/profile.json";
import statisticsFixture from "../mock/fixtures/statistics.json";
import timelineFixture from "../mock/fixtures/timeline.json";
import skillsFixture from "../mock/fixtures/skills.json";
import experienceFixture from "../mock/fixtures/experience.json";
import achievementsFixture from "../mock/fixtures/achievements.json";
import projectsFixture from "../mock/fixtures/projects.json";
import testimonialsFixture from "../mock/fixtures/testimonials.json";
import galleryFixture from "../mock/fixtures/gallery.json";
import easterEggsFixture from "../mock/fixtures/easter-eggs.json";
import contactFixture from "../mock/fixtures/contact.json";
import homeFixture from "../mock/fixtures/home.json";

import {
  profileSchema,
  statisticSchema,
  timelineItemSchema,
  skillSchema,
  experienceSchema,
  achievementSchema,
  projectSchema,
  testimonialSchema,
  galleryItemSchema,
  easterEggSchema,
  contactSchema,
  homeSchema,
  validateFixture,
} from "../schemas";

type FixtureMap = Record<string, unknown>;

const fixtures: FixtureMap = {
  "/v1/profile": profileFixture,
  "/v1/statistics": statisticsFixture,
  "/v1/timeline": timelineFixture,
  "/v1/skills": skillsFixture,
  "/v1/experience": experienceFixture,
  "/v1/achievements": achievementsFixture,
  "/v1/projects": projectsFixture,
  "/v1/testimonials": testimonialsFixture,
  "/v1/gallery": galleryFixture,
  "/v1/easter-eggs": easterEggsFixture,
  "/v1/contact": contactFixture,
  "/v1/home": homeFixture,
};

const validators: Record<string, (data: unknown) => unknown> = {
  "/v1/profile": (d) => validateFixture(profileSchema, d, "profile"),
  "/v1/statistics": (d) => {
    const arr = d as unknown[];
    return arr.map((item) => validateFixture(statisticSchema, item, "statistics"));
  },
  "/v1/timeline": (d) => {
    const arr = d as unknown[];
    return arr.map((item) => validateFixture(timelineItemSchema, item, "timeline"));
  },
  "/v1/skills": (d) => {
    const arr = d as unknown[];
    return arr.map((item) => validateFixture(skillSchema, item, "skills"));
  },
  "/v1/experience": (d) => {
    const arr = d as unknown[];
    return arr.map((item) => validateFixture(experienceSchema, item, "experience"));
  },
  "/v1/achievements": (d) => {
    const arr = d as unknown[];
    return arr.map((item) => validateFixture(achievementSchema, item, "achievements"));
  },
  "/v1/projects": (d) => {
    const arr = d as unknown[];
    return arr.map((item) => validateFixture(projectSchema, item, "projects"));
  },
  "/v1/testimonials": (d) => {
    const arr = d as unknown[];
    return arr.map((item) => validateFixture(testimonialSchema, item, "testimonials"));
  },
  "/v1/gallery": (d) => {
    const arr = d as unknown[];
    return arr.map((item) => validateFixture(galleryItemSchema, item, "gallery"));
  },
  "/v1/easter-eggs": (d) => {
    const arr = d as unknown[];
    return arr.map((item) => validateFixture(easterEggSchema, item, "easter-eggs"));
  },
  "/v1/contact": (d) => validateFixture(contactSchema, d, "contact"),
  "/v1/home": (d) => validateFixture(homeSchema, d, "home"),
};

function simulateDelay(ms = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class MockTransport implements ApiTransport {
  private latency: number;

  constructor(latency = 250) {
    this.latency = latency;
  }

  async request<T>(req: TransportRequest): Promise<TransportResponse<T>> {
    const endpoint = req.endpoint.replace(/\/$/, "");
    
    // Normalize endpoint - remove query and ensure starts with /v1/
    const cleanEndpoint = endpoint.split("?")[0];

    await simulateDelay(this.latency + Math.random() * 200);

    const fixture = fixtures[cleanEndpoint];

    if (!fixture) {
      const error: TransportError = {
        code: "NOT_FOUND",
        message: `البيانات غير موجودة: ${cleanEndpoint}`,
        status: 404,
      };
      throw error;
    }

    // Validate fixture
    const validator = validators[cleanEndpoint];
    if (validator) {
      try {
        const validated = validator(fixture);
        return {
          data: {
            data: validated,
            meta: {
              timestamp: new Date().toISOString(),
              total: Array.isArray(validated) ? validated.length : undefined,
            },
          } as unknown as T,
          status: 200,
        };
      } catch (err) {
        const error: TransportError = {
          code: "VALIDATION_ERROR",
          message: `خطأ في التحقق من البيانات: ${cleanEndpoint}`,
          status: 500,
          details: err,
        };
        throw error;
      }
    }

    return {
      data: {
        data: fixture,
        meta: {
          timestamp: new Date().toISOString(),
        },
      } as unknown as T,
      status: 200,
    };
  }
}

export const mockTransport = new MockTransport();
