import React from 'react';
import { useFormContext } from 'react-hook-form';

const StepOne = () => {
    const { register, formState: { errors } } = useFormContext();

    return (
        <>
            <div className="mb-4">
                <input 
                    type="text" 
                    id="email" 
                    {...register('email')} 
                    className={`mt-1 p-2 w-full border border-gray-700 rounded-full py-3 px-6 ${errors.email ? 'border-red-500' : ''}`} 
                    placeholder='Email' 
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div className="mb-4">
                <div className="relative">
                    <input
                        type="password"
                        id="password"
                        {...register('password')}
                        className={`mt-1 p-2 w-full border rounded-full py-3 px-6 ${errors.password ? 'border-red-500' : 'border-gray-800'}`}
                        placeholder='Password'
                    />
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
        </>
    );
};

export default StepOne;