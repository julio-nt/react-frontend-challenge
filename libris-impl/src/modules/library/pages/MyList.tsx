import BookList from '../components/BookList';

const Component = () => {
  return (
    <div>
      <BookList />
    </div>
  );
};

const MyListPage = {
  path: '/',
  Component,
};

export default MyListPage;
