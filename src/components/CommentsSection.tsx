import React, { useState } from 'react';
import { ThumbsUp, Send } from 'lucide-react';

interface CommentItem {
  id: string;
  name: string;
  avatar: string;
  text: string;
  likes: number;
  time: string;
  userLiked?: boolean;
  replies?: CommentItem[];
}

const INITIAL_COMMENTS: CommentItem[] = [
  {
    id: 'c1',
    name: 'Samantha Anderson',
    avatar: 'https://media.atomicatmedia.net/u/PI6myij1fUTtQKGggCP9OLTD0r52/Pictures/clone/page94/d8b1b57.jpg',
    text: "Dr., it's been 15 consecutive days since I started, and I've already noticed a big improvement in my mental clarity and focus. I'll keep going because I'm feeling amazing! 😍",
    likes: 127,
    time: '1 h',
    replies: [
      {
        id: 'c1-1',
        name: 'Tommy Thompson',
        avatar: 'https://media.atomicatmedia.net/u/PI6myij1fUTtQKGggCP9OLTD0r52/Pictures/clone/page94/eb563e1.jpg',
        text: "You explain very well, it's what we, the laypeople, need. I'm going to start using this trick today itself.",
        likes: 15,
        time: '1 h',
      },
      {
        id: 'c1-2',
        name: 'Jennifer Davis',
        avatar: 'https://media.atomicatmedia.net/u/PI6myij1fUTtQKGggCP9OLTD0r52/Pictures/clone/page94/244801c.jpg',
        text: "FINALLY, SOMEONE WHO DOESN'T BEAT AROUND THE BUSH TO ASK FOR MONEY IN THE END, THANK YOUUUU! I STARTED TODAY ❤",
        likes: 15,
        time: '1 h',
      },
    ],
  },
  {
    id: 'c2',
    name: 'Mary Johnson',
    avatar: 'https://media.atomicatmedia.net/u/PI6myij1fUTtQKGggCP9OLTD0r52/Pictures/clone/page94/b87575f.jpg',
    text: "I've been applying these tips for 17 days now, and I've already noticed a significant improvement in my memory. I was even surprised by the results; it's impressive how some simple adjustments can make a difference! Loved it ❤️❤️❤️",
    likes: 46,
    time: '1 h',
  },
  {
    id: 'c3',
    name: 'Emily McDonald',
    avatar: 'https://media.atomicatmedia.net/u/PI6myij1fUTtQKGggCP9OLTD0r52/Pictures/clone/page94/65492c0.jpg',
    text: 'Very well explained and straightforward video, no beating around the bush, congratulations Dr. 😍',
    likes: 38,
    time: '1 h',
  },
  {
    id: 'c4',
    name: 'Lauren Brown',
    avatar: 'https://media.atomicatmedia.net/u/PI6myij1fUTtQKGggCP9OLTD0r52/Pictures/clone/page94/04db7b7.jpg',
    text: "Dr. you've helped me a lot. A few years ago, I went through a difficult period and started looking for ways to improve my mind and well-being. I started applying your techniques 5 days ago, and I already feel like a different person – more energized, with greater mental clarity, and more desire to face the day. What a blessing!",
    likes: 13,
    time: '1 h',
  },
];

