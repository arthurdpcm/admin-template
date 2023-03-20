import useAuth from "../../data/hook/useAuth";
import Image from "next/image";
import Link from "next/link";

import userIcon from "public/user.png";

interface AvatarProps {
	className?: string;
}

export default function Avatar(props: AvatarProps) {
	const { user } = useAuth();

	// const myLoader = ({ src, width, quality }) => {
	//     return `${src}?w=${width}&q=${quality || 75}`
	//   }

	return (
		<Link href={"/profile"}>
			<img
				src={user?.imageUrl ?? "/user.png"}
				alt="User Avatar"
				className={`
					h-10 w-10 rounded-full cursor-pointer
					${props.className}
				`}
			/>

			{/* <Image
                loader={myLoader}
				src={
					user?.imageUrl ?? userIcon}
				alt="Profile Avatar"
                width={50}
                height={50}
				className={`
                    ${props.className}
                    h-10 w-10 rounded-full cursor-pointer
                `}
			></Image> */}
		</Link>
	);
}
