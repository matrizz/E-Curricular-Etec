import { Avatar, AvatarFallback, AvatarImage } from "./avatar";


export default function Member({ image, name, role, description }: { image: string, name: string, role: string, description: string }) {
    return (
        <div className="w-full flex flex-col justify-center items-center">
            {
                image.endsWith("png") || image.endsWith("jpeg") || image.endsWith("jpg") ? 
                    <img className="w-32 h-32 mb-2 text-center object-cover items-center rounded-full border-4 border-slate-600" src={image} alt={name} />
                    : <Avatar className="w-32 h-32 mb-2">
                        <AvatarImage className="object-cover" src={image} alt={name} />
                        <AvatarFallback className="text-2xl mb-2 font-bold text-left">{name.slice(0, 1).toUpperCase()}{name.split(" ")[1].slice(0, 1).toUpperCase()}</AvatarFallback>
                </Avatar>
            }

            <h2 className="text-xl font-bold">
                {name}
            </h2>
            <span className="min-w-max">{role}</span>

            <div className="w-full md:px-12 text-center p-2">
                <p className="text-sm min-w-72">
                    {description}
                </p>
            </div>
        </div>
    )
}