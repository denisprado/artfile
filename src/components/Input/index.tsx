import React from 'react'
import { FieldValues, UseFormRegister, Validate } from 'react-hook-form'

type Props = {
	name: string
	label: string
	register: UseFormRegister<FieldValues & any>
	required?: boolean
	error: any
	type?: 'text' | 'number' | 'password' | 'email'
	validate?: (value: string) => boolean | string
	disabled?: boolean
}

export const Input: React.FC<Props> = ({
	name,
	label,
	required,
	register,
	error,
	type = 'text',
	validate,
	disabled,
}) => {
	return (
		<div className="w-full">
			<label htmlFor={name} className="block mb-1 text-sm font-medium">
				{label}
				{required && <span className="text-red-500">&nbsp;*</span>}
			</label>
			<input
				className={`w-full h-8 px-2 text-base bg-gray-100 text-gray-900 rounded-none shadow-none border-none focus:outline-none focus:ring-0 ${error ? 'bg-red-100' : ''
					}`}
				{...{ type }}
				{...register(name, {
					required,
					validate,
					...(type === 'email'
						? {
							pattern: {
								value: /\S+@\S+\.\S+/,
								message: 'Please enter a valid email',
							},
						}
						: {}),
				})}
				disabled={disabled}
			/>
			{error && (
				<div className="mt-1 text-sm text-red-500">
					{!error?.message && error?.type === 'required'
						? 'This field is required'
						: error?.message}
				</div>
			)}
		</div>
	)
}