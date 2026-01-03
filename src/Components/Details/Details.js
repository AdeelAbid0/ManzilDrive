import Loader from "../Loader/Loader";
import CarCard from "../CarCard/CarCard";

const Details = ({ allCarsData, LoadingCarsData }) => {
  return (
    <div className="flex flex-col gap-1 items-center">
      <div className=" w-full  flex flex-col gap-[2px] rounded min-h-[50vh]">
        {allCarsData?.length < 1 && (
          <div>
            <h1>No car available</h1>
          </div>
        )}

        {LoadingCarsData ? (
          <div className="flex w-full justify-center mt-12">
            <Loader size={40} />
          </div>
        ) : (
          allCarsData?.map((items) => {
            return <CarCard key={items.id} items={items} />;
          })
        )}
      </div>
    </div>
  );
};

export default Details;
