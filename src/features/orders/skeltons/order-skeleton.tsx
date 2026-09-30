export default function OrderSkeleton() {
  return (
    <div className="flex flex-col gap-10 animate-pulse">
      {/* Order */}
      <div>
        {/* Header */}
        <div className="flex justify-between items-center bg-gray-300 p-4 rounded-t-2xl">
          <div className="h-7 w-32 bg-gray-400 rounded" />
          <div className="h-5 w-48 bg-gray-400 rounded" />
        </div>

        {/* Body */}
        <div className="bg-gray-100 p-4 rounded-b-2xl">
          {/* Total + Status */}
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="h-7 w-48 bg-gray-300 rounded" />
              <div className="h-7 w-20 bg-gray-300 rounded-full" />
            </div>

            <div className="flex items-center gap-2">
              <div className="h-5 w-16 bg-gray-300 rounded" />
              <div className="h-7 w-24 bg-gray-300 rounded-full" />
            </div>
          </div>

          <hr className="mt-2.5 mb-3.5 border-gray-300" />

          <div className="p-4">
            {/* Payment */}
            <div className="flex items-center gap-2">
              <div className="h-5 w-32 bg-gray-300 rounded" />
              <div className="h-5 w-5 bg-gray-300 rounded-full" />
              <div className="h-5 w-20 bg-gray-300 rounded" />
            </div>

            {/* Delivery */}
            <div className="flex items-center gap-2 mt-2.5">
              <div className="h-5 w-32 bg-gray-300 rounded" />
              <div className="h-5 w-5 bg-gray-300 rounded-full" />
              <div className="h-5 w-24 bg-gray-300 rounded" />
            </div>

            {/* Order Items title */}
            <div className="h-5 w-28 bg-gray-300 rounded my-2.5" />

            {/* Products */}
            <div className="bg-white p-4 rounded-lg">
              <div className="grid grid-cols-4 gap-3.5">
                {/* Product 1 */}
                <div className="col-span-2">
                  <div className="flex gap-3.5">
                    <div className="w-45 h-52.5 bg-gray-300 rounded-s-lg" />

                    <div className="flex flex-col justify-between flex-1 py-2">
                      <div className="space-y-2">
                        <div className="h-6 w-40 bg-gray-300 rounded" />
                        <div className="h-6 w-28 bg-gray-300 rounded" />
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="h-4 w-10 bg-gray-300 rounded" />
                        <div className="h-7 w-24 bg-gray-300 rounded" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product 2 */}
                <div className="col-span-2">
                  <div className="flex gap-3.5">
                    <div className="w-45 h-52.5 bg-gray-300 rounded-s-lg" />

                    <div className="flex flex-col justify-between flex-1 py-2">
                      <div className="space-y-2">
                        <div className="h-6 w-40 bg-gray-300 rounded" />
                        <div className="h-6 w-28 bg-gray-300 rounded" />
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="h-4 w-10 bg-gray-300 rounded" />
                        <div className="h-7 w-24 bg-gray-300 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second order */}
      <div>
        <div className="h-16 bg-gray-300 rounded-t-2xl" />

        <div className="bg-gray-100 p-4 rounded-b-2xl">
          <div className="h-7 w-48 bg-gray-300 rounded mt-4" />

          <div className="mt-6 h-32 bg-gray-300 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