export const CommentsSection: React.FC = () => {
  const [comments, setComments] = useState<CommentItem[]>(INITIAL_COMMENTS);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const toggleLike = (id: string, isReply: boolean, parentId?: string) => {
    setComments((prev) =>
      prev.map((c) => {
        if (!isReply && c.id === id) {
          const liked = !c.userLiked;
          return {
            ...c,
            userLiked: liked,
            likes: liked ? c.likes + 1 : c.likes - 1,
          };
        }
        if (isReply && c.id === parentId && c.replies) {
          return {
            ...c,
            replies: c.replies.map((r) => {
              if (r.id === id) {
                const liked = !r.userLiked;
                return {
                  ...r,
                  userLiked: liked,
                  likes: liked ? r.likes + 1 : r.likes - 1,
                };
              }
              return r;
            }),
          };
        }
        return c;
      })
    );
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newEntry: CommentItem = {
      id: `custom-${Date.now()}`,
      name: newCommentName.trim() || 'Verified Viewer',
      avatar: 'https://media.atomicatmedia.net/u/PI6myij1fUTtQKGggCP9OLTD0r52/Pictures/clone/page94/04db7b7.jpg',
      text: newCommentText.trim(),
      likes: 1,
      time: 'Just now',
      userLiked: true,
    };

    setComments([newEntry, ...comments]);
    setNewCommentName('');
    setNewCommentText('');
  };

  const handleAddReply = (parentId: string) => {
    if (!replyText.trim()) return;

    setComments((prev) =>
      prev.map((c) => {
        if (c.id === parentId) {
          const newReply: CommentItem = {
            id: `reply-${Date.now()}`,
            name: 'You',
            avatar: 'https://media.atomicatmedia.net/u/PI6myij1fUTtQKGggCP9OLTD0r52/Pictures/clone/page94/244801c.jpg',
            text: replyText.trim(),
            likes: 1,
            time: 'Just now',
            userLiked: true,
          };
          return {
            ...c,
            replies: [...(c.replies || []), newReply],
          };
        }
        return c;
      })
    );

    setActiveReplyId(null);
    setReplyText('');
  };

  return (
    <section id="testimonials" className="w-full bg-[#efefef] py-10 px-4 sm:px-8 lg:px-24">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-medium text-[#1c1e21] mb-6">
          Recent Comments
        </h3>

        {/* Comment list */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="w-full">
              {/* Main parent comment */}
              <div className="flex items-start gap-3">
                <img
                  src={comment.avatar}
                  alt={comment.name}
                  className="w-12 h-12 rounded-full object-cover shrink-0 border border-gray-300"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://media.atomicatmedia.net/u/PI6myij1fUTtQKGggCP9OLTD0r52/Pictures/clone/page94/d8b1b57.jpg';
                  }}
                />
                <div className="flex-1">
                  <div className="bg-[#f0f2f5] p-3 rounded-2xl max-w-2xl">
                    <p className="font-semibold text-sm text-[#385898] hover:underline cursor-pointer">
                      {comment.name}
                    </p>
                    <p className="text-sm text-[#1c1e21] mt-1 leading-relaxed">
                      {comment.text}
                    </p>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center gap-3 text-xs mt-1 ml-2 text-gray-500 font-['Helvetica',Arial,sans-serif]">
                    <button
                      onClick={() => toggleLike(comment.id, false)}
                      className={`font-semibold cursor-pointer hover:underline ${
                        comment.userLiked ? 'text-[#1877f2]' : 'text-[#4267b2]'
                      }`}
                    >
                      Like
                    </button>
                    <span>·</span>
                    <button
                      onClick={() =>
                        setActiveReplyId(
                          activeReplyId === comment.id ? null : comment.id
                        )
                      }
                      className="font-semibold text-[#4267b2] cursor-pointer hover:underline"
                    >
                      Reply
                    </button>
                    <span>·</span>
                    {comment.likes > 0 && (
                      <>
                        <div className="flex items-center gap-1">
                          <img
                            src="https://media.atomicatmedia.net/p/fblike.webp?height=48&width=48"
                            alt="Likes"
                            className="w-3.5 h-3.5 inline-block"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                          <span className="text-gray-700">{comment.likes}</span>
                        </div>
                        <span>·</span>
                      </>
                    )}
                    <span className="text-gray-400">{comment.time}</span>
                  </div>

                  {/* Inline reply box */}
                  {activeReplyId === comment.id && (
                    <div className="mt-3 ml-2 flex items-center gap-2">
                      <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write a reply..."
                        className="flex-1 bg-white border border-gray-300 rounded-full px-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:border-blue-500"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleAddReply(comment.id);
                        }}
                      />
                      <button
                        onClick={() => handleAddReply(comment.id)}
                        className="bg-[#1877f2] text-white p-1.5 rounded-full hover:bg-blue-600 transition"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Child replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-3 ml-4 sm:ml-8 pl-3 border-l-2 border-dashed border-gray-300 space-y-3">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex items-start gap-2.5">
                          <img
                            src={reply.avatar}
                            alt={reply.name}
                            className="w-9 h-9 rounded-full object-cover shrink-0 border border-gray-300"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                'https://media.atomicatmedia.net/u/PI6myij1fUTtQKGggCP9OLTD0r52/Pictures/clone/page94/eb563e1.jpg';
                            }}
                          />
                          <div className="flex-1">
                            <div className="bg-[#f0f2f5] p-2.5 rounded-2xl max-w-xl">
                              <p className="font-semibold text-xs sm:text-sm text-[#385898]">
                                {reply.name}
                              </p>
                              <p className="text-xs sm:text-sm text-[#1c1e21] mt-0.5 leading-relaxed">
                                {reply.text}
                              </p>
                            </div>

                            <div className="flex items-center gap-2.5 text-[11px] mt-1 ml-2 text-gray-500 font-['Helvetica',Arial,sans-serif]">
                              <button
                                onClick={() =>
                                  toggleLike(reply.id, true, comment.id)
                                }
                                className={`font-semibold cursor-pointer hover:underline ${
                                  reply.userLiked
                                    ? 'text-[#1877f2]'
                                    : 'text-[#4267b2]'
                                }`}
                              >
                                Like
                              </button>
                              <span>·</span>
                              <span className="text-[#4267b2] cursor-pointer hover:underline">
                                Reply
                              </span>
                              <span>·</span>
                              {reply.likes > 0 && (
                                <>
                                  <div className="flex items-center gap-1">
                                    <img
                                      src="https://media.atomicatmedia.net/p/fblike.webp?height=48&width=48"
                                      alt="Likes"
                                      className="w-3 h-3 inline-block"
                                      onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                      }}
                                    />
                                    <span>{reply.likes}</span>
                                  </div>
                                  <span>·</span>
                                </>
                              )}
                              <span className="text-gray-400">{reply.time}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add new comment form */}
        <div className="mt-8 pt-6 border-t border-gray-300">
          <form onSubmit={handleAddComment} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Leave a Comment
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
              <input
                type="text"
                value={newCommentName}
                onChange={(e) => setNewCommentName(e.target.value)}
                placeholder="Your Name (Optional)"
                className="w-full text-xs px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <textarea
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder="Join the discussion... (e.g., share your memory results)"
              rows={2}
              className="w-full text-xs px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 resize-none mb-2"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#1877f2] hover:bg-[#166fe5] text-white text-xs font-semibold px-4 py-2 rounded-lg transition cursor-pointer flex items-center gap-1.5"
              >
                <Send className="w-3 h-3" /> Post Comment
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
