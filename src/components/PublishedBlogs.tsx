import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Clock,
  FileText,
  Loader2,
} from "lucide-react";
import { BlogArticle, isSupabaseConfigured, listBlogs } from "@/lib/blogStore";

export default function PublishedBlogs({ darkMode }: { darkMode: boolean }) {
  const [blogs, setBlogs] = useState<BlogArticle[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogArticle | null>(null);
  const [showFullBlog, setShowFullBlog] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    listBlogs()
      .then((items) => {
        if (!mounted) return;

        const published = items.filter(
          (item) => item.status === "published"
        );

        setBlogs(published);
        setSelectedBlog(published[0] ?? null);
      })
      .catch(() => {
        if (mounted) setBlogs([]);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);


  if (loading) {
    return (
      <div className="rounded-2xl border p-5 text-sm">
        <Loader2 size={16} className="inline mr-2 animate-spin" />
        Loading articles...
      </div>
    );
  }


  if (!selectedBlog) {
    return (
      <div
        className={`rounded-xl border p-5 ${darkMode
            ? "bg-slate-900/30 border-slate-800"
            : "bg-white border-slate-200"
          }`}
      >
        No published articles yet.
      </div>
    );
  }


  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">


      {/* Sidebar */}
      <div className="lg:col-span-4 space-y-4">


        <div
          className={`p-4 rounded-xl border ${darkMode
              ? "bg-slate-900/30 border-slate-800"
              : "bg-white border-slate-200 shadow-sm"
            }`}
        >

          <h4 className="text-xs font-mono font-bold text-slate-500 uppercase mb-3">
            Select Article
          </h4>


          <div className="space-y-2">

            {blogs.map((blog) => (

              <button
                key={blog.id}
                onClick={() => {
                  setSelectedBlog(blog);
                  setShowFullBlog(false);
                }}
                className={`w-full p-3 rounded-lg text-left border transition-all flex gap-2 ${selectedBlog.id === blog.id
                    ? "bg-indigo-600/10 border-indigo-500/40"
                    : "border-transparent hover:bg-slate-900/50"
                  }`}
              >

                <FileText
                  size={16}
                  className="text-indigo-400 mt-1 shrink-0"
                />

                <div>

                  <div className="text-xs font-bold line-clamp-2">
                    {blog.title}
                  </div>

                  <div className="text-[10px] text-slate-500 mt-1">
                    {new Date(
                      blog.updated_at
                    ).toLocaleDateString()}
                  </div>

                </div>

              </button>

            ))}

          </div>

        </div>



        {/* Author */}
        <div
          className={`p-5 rounded-xl border flex items-center gap-3 ${darkMode
              ? "bg-slate-900/40 border-slate-800"
              : "bg-white border-slate-200 shadow-sm"
            }`}
        >

          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-indigo-500 to-teal-400 p-[1px]">

            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-white text-xs font-bold">
              SB
            </div>

          </div>


          <div>

            <div className="text-xs text-slate-400">
              Written By:
            </div>

            <div className="text-sm font-bold">
              {selectedBlog.author ?? "Salim Brahim"}
            </div>

            <div className="text-[10px] text-indigo-400">
              Software Architect | .NET Developer
            </div>

          </div>

        </div>

      </div>




      {/* Article */}
      <div className="lg:col-span-8">


        {!showFullBlog ? (

          <div
            className={`p-6 rounded-2xl border space-y-5 ${darkMode
                ? "bg-slate-900/30 border-slate-800"
                : "bg-white border-slate-200 shadow-md"
              }`}
          >


            <div className="flex flex-wrap gap-2">

              {selectedBlog.tags.map(tag => (

                <span
                  key={tag}
                  className="px-2 py-1 rounded bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase"
                >
                  {tag}
                </span>

              ))}


              <span className="ml-auto text-[10px] text-slate-500 flex items-center">

                <Clock size={12} className="mr-1" />
                {new Date(selectedBlog.updated_at).toLocaleDateString()}

              </span>

            </div>



            <h1
              onClick={() => setShowFullBlog(true)}
              className="text-2xl font-black cursor-pointer hover:text-indigo-400"
            >
              {selectedBlog.title}
            </h1>


            <p className="text-sm text-slate-400 leading-relaxed">
              {selectedBlog.excerpt}
            </p>



            <div className="border-t border-slate-800 pt-4 flex justify-between">

              <span className="text-xs text-slate-500">
                Published article
              </span>


              <button
                onClick={() => setShowFullBlog(true)}
                className="text-indigo-400 text-xs font-bold flex items-center"
              >
                Read Full Article
                <ArrowRight size={14} />
              </button>

            </div>


          </div>


        ) : (


          <div
            className={`p-6 rounded-2xl border ${darkMode
                ? "bg-slate-900/30 border-slate-800"
                : "bg-white border-slate-200 shadow-md"
              }`}
          >


            <button
              onClick={() => setShowFullBlog(false)}
              className="text-xs text-slate-400 flex items-center mb-4"
            >
              <ArrowLeft size={14} />
              Back to preview
            </button>



            <div className="border-b border-slate-800 pb-5 mb-5">

              <h1 className="text-3xl font-black text-indigo-400">
                {selectedBlog.title}
              </h1>


              <p className="text-xs text-slate-500 mt-2">
                By Salim Brahim | {new Date(selectedBlog.updated_at).toLocaleDateString()}
              </p>

            </div>



            <div
              className="blog-preview-html text-sm leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: selectedBlog.content_html
              }}
            />



            <div className="mt-8 pt-5 border-t border-slate-800 flex justify-between text-xs text-slate-500">

              <span>
                💬 Questions or suggestions? Send a message!
              </span>


              <button
                onClick={() => setShowFullBlog(false)}
                className="text-indigo-400"
              >
                Collapse post
              </button>

            </div>


          </div>

        )}

      </div>


    </div>
  );
}