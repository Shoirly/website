import type { MDXComponents } from "mdx/types";
import styles from "./Article.module.css";

export const articleComponents: MDXComponents = {
  table: ({ children, ...props }) => (
    <div className={styles.tableScroll} role="region" aria-label="Article table" tabIndex={0}>
      <table {...props}>{children}</table>
    </div>
  ),
  pre: ({ children, ...props }) => <pre tabIndex={0} {...props}>{children}</pre>,
};
