import Link from "next/link";
import axios from "axios";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
async function handleclick(e: FormData) {
  "use server"
  let resg = null;
  try {
    const name = e.get("name");
    const password = e.get("password");
    const res = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "api/auth/login",
      { username: name, password: password }
    );
    if (res.status === 200) {
      resg = res
      cookies().set("token", res.data.token);
    }
  } catch (err: any) {
    alert("User not present...")
    console.log(err.message);
  }finally{
    if(resg){
      redirect("/tasks")
    }
  }
 
}

const page = () => {
  return (
    <div className="flex h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gray-950">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          action={async (e) => {
            "use server";
            await handleclick(e);
          }}
        >
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-400  tracking-wide">
              Username
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="name"
                type="text"
                required
                className=" block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm   placeholder:text-gray-400  sm:text-sm sm:leading-6 text-center"
                placeholder="enter your name"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium leading-6 text-gray-400 tracking-wide">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm  ring-offset-0   placeholder:text-gray-400   sm:text-sm sm:leading-6 text-center"
                placeholder="password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {"Sign in"}
            </button>
          </div>
        </form>
        <div className="p-3 text-center mt-3">
          <label className="text-gray-500">Don't have an account? </label>
          <Link href="/signup" className="text-indigo-600">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
