import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const feedId = Deno.env.get('BEHOLD_FEED_ID');
    
    if (!feedId) {
      console.error('BEHOLD_FEED_ID not configured');
      return new Response(
        JSON.stringify({ error: 'Instagram feed not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Fetch from Behold API
    const response = await fetch(`https://feeds.behold.so/${feedId}`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Behold API error:', response.status);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch Instagram feed' }),
        { 
          status: response.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const data = await response.json();
    
    // Transform the data to a simpler format
    const posts = data.posts?.slice(0, 6).map((post: any) => {
      // For videos, use thumbnailUrl; for images, use mediaUrl
      let imageUrl = post.thumbnailUrl || post.prunedThumbnailUrl;
      
      // If it's an image post, use the media URL
      if (post.mediaType === 'IMAGE' || post.mediaType === 'CAROUSEL_ALBUM') {
        imageUrl = post.prunedMediaUrl || post.mediaUrl || imageUrl;
      }
      
      return {
        id: post.id,
        mediaUrl: imageUrl,
        permalink: post.permalink,
        caption: post.caption?.slice(0, 100),
        likesCount: post.likesCount || 0,
        commentsCount: post.commentsCount || 0,
        mediaType: post.mediaType,
      };
    }) || [];

    return new Response(
      JSON.stringify({ 
        posts,
        username: data.username || 'targetimportadora',
        followersCount: data.followersCount,
        followingCount: data.followingCount,
        postsCount: data.postsCount,
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error fetching Instagram feed:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
