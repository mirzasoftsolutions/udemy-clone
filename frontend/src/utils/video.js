export const toEmbedUrl = (url) => {
  if (!url) return "";

  // already embed
  if (url.includes("embed")) return url;

  // youtube watch URL
  if (url.includes("watch?v=")) {
    const videoId = url.split("watch?v=")[1].split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  // youtu.be short URL
  if (url.includes("youtu.be/")) {
    const videoId = url.split("youtu.be/")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  return url; // fallback
};
