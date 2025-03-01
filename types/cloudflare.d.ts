interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
  delete(key: string): Promise<void>;
}

declare global {
  const BLOG_POSTS: KVNamespace;
  const BLOG_STATS: KVNamespace;
}
