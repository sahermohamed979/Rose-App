export default function AddressSkeleton() {
  return (
    <div className="w-full flex flex-col">
      {/* Title */}
      <div className="h-8 w-64 mb-6 rounded-lg bg-gray-200 animate-pulse" />

      {/* Address Cards */}
      <div className="flex flex-col gap-4">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="
              flex
              justify-between
              items-center
              p-4
              border
              border-gray-200
              rounded-xl
            "
          >
            {/* Address Info */}
            <div className="flex flex-col gap-3">
              {/* City */}
              <div
                className="
                  h-7
                  w-32
                  rounded-md
                  bg-gray-200
                  animate-pulse
                "
              />

              {/* Street */}
              <div
                className="
                  h-6
                  w-52
                  rounded-full
                  bg-gray-200
                  animate-pulse
                "
              />
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3">
              {/* Phone Icon */}
              <div
                className="
                  w-9
                  h-9
                  rounded-full
                  bg-gray-200
                  animate-pulse
                "
              />

              {/* Phone Text */}
              <div
                className="
                  h-4
                  w-24
                  rounded-md
                  bg-gray-200
                  animate-pulse
                "
              />
            </div>
          </div>
        ))}
      </div>

      {/* OR Separator */}
      <div className="flex items-center gap-4 my-8">
        <div className="h-px bg-gray-200 flex-1" />

        <div
          className="
            h-4
            w-8
            rounded
            bg-gray-200
            animate-pulse
          "
        />

        <div className="h-px bg-gray-200 flex-1" />
      </div>

      {/* Add Address Button */}
      <div
        className="
          h-10
          w-full
          rounded-md
          bg-gray-200
          animate-pulse
        "
      />

      {/* Next Button */}
      <div className="flex justify-end mt-8">
        <div
          className="
            h-10
            w-24
            rounded-md
            bg-gray-200
            animate-pulse
          "
        />
      </div>
    </div>
  );
}
