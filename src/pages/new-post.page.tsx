interface Props {
  params: {
    id: string;
  };
}

export default function NewPost({ params }: Props) {
  const { id } = params;

  return (
    <>
      <h1>Add New Post</h1>
      <h2>Start with a blank post or pick a source</h2>
    </>
  );
}
