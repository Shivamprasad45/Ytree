
import React from 'react';
import { IBlog } from '../../../type';


interface BlogCardProps {
    post: IBlog;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
    if (!post) {
        return <div>Post not found</div>
    }
  
    return (
        <article className="blog-card-hover flex flex-col bg-white rounded-[2rem] overflow-hidden border border-sage/10 shadow-sm group h-full">
            <div className="aspect-[4/3] overflow-hidden bg-sand flex items-center justify-center relative">
                {post.featuredImage ? (
                    <img
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        src={post.featuredImage}
                    />
                ) : (
                    <span className="material-symbols-outlined text-sage text-6xl opacity-20">article</span>
                )}

            </div>
            <div className="p-8 flex flex-col flex-1">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold text-primary uppercase tracking-widest">{post.category}</span>
                    <span className="text-xs text-sage">{post.readTime ? `${post.readTime} min read` : '5 min read'}</span>
                </div>

                <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="text-sage text-sm leading-relaxed mb-6 flex-1 line-clamp-3">{post.excerpt}</p>

                <div className="flex items-center justify-between mt-auto">
                    <a className="flex items-center gap-2 text-sm font-bold text-deep-forest group-hover:gap-4 transition-all" href={`/blog/${post.slug}`}>
                        Read Article <span className="material-symbols-outlined text-primary">arrow_forward</span>
                    </a>
                </div>
            </div>
        </article>
    );
};

export default BlogCard;
