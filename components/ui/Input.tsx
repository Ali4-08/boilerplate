// \components\Input.tsx

"use client";


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;   
  error?: string; 
}

export default function Input({
  label,  
  error,  
  ...props
}: InputProps) {
  return (
    <div className="space-y-1">
      <label
        htmlFor={props.id}
        className="block text-gray-700 mb-2 font-medium"
      >
        {label}
      </label>
      <input       
      {...props}
        className={`border border-gray-300 rounded-md w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent ${error && "border-danger! focus:ring-0! focus:ring-danger!"} transition-all duration-300`}        
      />

      {error && (
        <p className="text-danger text-right">
            {error}
        </p>
      )}
    </div>
  );
}
