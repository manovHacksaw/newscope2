interface VideoEmbedProps {
    url: string;
    title: string;
  }
  
  export function VideoEmbed({ url, title }: VideoEmbedProps) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-lg">
        <iframe
          src={url}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    );
  }