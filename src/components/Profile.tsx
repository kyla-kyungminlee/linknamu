import Image from "next/image";

type ProfileProps = {
  name: string;
  bio: string;
  image: string;
};

export default function Profile({ name, bio, image }: ProfileProps) {
  return (
    <section className="flex flex-col items-center text-center">
      <Image
        src={image}
        alt={`${name} 프로필 사진`}
        width={144}
        height={144}
        priority
        className="h-36 w-36 rounded-full object-cover ring-4 ring-white shadow-md dark:ring-zinc-800"
      />
      <h1 className="mt-4 text-2xl font-bold tracking-tight">{name}</h1>
      <p className="mt-1 text-base text-zinc-600 dark:text-zinc-400">{bio}</p>
    </section>
  );
}
