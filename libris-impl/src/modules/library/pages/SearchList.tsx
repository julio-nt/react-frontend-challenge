import BookList from '../components/BookList';

const Component = () => {
  return (
    <div>
      <BookList />
    </div>
  );
};

const SearchPage = {
  path: '/',
  Component,
};

export default SearchPage;
