import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface InstagramPost {
  id: string;
  mediaUrl: string;
  permalink: string;
  caption: string;
  likesCount: number;
  commentsCount: number;
  mediaType: string;
}

interface InstagramFeedData {
  posts: InstagramPost[];
  username: string;
  followersCount?: number;
  followingCount?: number;
  postsCount?: number;
}

export const useInstagramFeed = () => {
  return useQuery({
    queryKey: ["instagram-feed"],
    queryFn: async (): Promise<InstagramFeedData> => {
      const { data, error } = await supabase.functions.invoke("instagram-feed");
      
      if (error) {
        console.error("Error fetching Instagram feed:", error);
        throw error;
      }
      
      return data;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 1,
  });
};
