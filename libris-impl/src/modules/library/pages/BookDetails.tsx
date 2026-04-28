import { useParams } from '@tanstack/react-router';

const Component = () => {
  const { id } = useParams({ strict: false });

  console.log('Book ID:', id);

  return (
    <div>
      <h1>Book Details</h1>
      <p>ID: {id}</p>
    </div>
  );
};

const BookDetailsPage = {
  path: '/livro/$id',
  Component,
};

export default BookDetailsPage;
