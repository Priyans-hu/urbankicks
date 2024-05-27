import React from 'react';
import { useFormContext } from 'react-hook-form';

const StepTwo = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <>
            <div className="mb-4">
                <input
                    type="text"
                    id="phone_number"
                    {...register('phone_number')}
                    className={`mt-1 p-2 w-full border border-gray-700 rounded-full py-3 px-6 ${errors.phone_number ? 'border-red-500' : ''}`}
                    placeholder='Phone Number'
                />
                {errors.phone_number && <p className="text-red-500 text-sm mt-1">{errors.phone_number.message}</p>}
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    id="street"
                    {...register('street')}
                    className={`mt-1 p-2 w-full border border-gray-700 rounded-full py-3 px-6 ${errors.street ? 'border-red-500' : ''}`}
                    placeholder='Street'
                />
                {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street.message}</p>}
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    id="city"
                    {...register('city')}
                    className={`mt-1 p-2 w-full border border-gray-700 rounded-full py-3 px-6 ${errors.city ? 'border-red-500' : ''}`}
                    placeholder='City'
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    id="state"
                    {...register('state')}
                    className={`mt-1 p-2 w-full border border-gray-700 rounded-full py-3 px-6 ${errors.state ? 'border-red-500' : ''}`}
                    placeholder='State'
                />
                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    id="postal_code"
                    {...register('postal_code')}
                    className={`mt-1 p-2 w-full border border-gray-700 rounded-full py-3 px-6 ${errors.postal_code ? 'border-red-500' : ''}`}
                    placeholder='Postal Code'
                />
                {errors.postal_code && <p className="text-red-500 text-sm mt-1">{errors.postal_code.message}</p>}
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    id="country"
                    {...register('country')}
                    className={`mt-1 p-2 w-full border border-gray-700 rounded-full py-3 px-6 ${errors.country ? 'border-red-500' : ''}`}
                    placeholder='Country'
                />
                {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
            </div>
        </>
    );
};

export default StepTwo;