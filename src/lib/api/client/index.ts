import { apiConfig } from "../config";
import { MockTransport } from "../transport/mock-transport";
import { FetchTransport } from "../transport/fetch-transport";
import type { ApiTransport, TransportRequest } from "../transport/types";
import type {
  ProfileDto,
  StatisticDto,
  TimelineItemDto,
  SkillDto,
  ExperienceDto,
  AchievementDto,
  ProjectDto,
  TestimonialDto,
  GalleryItemDto,
  EasterEggDto,
  ContactDto,
  HomeDto,
  ApiResponse,
} from "../contracts";

export class ApiClient {
  private transport: ApiTransport;

  constructor(transport?: ApiTransport) {
    if (transport) {
      this.transport = transport;
    } else {
      this.transport = apiConfig.mode === "http" ? new FetchTransport() : new MockTransport();
    }
  }

  private async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    const request: TransportRequest = {
      endpoint,
      method: "GET",
    };
    const response = await this.transport.request<ApiResponse<T>>(request);
    return response.data;
  }

  // Endpoints as defined in spec
  async getHome(): Promise<ApiResponse<HomeDto>> {
    return this.get<HomeDto>("/v1/home");
  }

  async getProfile(): Promise<ApiResponse<ProfileDto>> {
    return this.get<ProfileDto>("/v1/profile");
  }

  async getStatistics(): Promise<ApiResponse<StatisticDto[]>> {
    return this.get<StatisticDto[]>("/v1/statistics");
  }

  async getTimeline(): Promise<ApiResponse<TimelineItemDto[]>> {
    return this.get<TimelineItemDto[]>("/v1/timeline");
  }

  async getSkills(): Promise<ApiResponse<SkillDto[]>> {
    return this.get<SkillDto[]>("/v1/skills");
  }

  async getExperience(): Promise<ApiResponse<ExperienceDto[]>> {
    return this.get<ExperienceDto[]>("/v1/experience");
  }

  async getAchievements(): Promise<ApiResponse<AchievementDto[]>> {
    return this.get<AchievementDto[]>("/v1/achievements");
  }

  async getProjects(): Promise<ApiResponse<ProjectDto[]>> {
    return this.get<ProjectDto[]>("/v1/projects");
  }

  async getTestimonials(): Promise<ApiResponse<TestimonialDto[]>> {
    return this.get<TestimonialDto[]>("/v1/testimonials");
  }

  async getGallery(): Promise<ApiResponse<GalleryItemDto[]>> {
    return this.get<GalleryItemDto[]>("/v1/gallery");
  }

  async getEasterEggs(): Promise<ApiResponse<EasterEggDto[]>> {
    return this.get<EasterEggDto[]>("/v1/easter-eggs");
  }

  async getContact(): Promise<ApiResponse<ContactDto>> {
    return this.get<ContactDto>("/v1/contact");
  }
}

// Singleton instance - UI never imports fixtures directly, only via client
export const apiClient = new ApiClient();

// Factory for switching transports without rewriting UI
export function createApiClient(mode: "mock" | "http" = "mock"): ApiClient {
  const transport = mode === "http" ? new FetchTransport() : new MockTransport();
  return new ApiClient(transport);
}

export type { ApiTransport } from "../transport/types";
