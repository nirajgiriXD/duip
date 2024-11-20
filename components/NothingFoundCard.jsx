const NothingFoundCard = () => {
  return (
    <div className="flex items-center justify-center h-64 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
          Nothing Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    </div>
  );
};

export default NothingFoundCard;
