"use client";

interface MDXVideoProps {
  src: string;
  poster?: string;
  controls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
}

const MDXVideo = ({
  src,
  poster,
  controls = true,
  autoPlay = false,
  loop = false,
  muted = false,
  className = "",
}: MDXVideoProps) => {
  const isYouTube = /(?:youtube\.com\/watch\?v=|youtu\.be\/)/.test(src);

  if (isYouTube) {
    let embedUrl = src;
    if (src.includes("watch?v=")) {
      embedUrl = src.replace("watch?v=", "embed/");
    } else if (src.includes("youtu.be/")) {
      embedUrl = src.replace("youtu.be/", "www.youtube.com/embed/");
    }
    return (
      <div className={`relative pb-[56.25%] ${className}`}>
        {" "}
        <iframe
          src={embedUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full rounded-lg shadow"
          title="Embedded Video"
        />
      </div>
    );
  }

  return (
    <video
      src={src}
      poster={poster}
      controls={controls}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      className={`${className} w-full h-auto rounded-lg shadow`}
    >
      해당 브라우저에서 지원되지 않습니다.
    </video>
  );
};

export default MDXVideo;
