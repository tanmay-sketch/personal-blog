import * as runtime from "react/jsx-runtime";
import Image from "next/image";
import { Callout } from "./callout";

const useMDXComponent = (code: string) => {
    const fn = new Function(code);
    return fn({...runtime}).default;
};

const components = {
    Callout,
    // Add custom img component for markdown image syntax
    img: ({src, alt}: {src: string; alt?: string}) => (
        <Image 
            src={src} 
            alt={alt || ''} 
            width={800} 
            height={400} 
            className="my-8 rounded-md"
        />
    )
}

interface MdxProps {
    code: string
}

export function MDXContent({code}: MdxProps) {
    const Component = useMDXComponent(code);
    return <Component components={components} />;
}