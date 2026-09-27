interface SkeletonProp{
    className?: string;
}

export default function Skeleton({className=""}: SkeletonProp){
    const baseStyle = "animate-pulse rounded-md bg-gray-200";

    return(
        <div
        className={`${baseStyle} ${className}`}
        />
    )
}