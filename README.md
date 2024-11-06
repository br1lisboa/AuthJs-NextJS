### SIMPLE GUÍA DE AUTH PARA NEXTJS - FINES EDUCATIVOS

Para configurar la autenticación con Auth.js se deben seguir estos pasos

1- Instalar Auth.js
`pnpm add next-auth@beta`

2- La única variable mandataria es AUTH_SECRET, es un valor random usado por la librería para encriptar tokens, etc.
`npx auth secret` o crear un env AUTH_SECRET

3- Hay que crear un objeto de configuración, en un archivo en el root de la aplicación que se llama "auth.ts", aquí es donde controlaremos autenticaciones, lógica, etc.
De este archivo se exportaran los manejadores de rutas, métodos de signIn y signOut, y mas. Ejemplo de contenido del archivo.

    import NextAuth from "next-auth"
    
    export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [],
    })

4- El siguiente paso es crear el manejador de rutas, este se debe crear en esta ruta.
`/app/api/auth/[...nextauth]/route.ts` donde se coloca el siguiente código que exporta los métodos GET y POST de handlers.

    import { handlers } from "../../../../../auth";

    export const { GET, POST } = handlers

5- Una vez finalizadas estas configuraciones, dentro de auth.ts, tenemos acceso a otro objeto ademas de providers, este es callbacks, donde podemos ejecutar funciones asíncronas y acceder a la cuenta, el perfil, y hacer lógica extra. Un ejemplo de utilización.

    import NextAuth from "next-auth";
    import GoogleProvider from "next-auth/providers/google";

    export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ account, profile }) {
        console.log(account);
        console.log(profile);
        return true;
        },
    },
    });

6- Luego, para consumir la session desde el el back, solo se debe importar auth desde el archivo de configuración y guardarlo en una variable. Ejemplo de código. Aquí tendremos toda la info brindada por el provider.

    import { LoginButton } from "@/components/LoginButton";
    import { auth } from "../../auth";

    export default async  function Home() {

    const session = await auth()
    console.log(session, "from home")

    return (
        <div className="flex justify-center py-4 h-full items-center">
        <LoginButton />
        </div>
    );
    }

7- Podemos manejar redirects dentro de la función de signIn directamente, en caso de ser exitoso ir a rutas protegidas. Ejemplo.

    "use client";

    import { signIn } from "next-auth/react";

    export function LoginButton() {
    const handleLogin = () => {
        signIn("google", { redirectTo: "/private-pages" });
    };

    //   const handleLogout = () => {
    //     signOut();
    //   };

    return (
        <button
        onClick={handleLogin}
        className="p-2 border border-white rounded-sm hover:bg-black transition-colors duration-300"
        >
        LOGIN
        </button>
    );
    }

8- Para proteger un set de rutas, next nos brinda varias soluciones, las mas sencillas radican en hacer una simple verificación de "if(!session)redirect", pero una solución mas elegante que tenemos es la de crear un archivo middleware en el root de la aplicación con el siguiente código.

`export { auth as middleware } from "./auth"`

o podemos hacer lógica mas interesante como este middleware

    import { NextResponse, type NextRequest } from "next/server";
    import { auth } from "../auth";

    // const publicPages = [];

    export async function middleware(request: NextRequest) {
    const session = await auth();

    if (!session && request.nextUrl.pathname.startsWith("/private")) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    }

