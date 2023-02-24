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
        <div className="absolute left-96 ml-32 bg-sky-400 w-96 overflow-hidden">
          <p className="text-sky-400">Secret text</p>
        </div>
        <video controls className="lg:h-64 md:h-32 absolute"></video>
        <div className="lg:left-96 lg:ml-32 md:left-48 md:ml-16 absolute">
          <div className="flex lg:mt-6 lg:ml-6 md:mt-3 md:ml-3 sm:mt-1 sm:ml-1">
            <p className="font-normal text-lg">Event date</p>
            <p className="mr-2 ml-2 font-normal text-lg"> | </p>
            <p className="font-normal text-lg">Video length</p>
          </div>
          <div className="lg:mt-12 lg:ml-6 md:mt-4 md:ml-3 sm:mt-2 sm:ml-1">
            <p className="font-medium text-3xl">Video Title</p>
          </div>
          <div className="lg:mt-14 lg:ml-6 md:mt-4 md:ml-3 sm:mt-3 sm:ml-2">
            <p className="font-normal text-lg">Video origin</p>
          </div>
        </div>
        <div className="absolute right-16 top-28">
          <p className="text-3xl">0%</p>
        </div>
      </div>
    </div>
    </>
  );
}
