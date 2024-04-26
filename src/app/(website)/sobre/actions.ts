'use server';

import { createClient } from "@/services/supabase/server";
import { revalidateTag } from "next/cache";

function getYoutubeVideoId(videoUrl: string) {
  const videoId = videoUrl.split('v=')[1];
  return videoId;
}

export async function updateYoutubeVideo(formData: FormData) {
  const videoUrl = formData.get('youtube-url');
  if (!videoUrl) return;
  const videoId = getYoutubeVideoId(videoUrl as string);
	const supabase = createClient();
  await supabase.from('videos').update({ video: videoId }).eq('page', 'sobre');
  revalidateTag("supabase");
}
