import { currentUser, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const user = await currentUser();
  if (!user) return redirect("/");

  const fullName = user.firstName + " " + user.lastName;

  return (
    <div className="flex items-center justify-center h-full px-4">
      <div className="bg-white md:mx-auto rounded shadow-xl w-full sm:w-[400px] overflow-hidden">
        <div className="h-[140px] bg-gradient-to-r from-cyan-500 to-blue-500" />
        <div className="px-5 py-2 flex flex-col gap-3 pb-6">
          <div className="h-[90px] shadow-md w-[90px] rounded-full border-4 overflow-hidden -mt-14 border-white">
            <Image
              width={100}
              height={100}
              alt={fullName}
              src={user.imageUrl}
              className="w-full h-full rounded-full object-center object-cover"
            />
          </div>
          <div className="">
            <h3 className="text-xl text-slate-900 relative font-bold leading-6">
              {fullName}
            </h3>
            <Link
              className="no-underline text-sm text-gray-600 hover:text-indigo-600"
              target="_blank"
              href="https://twitter.com/ozqurozalp"
            >
              @ozqurozalp
            </Link>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="rounded-sm bg-yellow-100 leading-[1] flex items-center justify-center px-3 py-2 text-xs font-medium text-yellow-800">
              Developer
            </span>
            <span className="rounded-sm bg-indigo-100 leading-[1] flex items-center justify-center px-3 py-2 text-xs font-medium text-indigo-800">
              Projects
            </span>
            <div className="ml-auto">
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddLater() {
  return (
    <>
      <h4 className="text-md font-medium leading-3">Experiences</h4>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 px-2 py-3 bg-white rounded border w-full ">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth={0}
            viewBox="0 0 24 24"
            className="h-8 w-8 text-slate-500"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
          </svg>
          <div className="leading-3">
            <p className=" text-sm font-bold text-slate-700">Ui Designer</p>
            <span className="text-xs text-slate-600">5 years</span>
          </div>
          <p className="text-sm text-slate-500 self-start ml-auto">
            As Ui Designer on Front Page
          </p>
        </div>
        <div className="flex items-center gap-3 px-2 py-3 bg-white rounded border w-full ">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth={0}
            viewBox="0 0 24 24"
            className="h-8 w-8 text-slate-500"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
          </svg>
          <div className="leading-3">
            <p className=" text-sm font-bold text-slate-700">Ui Designer</p>
            <span className="text-xs text-slate-600">5 years</span>
          </div>
          <p className="text-sm text-slate-500 self-start ml-auto">
            As Ui Designer on Front Page
          </p>
        </div>
        <div className="flex items-center gap-3 px-2 py-3 bg-white rounded border w-full ">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth={0}
            viewBox="0 0 24 24"
            className="h-8 w-8 text-slate-500"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
          </svg>
          <div className="leading-3">
            <p className=" text-sm font-bold text-slate-700">Ui Designer</p>
            <span className="text-xs text-slate-600">5 years</span>
          </div>
          <p className="text-sm text-slate-500 self-start ml-auto">
            As Ui Designer on Front Page
          </p>
        </div>
      </div>
    </>
  );
}
