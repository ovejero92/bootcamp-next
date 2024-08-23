// SkeletonCard.js
const SkeletonCard = () => {
    return (
      <div className="ml-5 mt-3 w-72 h-[25rem] bg-gray-300 rounded relative shadow-2xl animate-pulse flex flex-col justify-between">
        <div>
          {/* Top banner placeholder */}
          <div className="bg-gray-400 h-10 rounded-tl-lg rounded-tr-lg"></div>
          
          {/* Badge placeholder */}
          <div className="absolute -right-2 top-14 h-8 w-28 bg-gray-400"></div>
          
          {/* Course name placeholder */}
          <div className="mt-16 ml-3 h-8 bg-gray-400 w-3/4 rounded"></div>
  
          {/* Duration placeholder */}
          <div className="mt-4 ml-3 h-6 bg-gray-400 w-1/2 rounded"></div>
          
          {/* Online badge placeholder */}
          <div className="ml-6 mt-2 h-6 w-32 bg-gray-400 rounded-xl"></div>
        </div>
  
        <div className="border-t-2 p-4 space-y-4">
          {/* Price placeholders */}
          <div className="h-6 bg-gray-400 rounded w-3/4"></div>
          <div className="h-6 bg-gray-400 rounded w-2/3"></div>
          <div className="h-10 bg-gray-400 rounded w-full"></div>
        </div>
      </div>
    );
  };
  
  export default SkeletonCard;