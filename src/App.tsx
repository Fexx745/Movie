import React from 'react';
import { MovieSearch } from './components/MovieSearch';
import { MovieList } from './components/MovieList';
import { ShoppingCart } from './components/ShoppingCart';
import { Pagination } from './components/Pagination';
import { useMovies } from './hooks/useMovies';
import { useCart } from './hooks/useCart';

const App: React.FC = () => {
  const {
    movies,
    loading,
    error,
    setQuery,
    updateMoviePrice,
    page,
    setPage,
    totalPages
  } = useMovies();

  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    calculateTotal
  } = useCart();

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetPage = () => {
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-4xl font-extrabold tracking-wide">Movie Shop</h1>
          </div>
          <nav className="hidden md:flex space-x-6 text-lg">
            <a href="/" className="hover:text-yellow-300 transition duration-300">Home</a>
            <a href="/" className="hover:text-yellow-300 transition duration-300">Movies</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/4">
            <MovieSearch onSearch={setQuery} onResetPage={resetPage} />
            <MovieList
              movies={movies}
              loading={loading}
              error={error}
              onAddToCart={addToCart}
              onUpdatePrice={updateMoviePrice}
            />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
          <div className="lg:w-1/4 sticky top-8 self-start">
            <ShoppingCart
              cart={cart}
              onRemove={removeFromCart}
              onUpdateQuantity={updateQuantity}
              onClear={clearCart}
              totalInfo={calculateTotal()}
            />
          </div>
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Movie Shop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;