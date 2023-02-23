export default function Poll() {
  return (
    <>
    <div>
      <h1 className="font-semibold text-4xl">Poll Title</h1>
      <h2 className="font-regular">Poll Flavor Text</h2>
      <p className="font-light">x votes</p>
    </div>
    <div>
      <div className="bg-[#f2f2f2] flex lg:h-64 md:h-32 relative">
        <video controls className="lg:h-64 md:h-32 absolute"></video>
        <div className="lg:left-96 lg:ml-32 md:left-48 md:ml-16 absolute">
          <div className="flex lg:mt-6 lg:ml-6 md:mt-3 md:ml-3 sm:mt-1 sm:ml-1">
            <p className="font-light">Event date</p>
            <p className="mr-2 ml-2 font-light"> | </p>
            <p className="font-light">Video length</p>
          </div>
          <div className="lg:mt-14 lg:ml-6 md:mt-4 md:ml-3 sm:mt-2 sm:ml-1">
            <p className="font-medium text-3xl">Video Title</p>
          </div>
          <div className="lg:mt-16 lg:ml-6 md:mt-4 md:ml-3 sm:mt-3 sm:ml-2">
            <p className="font-light">Video origin</p>
          </div>
        </div>
        <div className="absolute right-16 top-28">
          <p className="text-3xl">0%</p>
        </div>
        <div className="absolute left-1/3 ml-3 bg-sky-400 w-2/3 overflow-hidden">
          <p>pinal</p>
        </div>
      </div>
    </div>
    </>
  );
}
