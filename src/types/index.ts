export type JWTPayload = {
  id: string;
  name?: string;
  email?: string;
};

export interface Post {
  assets: {
    type: AssetType;
    url: string;
    id: string;
    thumbnail: string;
    postId: string;
  }[];
  title: string;
  summary: string;
  contentHTML: string;
  sharableLink: string;
  id: string;
  publicId: string;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  isPublished: boolean;
  isArchived: boolean;
  isDeleted: boolean;
  lastUpdatedById: string;
}

export interface PaginatedResponse {
  page: number;
  limit: number;
  prev: number | null;
  next: number | null;
  total: number;
  totalPages: number;
}

export interface ListPostsResponse extends PaginatedResponse {
  posts: Post[];
  message: string;
}

export enum AssetType {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
}

export interface User {
  name: string | null;
  publicId: string;
  email: string;
  referralCode: string;
  avatar: string | null;
  registrationCount: number;
}
