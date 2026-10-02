import assert from "node:assert/strict";
import { test } from "node:test";
import { accessiblePosts, featuredPost, getPost, posts, publishedPosts, relatedPosts } from "./index.ts";
import { readingMinutes } from "./reading-time.ts";

test("drafts cannot be resolved outside local development", () => {
  const previous = process.env.NODE_ENV;
  const draft = posts.find((post) => post.draft);
  assert.ok(draft);
  try {
    for (const environment of ["production", "test", undefined]) {
      if (environment) process.env.NODE_ENV = environment;
      else delete process.env.NODE_ENV;
      assert.equal(getPost(draft.slug), undefined);
      assert.ok(accessiblePosts().every((post) => !post.draft));
    }
    process.env.NODE_ENV = "development";
    assert.equal(getPost(draft.slug), draft);
    assert.ok(!publishedPosts().includes(draft));
    assert.equal(getPost("unknown-post"), undefined);
  } finally {
    if (previous === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = previous;
  }
});

test("featured and related selections use published posts only", () => {
  const original = [...posts];
  const base = posts[0];
  try {
    posts.splice(0, posts.length,
      { ...base, slug: "draft", featured: true, draft: true },
      { ...base, slug: "newer", date: "2026-10-02", topic: "Security", featured: false, draft: false },
      { ...base, slug: "featured", date: "2026-09-01", featured: true, draft: false },
      { ...base, slug: "same-topic", date: "2026-08-01", featured: false, draft: false },
    );
    assert.deepEqual(publishedPosts().map((post) => post.slug), ["newer", "featured", "same-topic"]);
    assert.equal(featuredPost().slug, "featured");
    assert.deepEqual(relatedPosts(posts[2]).map((post) => post.slug), ["same-topic", "newer"]);
    posts[2].featured = false;
    assert.equal(featuredPost().slug, "newer");
    posts.splice(0, posts.length, { ...base, draft: true });
    assert.equal(featuredPost(), undefined);
    assert.deepEqual(relatedPosts(base), []);
  } finally {
    posts.splice(0, posts.length, ...original);
  }
});

test("reading time ignores editorial comments, link targets and HTML tags", () => {
  assert.equal(readingMinutes(""), 1);
  assert.equal(readingMinutes("word ".repeat(201)), 2);
  assert.equal(readingMinutes(`{/* ${"editorial ".repeat(500)} */}<p>[A source](https://example.com)</p>`), 1);
});
