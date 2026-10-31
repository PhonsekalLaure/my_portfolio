import type { ProjectActivity as Activity } from "@/content/types";
import { Icon } from "./icons";
import { ExternalLink } from "./external-link";
import { formatDate } from "@/lib/dates";

export function ProjectActivity({ items }: { items: Activity[] }) {
  if (!items.length) return null;
  return (
    <section
      className="case-section activity-section"
      aria-labelledby="activity-heading"
    >
      <p className="eyebrow">
        <span />
        From the repository
      </p>
      <h2 id="activity-heading">Selected changes</h2>
      <p>
        A closer look at changes I authored, with direct links to the code and
        merged pull requests.
      </p>
      <ol className="activity-list">
        {items.map((item) => (
          <li className="activity-item" key={item.href}>
            <span className="activity-marker">
              <Icon
                name={item.kind === "Commit" ? "code" : "branch"}
                size={17}
              />
            </span>
            <div className="activity-content">
              <div className="activity-meta">
                <span>{item.repository}</span>
                <time dateTime={item.date}>{formatDate(item.date)}</time>
              </div>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <ExternalLink href={item.href}>
                View {item.kind === "Commit" ? "commit" : "merged PR"}{" "}
                {item.reference}
              </ExternalLink>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
