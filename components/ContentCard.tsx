import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from "components/ui/card"

interface ContentCardProps {
    title: string;
    author?: string;
    year?: number;
    href?: string;
    isExternal?: boolean;
    description?: string;
}

export function ContentCard({ title, author, year, href, isExternal, description }: ContentCardProps) {
    const content = (
        <>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-[#141414] rounded-[9px] opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            <div className="relative p-[1px] rounded-[9px]">
                <Card className="bg-black group-hover:bg-[#141414] border-none transition-colors duration-200 rounded-lg">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex-grow">
                            <h3 className="text-xl font-semibold text-white group-hover:text-gray-300 transition-colors duration-200">{title}</h3>
                            {(author || year) && (
                                <p className="text-gray-500 mt-1">
                                    {author}{author && year ? ', ' : ''}{year}
                                </p>
                            )}
                            {description && <p className="text-gray-400 mt-2">{description}</p>}
                        </div>
                        {href && (
                            <div className="hidden md:flex items-center text-gray-500 group-hover:text-white transition-colors duration-200 ml-4">
                                <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">Read</span>
                                <Image
                                    src="/icons/arrow.svg"
                                    alt="Read arrow"
                                    width={24}
                                    height={24}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 [filter:brightness(0)_invert(0.5)] group-hover:[filter:brightness(0)_invert(1)]"
                                />
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );

    if (href) {
        return (
            <Link 
                href={href} 
                className="block group relative"
                {...(isExternal ? {
                    target: "_blank",
                    rel: "noopener noreferrer"
                } : {})}
            >
                {content}
            </Link>
        );
    }

    return (
        <div className="block group relative">
            {content}
        </div>
    );
}