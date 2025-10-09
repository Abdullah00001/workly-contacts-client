import { PublicPages } from '@/consts/const';
import Link from 'next/link';

export default function ActivityFooter() {
  return (
    <div className="w-full py-4 lg:py-0 bg-[#152127]">
      <div className="flex items-center justify-center lg:justify-start gap-2 p-5">
        {PublicPages.map((item) => (
          <Link className="font-google-sans" key={item.path} href={item.path}>
            {item.pathName}
          </Link>
        ))}
      </div>
    </div>
  );
}
