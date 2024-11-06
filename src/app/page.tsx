import { LoginButton } from "@/components/LoginButton";
// import { auth } from "../../auth";

export default async  function Home() {

  // const session = await auth()
  // console.log(session, "from home")

  return (
    <div className="flex justify-center py-4 h-full items-center">
      <LoginButton />
    </div>
  );
}
