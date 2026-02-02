import React from "react";

function AddressCard({ address }) {
  return (
    <div className="border rounded-md p-4 shadow-sm bg-gray-50 w-full">
      <p className="font-semibold text-lg mb-2">
        Delivery Address
      </p>

      <div className="space-y-1 text-sm">
        <p className="font-medium">
          {address?.firstName} {address?.lastName}
        </p>

        <p className="text-gray-600">
          {address?.streetAddress}
        </p>

        <p className="text-gray-600">
          {address?.city}, {address?.state} - {address?.zipCode}
        </p>

        <div className="pt-2">
          <p className="font-semibold">Phone Number</p>
          <p>{address?.mobile}</p>
        </div>
      </div>
    </div>
  );
}

export default AddressCard;
