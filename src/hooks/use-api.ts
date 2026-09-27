"use client";

import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";
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
} from "@/lib/api/contracts";

export function useProfile(options?: Partial<UseQueryOptions<ApiResponse<ProfileDto>>>) {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => apiClient.getProfile(),
    ...options,
  });
}

export function useStatistics(options?: Partial<UseQueryOptions<ApiResponse<StatisticDto[]>>>) {
  return useQuery({
    queryKey: ["statistics"],
    queryFn: () => apiClient.getStatistics(),
    ...options,
  });
}

export function useTimeline(options?: Partial<UseQueryOptions<ApiResponse<TimelineItemDto[]>>>) {
  return useQuery({
    queryKey: ["timeline"],
    queryFn: () => apiClient.getTimeline(),
    ...options,
  });
}

export function useSkills(options?: Partial<UseQueryOptions<ApiResponse<SkillDto[]>>>) {
  return useQuery({
    queryKey: ["skills"],
    queryFn: () => apiClient.getSkills(),
    ...options,
  });
}

export function useExperience(options?: Partial<UseQueryOptions<ApiResponse<ExperienceDto[]>>>) {
  return useQuery({
    queryKey: ["experience"],
    queryFn: () => apiClient.getExperience(),
    ...options,
  });
}

export function useAchievements(options?: Partial<UseQueryOptions<ApiResponse<AchievementDto[]>>>) {
  return useQuery({
    queryKey: ["achievements"],
    queryFn: () => apiClient.getAchievements(),
    ...options,
  });
}

export function useProjects(options?: Partial<UseQueryOptions<ApiResponse<ProjectDto[]>>>) {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => apiClient.getProjects(),
    ...options,
  });
}

export function useTestimonials(options?: Partial<UseQueryOptions<ApiResponse<TestimonialDto[]>>>) {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: () => apiClient.getTestimonials(),
    ...options,
  });
}

export function useGallery(options?: Partial<UseQueryOptions<ApiResponse<GalleryItemDto[]>>>) {
  return useQuery({
    queryKey: ["gallery"],
    queryFn: () => apiClient.getGallery(),
    ...options,
  });
}

export function useEasterEggs(options?: Partial<UseQueryOptions<ApiResponse<EasterEggDto[]>>>) {
  return useQuery({
    queryKey: ["easter-eggs"],
    queryFn: () => apiClient.getEasterEggs(),
    ...options,
  });
}

export function useContact(options?: Partial<UseQueryOptions<ApiResponse<ContactDto>>>) {
  return useQuery({
    queryKey: ["contact"],
    queryFn: () => apiClient.getContact(),
    ...options,
  });
}

export function useHome(options?: Partial<UseQueryOptions<ApiResponse<HomeDto>>>) {
  return useQuery({
    queryKey: ["home"],
    queryFn: () => apiClient.getHome(),
    ...options,
  });
}
