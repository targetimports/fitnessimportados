import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useVideoUrl() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'institutional_video_url')
          .maybeSingle();

        if (!error && data?.value) {
          setVideoUrl(data.value);
        }
      } catch (err) {
        console.error('Error fetching video URL:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideoUrl();
  }, []);

  return { videoUrl, isLoading };
}
