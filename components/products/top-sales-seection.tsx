export const TopSalesSection = () => {
  return (
    <div className="pt-14 pb-16">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="
              border-1 border-gray-200 bg-gray-200 transition-all ease-in-out 
              hover:scale-105 origin-bottom hover:z-50 hover:shadow-lg"
            >
              <h3 className="text-3xl font-bold mb-1">Product Name</h3>
              <p className="text-gray-600">Description</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
