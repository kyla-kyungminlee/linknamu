import Image from "next/image";

type ProfileProps = {
  name: string;
  bio: string;
  image: string;
};

export default function Profile({ name, bio, image }: ProfileProps) {
  return (
    <section className="flex flex-col items-center text-center">
      {/* 반투명 테두리와 겹친 그림자로 사진이 살짝 떠 보이게 합니다. */}
      <div className="rounded-full bg-gradient-to-br from-white/90 to-white/30 p-1.5 shadow-[0_18px_40px_-14px_rgba(76,52,110,0.45),0_4px_12px_-4px_rgba(76,52,110,0.18)] dark:from-white/20 dark:to-white/5 dark:shadow-[0_18px_40px_-14px_rgba(0,0,0,0.7)]">
        <Image
          src={image}
          alt={`${name} 프로필 사진`}
          width={128}
          height={128}
          priority
          className="h-28 w-28 rounded-full object-cover sm:h-32 sm:w-32"
        />
      </div>
      <h1 className="mt-6 text-[1.625rem] font-bold leading-tight tracking-tight">{name}</h1>
      <p className="mt-2 text-[0.9375rem] text-stone-500 dark:text-stone-400">{bio}</p>
    </section>
  );
}
