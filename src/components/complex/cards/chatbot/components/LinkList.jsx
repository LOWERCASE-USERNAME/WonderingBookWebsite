export default function LinkList({ recommendedPosts }) {
  return (
    <ul className="list-decimal list-inside">
      {recommendedPosts &&
        recommendedPosts.map((post) => (
          <li key={post.articleId}>
            <a
              href={`/detail/${post.articleId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {post.title ?? "undefined"}
            </a>
          </li>
        ))}
    </ul>
  );
}
