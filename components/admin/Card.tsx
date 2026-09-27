interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export default function Card({children, className=""}: CardProps){
    const baseStyle = "bg-surface border border-border shadow-sm rounded-lg p-6";

    return(
        <div
        className={`${baseStyle} ${className}`}
        >
            {children}
        </div>
    )
}