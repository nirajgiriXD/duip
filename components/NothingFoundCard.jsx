const NothingFoundCard = () => {
  return (
    <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg shadow-sm">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-700">
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
