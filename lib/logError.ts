import { ErrorType } from "@/lib/types";

export function appError(error: unknown, context?: string){
    const err = error as ErrorType;

    if(context){
        console.log("Context:", context);
    }

    if(err.code){
        console.error("Code:", err.code);
    }

    if(err.message){
        console.error("Message:", err.message);
    }

    if(err.detail){
        console.error("Detail:", err.detail);
    }

    if(process.env.NODE_ENV === "development" && err.stack){
        console.error("Stack:", err.stack);
    }
    
}