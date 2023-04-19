export default function PostDetail({ params }: { params: { postId: string } }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Post {params.postId}
    </main>
  );
}
