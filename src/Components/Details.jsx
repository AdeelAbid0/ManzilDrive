import Loader from "./Loader/Loader";
import CarCard from "./CarCard";

const Details = ({ allCarsData, LoadingCarsData }) => {
  return (
    <div className="flex flex-col gap-1 items-center">
      <div className=" w-full  flex flex-col gap-[2px] rounded min-h-[50vh]">
        {LoadingCarsData ? (
          <div className="flex w-full justify-center mt-12">
            <Loader size={40} />
          </div>
        ) : allCarsData?.length > 0 ? (
          allCarsData?.map((items) => {
            return <CarCard key={items.id} items={items} />;
          })
        ) : (
          <div className="flex w-full justify-center mt-12">
            <h1 className="text-gray-500 text-lg">No car available</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
