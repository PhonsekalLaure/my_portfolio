import type { Project } from "@/content/types";
import { ExternalLink } from "./external-link";

export function ProjectPreview({ preview }: { preview?: Project["preview"] }) {
  if (!preview) return null;

  return (
    <section className="case-section project-preview">
      <p className="eyebrow">
        <span />
        Explore the live site
      </p>
      <h2>{preview.title}</h2>
      <p>{preview.description}</p>
      <div className="preview-window">
        <div className="preview-toolbar">
          <span>{new URL(preview.url).hostname}</span>
          <ExternalLink href={preview.url}>Open website</ExternalLink>
        </div>
        <iframe
          src={preview.url}
          title={`${preview.title} — interactive preview`}
          loading="lazy"
          width="900"
          height="600"
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
        />
      </div>
      <p className="preview-help">
        Scroll inside the preview to explore. If it doesn’t load, use Open
        website above.
      </p>
    </section>
  );
}
