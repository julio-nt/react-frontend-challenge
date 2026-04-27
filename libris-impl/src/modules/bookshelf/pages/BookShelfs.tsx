import BookShelfList from '../components/BookshelfList';

const Component = () => {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Minha Estante</h1>
      <BookShelfList />
    </div>
  );
};

const BookShelfsPage = {
  path: '/estantes',
  Component,
};

export default BookShelfsPage;
