import { createClient } from "@supabase/supabase-js";

export type BlogStatus = "draft" | "published";

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content_html: string;
  tags: string[];
  status: BlogStatus;
  created_at: string;
  updated_at: string;
}

export interface BlogDraftInput {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content_html: string;
  tags: string[];
  status: BlogStatus;
}

const viteEnv = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env;
const SUPABASE_URL = viteEnv?.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = viteEnv?.VITE_SUPABASE_ANON_KEY;
const LOCAL_STORAGE_KEY = "salim_portfolio_blogs";

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!)
  : null;

const createId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return Math.random().toString(36).slice(2);
};

const readLocalBlogs = (): BlogArticle[] => {
  if (typeof localStorage === "undefined") return [];

  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const writeLocalBlogs = (blogs: BlogArticle[]) => {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(blogs));
};

export const normalizeSlug = (value: string) => {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export async function listBlogs(): Promise<BlogArticle[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) throw error;
    return (data ?? []) as BlogArticle[];
  }

  return readLocalBlogs().sort(
    (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );
}

export async function saveBlog(input: BlogDraftInput): Promise<BlogArticle> {
  const now = new Date().toISOString();
  const article: BlogArticle = {
    id: input.id ?? createId(),
    slug: normalizeSlug(input.slug || input.title),
    title: input.title.trim(),
    excerpt: input.excerpt.trim(),
    content_html: input.content_html,
    tags: input.tags,
    status: input.status,
    created_at: now,
    updated_at: now,
  };

  if (supabase) {
    const { data, error } = await supabase
      .from("blogs")
      .upsert(article, { onConflict: "id" })
      .select()
      .single();

    if (error) throw error;
    return data as BlogArticle;
  }

  const current = readLocalBlogs();
  const existing = current.find((item) => item.id === article.id);
  const nextArticle = existing
    ? { ...article, created_at: existing.created_at, updated_at: now }
    : article;
  const nextBlogs = [nextArticle, ...current.filter((item) => item.id !== article.id)];
  writeLocalBlogs(nextBlogs);
  return nextArticle;
}

export async function deleteBlog(id: string) {
  if (supabase) {
    const { error } = await supabase.from("blogs").delete().eq("id", id);
    if (error) throw error;
    return;
  }

  writeLocalBlogs(readLocalBlogs().filter((item) => item.id !== id));
}

export const supabaseBlogsSchema = `create table if not exists public.blogs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  content_html text not null,
  tags text[] not null default '{}',
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.blogs enable row level security;

create policy "public can read published blogs"
on public.blogs for select
using (status = 'published');

-- For local admin only, insert/update/delete can be done with the anon key while developing.
-- Tighten these policies before deploying a public admin surface.
create policy "local admin can manage blogs"
on public.blogs for all
using (true)
with check (true);`;
